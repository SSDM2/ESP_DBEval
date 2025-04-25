import unittest
import os
import tempfile
import json
from unittest.mock import patch, MagicMock
from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIClient
from ..ollama_integration import OllamaIntegration, AnalysisType
from ..config import APIConfig
from ai_integration.models import ProcessedDocument, PlagiarismCheck, AIAnalysis

class IntegrationTest(TestCase):
    def setUp(self):
        # Configuration de test
        self.test_config = {
            'api_url': 'http://localhost:11434',
            'model': 'llama2',
            'timeout': 30,
            'max_tokens': 2048,
            'temperature': 0.7
        }
        
        # Patch de la configuration
        patcher = patch.object(APIConfig, 'OLLAMA', self.test_config)
        patcher.start()
        self.addCleanup(patcher.stop)
        
        # Client API
        self.client = APIClient()
        
        # Données de test
        self.test_content = "def add(a, b):\n    return a + b"
        self.test_context = {"language": "python", "level": "beginner"}
        
        # Créer un fichier de test temporaire
        self.temp_file = tempfile.NamedTemporaryFile(suffix='.pdf', delete=False)
        self.temp_file.write(b'Test content')
        self.temp_file.close()

    def tearDown(self):
        # Nettoyer le fichier temporaire
        os.unlink(self.temp_file.name)

    @patch('requests.post')
    def test_complete_flow(self, mock_post):
        """
        Test du flux complet : upload -> traitement -> analyse -> correction
        """
        # Simuler les réponses de l'API
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "response": "Analyse complétée",
            "created": "2024-01-01T00:00:00Z"
        }
        mock_post.return_value = mock_response

        # 1. Upload du fichier
        with open(self.temp_file.name, 'rb') as file:
            upload_response = self.client.post(
                '/api/ai/process-document/',
                {'file': file, 'context': json.dumps(self.test_context)},
                format='multipart'
            )
            self.assertEqual(upload_response.status_code, 201)
            document_id = upload_response.data['id']

        # 2. Vérification du document traité
        document = ProcessedDocument.objects.get(id=document_id)
        self.assertIsNotNone(document.processed_text)

        # 3. Analyse du document
        analysis_response = self.client.post(
            '/api/ai/analyze/',
            {
                'document': document_id,
                'analysis_type': AnalysisType.CODE_REVIEW.value,
                'context': self.test_context
            },
            format='json'
        )
        self.assertEqual(analysis_response.status_code, 201)
        analysis_id = analysis_response.data['id']

        # 4. Vérification de l'analyse
        analysis = AIAnalysis.objects.get(id=analysis_id)
        self.assertIsNotNone(analysis.analysis_result)

        # 5. Vérification du plagiat
        plagiarism_response = self.client.post(
            '/api/ai/check-plagiarism/',
            {
                'document': document_id,
                'reference_texts': [self.test_content]
            },
            format='json'
        )
        self.assertEqual(plagiarism_response.status_code, 201)
        plagiarism_id = plagiarism_response.data['id']

        # 6. Vérification du résultat du plagiat
        plagiarism = PlagiarismCheck.objects.get(id=plagiarism_id)
        self.assertIsNotNone(plagiarism.similarity_score)

    @patch('requests.post')
    def test_batch_processing(self, mock_post):
        """
        Test du traitement par lot de plusieurs documents
        """
        # Simuler les réponses de l'API
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "response": "Analyse complétée",
            "created": "2024-01-01T00:00:00Z"
        }
        mock_post.return_value = mock_response

        # Préparer plusieurs fichiers
        files = []
        for i in range(5):
            temp_file = tempfile.NamedTemporaryFile(suffix='.pdf', delete=False)
            temp_file.write(f'Test content {i}'.encode())
            temp_file.close()
            files.append(temp_file)

        # Traiter les fichiers en parallèle
        responses = []
        for file in files:
            with open(file.name, 'rb') as f:
                response = self.client.post(
                    '/api/ai/process-document/',
                    {'file': f, 'context': json.dumps(self.test_context)},
                    format='multipart'
                )
                responses.append(response)
                os.unlink(file.name)

        # Vérifier que tous les traitements ont réussi
        for response in responses:
            self.assertEqual(response.status_code, 201)

    @patch('requests.post')
    def test_error_handling(self, mock_post):
        """
        Test de la gestion des erreurs
        """
        # Simuler une erreur de l'API
        mock_response = MagicMock()
        mock_response.status_code = 500
        mock_response.text = "Internal Server Error"
        mock_post.return_value = mock_response

        # Tester l'upload avec erreur
        with open(self.temp_file.name, 'rb') as file:
            response = self.client.post(
                '/api/ai/process-document/',
                {'file': file, 'context': json.dumps(self.test_context)},
                format='multipart'
            )
            self.assertEqual(response.status_code, 400)
            self.assertIn('error', response.data)

    def test_performance(self):
        """
        Test de performance avec un grand nombre de requêtes
        """
        import time
        from concurrent.futures import ThreadPoolExecutor

        def process_document():
            with open(self.temp_file.name, 'rb') as file:
                return self.client.post(
                    '/api/ai/process-document/',
                    {'file': file, 'context': json.dumps(self.test_context)},
                    format='multipart'
                )

        # Mesurer le temps pour 10 requêtes parallèles
        start_time = time.time()
        with ThreadPoolExecutor(max_workers=10) as executor:
            results = list(executor.map(lambda _: process_document(), range(10)))
        end_time = time.time()

        # Vérifier que toutes les requêtes ont réussi
        for result in results:
            self.assertEqual(result.status_code, 201)

        # Vérifier que le temps total est raisonnable (moins de 30 secondes)
        self.assertLess(end_time - start_time, 30)

if __name__ == '__main__':
    unittest.main() 
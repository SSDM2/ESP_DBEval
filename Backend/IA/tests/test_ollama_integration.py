import unittest
from unittest.mock import patch, MagicMock
from ..ollama_integration import OllamaIntegration, AnalysisType
from ..config import APIConfig

class TestOllamaIntegration(unittest.TestCase):
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
        
        self.ollama = OllamaIntegration(model="llama2")
        self.test_content = "def add(a, b):\n    return a + b"
        self.test_context = {"language": "python", "level": "beginner"}

    def test_prepare_prompt(self):
        # Test de préparation du prompt pour la correction
        prompt = self.ollama._prepare_prompt(
            AnalysisType.CORRECTION,
            self.test_content,
            self.test_context
        )
        self.assertIn("python", prompt)
        self.assertIn("beginner", prompt)
        self.assertIn(self.test_content, prompt)
        self.assertIn("Identifiez les erreurs", prompt)

        # Test de préparation du prompt pour la revue de code
        prompt = self.ollama._prepare_prompt(
            AnalysisType.CODE_REVIEW,
            self.test_content
        )
        self.assertIn(self.test_content, prompt)
        self.assertIn("Qualité du code", prompt)

    @patch('requests.post')
    def test_make_request(self, mock_post):
        # Simuler une réponse réussie
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "response": "Analyse complétée",
            "created": "2024-01-01T00:00:00Z"
        }
        mock_post.return_value = mock_response

        response = self.ollama._make_request("Test prompt")
        self.assertEqual(response["response"], "Analyse complétée")

        # Simuler une erreur
        mock_response.status_code = 500
        mock_response.text = "Internal Server Error"
        response = self.ollama._make_request("Test prompt")
        self.assertIn("error", response)
        self.assertEqual(response["error"], "Erreur API: 500")

    @patch('requests.post')
    def test_analyze_content(self, mock_post):
        # Simuler une réponse réussie
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "response": "Code bien structuré",
            "created": "2024-01-01T00:00:00Z"
        }
        mock_post.return_value = mock_response

        # Test d'analyse de code
        result = self.ollama.analyze_content(
            self.test_content,
            AnalysisType.CODE_REVIEW,
            self.test_context
        )
        
        self.assertEqual(result["status"], "success")
        self.assertEqual(result["analysis_type"], "code_review")
        self.assertEqual(result["result"], "Code bien structuré")
        self.assertEqual(result["model_used"], "llama2")
        self.assertEqual(result["metadata"]["context"], self.test_context)

    @patch('requests.post')
    def test_batch_analyze(self, mock_post):
        # Simuler une réponse réussie
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "response": "Analyse complétée",
            "created": "2024-01-01T00:00:00Z"
        }
        mock_post.return_value = mock_response

        # Préparer les données de test
        contents = [
            {
                "id": "1",
                "content": self.test_content,
                "context": self.test_context
            },
            {
                "id": "2",
                "content": "print('Hello, World!')",
                "context": {"language": "python", "level": "beginner"}
            }
        ]

        # Test d'analyse par lot
        results = self.ollama.batch_analyze(contents, AnalysisType.CODE_REVIEW)
        
        self.assertEqual(len(results), 2)
        self.assertEqual(results[0]["content_id"], "1")
        self.assertEqual(results[0]["analysis"]["status"], "success")
        self.assertEqual(results[1]["content_id"], "2")
        self.assertEqual(results[1]["analysis"]["status"], "success")

if __name__ == '__main__':
    unittest.main() 
import unittest
import os
import tempfile
from unittest.mock import patch, MagicMock
from django.test import TestCase
from django.conf import settings
from ..monitoring import SystemMonitor, PerformanceTracker
import logging

# Configurer Django pour les tests
os.environ['DJANGO_SETTINGS_MODULE'] = 'IA.tests.settings'

class TestSystemMonitor(TestCase):
    def setUp(self):
        # Créer un fichier de log temporaire
        self.temp_log = tempfile.NamedTemporaryFile(delete=False)
        self.temp_log.close()
        
        # Configurer le monitor
        self.monitor = SystemMonitor()
        # Remplacer le handler par défaut par notre handler de test
        if self.monitor.logger.handlers:
            self.monitor.logger.handlers = []
        handler = logging.FileHandler(self.temp_log.name)
        handler.setLevel(logging.INFO)
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        handler.setFormatter(formatter)
        self.monitor.logger.addHandler(handler)

    def tearDown(self):
        # Supprimer le fichier de log temporaire
        if os.path.exists(self.temp_log.name):
            os.unlink(self.temp_log.name)

    def test_log_api_call(self):
        """Test de l'enregistrement des appels API"""
        self.monitor.log_api_call('/api/test', 1.5, 200)
        
        with open(self.temp_log.name, 'r') as f:
            log_content = f.read()
            self.assertIn('API Call - Endpoint: /api/test', log_content)
            self.assertIn('Duration: 1.50s', log_content)

    def test_log_error(self):
        """Test de l'enregistrement des erreurs"""
        self.monitor.log_error('TestError', 'Test message', {'context': 'test'})
        
        with open(self.temp_log.name, 'r') as f:
            log_content = f.read()
            self.assertIn('Error - Type: TestError', log_content)
            self.assertIn('Message: Test message', log_content)

    def test_get_performance_metrics(self):
        """Test de la récupération des métriques de performance"""
        metrics = self.monitor.get_performance_metrics()
        
        self.assertIn('document_processing', metrics)
        self.assertIn('plagiarism_checks', metrics)
        self.assertIn('ai_analysis', metrics)
        
        # Vérifier la structure des métriques
        doc_metrics = metrics['document_processing']
        self.assertIn('total_processed', doc_metrics)
        self.assertIn('avg_processing_time', doc_metrics)
        self.assertIn('success_rate', doc_metrics)

    def test_generate_report(self):
        """Test de la génération du rapport"""
        report = self.monitor.generate_report()
        
        self.assertIn('timestamp', report)
        self.assertIn('metrics', report)
        self.assertIn('system_status', report)
        self.assertIn(report['system_status'], ['healthy', 'warning'])

class TestPerformanceTracker(TestCase):
    def setUp(self):
        self.tracker = PerformanceTracker()

    def test_track_operation(self):
        """Test du suivi des opérations"""
        @self.tracker.track_operation('test_operation')
        def test_func():
            return 'test'

        result = test_func()
        self.assertEqual(result, 'test')
        
        stats = self.tracker.get_operation_stats()
        self.assertIn('test_operation', stats['operation_times'])

    def test_track_operation_error(self):
        """Test du suivi des erreurs d'opération"""
        @self.tracker.track_operation('error_operation')
        def error_func():
            raise ValueError('Test error')

        with self.assertRaises(ValueError):
            error_func()
        
        stats = self.tracker.get_operation_stats()
        self.assertIn('error_operation', stats['operation_times'])

if __name__ == '__main__':
    unittest.main() 
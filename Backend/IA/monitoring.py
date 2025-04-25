import logging
import time
from datetime import datetime
from typing import Dict, List, Optional
from django.conf import settings
from django.db.models import Avg, Max, Min
from ai_integration.models import ProcessedDocument, PlagiarismCheck, AIAnalysis

class SystemMonitor:
    """
    Classe pour la surveillance du système
    """
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.setup_logging()

    def setup_logging(self):
        """Configure le logging"""
        handler = logging.FileHandler(getattr(settings, 'LOG_FILE', 'system_monitor.log'))
        handler.setLevel(logging.INFO)
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        handler.setFormatter(formatter)
        self.logger.addHandler(handler)
        self.logger.setLevel(logging.INFO)

    def log_api_call(self, endpoint: str, duration: float, status: int):
        """Enregistre un appel API"""
        self.logger.info(
            f"API Call - Endpoint: {endpoint}, Duration: {duration:.2f}s, Status: {status}"
        )

    def log_error(self, error_type: str, message: str, context: Optional[Dict] = None):
        """Enregistre une erreur"""
        self.logger.error(
            f"Error - Type: {error_type}, Message: {message}, Context: {context}"
        )

    def get_performance_metrics(self) -> Dict:
        """Récupère les métriques de performance"""
        return {
            'document_processing': self._get_document_metrics(),
            'plagiarism_checks': self._get_plagiarism_metrics(),
            'ai_analysis': self._get_analysis_metrics()
        }

    def _get_document_metrics(self) -> Dict:
        """Métriques de traitement des documents"""
        docs = ProcessedDocument.objects.all()
        total = docs.count()
        return {
            'total_processed': total,
            'avg_processing_time': 0,  # À implémenter avec un champ de durée
            'success_rate': 1.0 if total > 0 else 0
        }

    def _get_plagiarism_metrics(self) -> Dict:
        """Métriques de vérification de plagiat"""
        checks = PlagiarismCheck.objects.all()
        scores = [c.similarity_score for c in checks if c.similarity_score is not None]
        return {
            'total_checks': checks.count(),
            'avg_similarity': sum(scores) / len(scores) if scores else 0,
            'max_similarity': max(scores) if scores else 0,
            'min_similarity': min(scores) if scores else 0
        }

    def _get_analysis_metrics(self) -> Dict:
        """Métriques d'analyse IA"""
        analyses = AIAnalysis.objects.all()
        by_type = {}
        for analysis in analyses:
            by_type[analysis.analysis_type] = by_type.get(analysis.analysis_type, 0) + 1
        return {
            'total_analyses': analyses.count(),
            'by_type': by_type
        }

    def generate_report(self) -> Dict:
        """Génère un rapport de performance"""
        metrics = self.get_performance_metrics()
        
        return {
            'timestamp': datetime.now().isoformat(),
            'metrics': metrics,
            'system_status': self._check_system_status(metrics)
        }

    def _check_system_status(self, metrics: Dict) -> str:
        """Vérifie l'état du système"""
        # Vérifier les taux de réussite
        doc_success = metrics['document_processing']['success_rate']
        if doc_success < 0.9:
            return 'warning'
        
        # Vérifier les temps de traitement
        avg_processing = metrics['document_processing']['avg_processing_time']
        if avg_processing > 30:  # 30 secondes
            return 'warning'
        
        return 'healthy'

class PerformanceTracker:
    """
    Classe pour suivre les performances des opérations
    """
    def __init__(self):
        self.monitor = SystemMonitor()
        self.operation_times = {}

    def track_operation(self, operation_name: str):
        """Décorateur pour suivre le temps d'exécution d'une opération"""
        def decorator(func):
            def wrapper(*args, **kwargs):
                start_time = time.time()
                try:
                    result = func(*args, **kwargs)
                    duration = time.time() - start_time
                    self.operation_times[operation_name] = duration
                    self.monitor.log_api_call(
                        f"Operation: {operation_name}",
                        duration,
                        200
                    )
                    return result
                except Exception as e:
                    duration = time.time() - start_time
                    self.operation_times[operation_name] = duration
                    self.monitor.log_error(
                        "OperationError",
                        str(e),
                        {"operation": operation_name, "duration": duration}
                    )
                    raise
            return wrapper
        return decorator

    def get_operation_stats(self) -> Dict:
        """Récupère les statistiques des opérations"""
        return {
            'operation_times': self.operation_times,
            'average_time': sum(self.operation_times.values()) / len(self.operation_times) if self.operation_times else 0
        } 
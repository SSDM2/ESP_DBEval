import ast
import re
from typing import Dict, List, Optional
import requests

class CodeAnalyzer:
    """
    Classe pour l'analyse de code avec DeepSeek
    """
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.api_url = "https://api.deepseek.com/v1/analyze"

    def check_syntax(self, code: str) -> Dict[str, any]:
        """
        Vérifie la syntaxe du code
        """
        try:
            ast.parse(code)
            return {"status": "success", "message": "Syntaxe valide"}
        except SyntaxError as e:
            return {
                "status": "error",
                "message": str(e),
                "line": e.lineno,
                "offset": e.offset
            }

    def analyze_complexity(self, code: str) -> Dict[str, any]:
        """
        Analyse la complexité du code
        """
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "code": code,
            "analysis_type": "complexity"
        }

        try:
            response = requests.post(self.api_url, headers=headers, json=payload)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {
                "status": "error",
                "message": f"Erreur lors de l'analyse: {str(e)}"
            }

    def suggest_improvements(self, code: str) -> Dict[str, any]:
        """
        Suggère des améliorations pour le code
        """
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "code": code,
            "analysis_type": "improvements"
        }

        try:
            response = requests.post(self.api_url, headers=headers, json=payload)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {
                "status": "error",
                "message": f"Erreur lors de l'analyse: {str(e)}"
            }

    def calculate_metrics(self, code: str) -> Dict[str, float]:
        """
        Calcule des métriques de qualité du code
        """
        metrics = {
            "lines_of_code": len(code.splitlines()),
            "cyclomatic_complexity": self._calculate_cyclomatic_complexity(code),
            "comment_density": self._calculate_comment_density(code)
        }
        return metrics

    def _calculate_cyclomatic_complexity(self, code: str) -> int:
        """
        Calcule la complexité cyclomatique du code
        """
        # Implémentation simplifiée
        complexity = 1
        for line in code.splitlines():
            if any(keyword in line for keyword in ['if', 'for', 'while', 'and', 'or']):
                complexity += 1
        return complexity

    def _calculate_comment_density(self, code: str) -> float:
        """
        Calcule la densité de commentaires
        """
        total_lines = len(code.splitlines())
        comment_lines = len([line for line in code.splitlines() 
                           if line.strip().startswith('#')])
        return comment_lines / total_lines if total_lines > 0 else 0 
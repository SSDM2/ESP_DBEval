import json
import requests
from typing import Dict, List, Optional, Union
from .config import APIConfig
from enum import Enum

class AnalysisType(Enum):
    CORRECTION = "correction"
    FEEDBACK = "feedback"
    PLAGIARISM = "plagiarism"
    CODE_REVIEW = "code_review"

class OllamaIntegration:
    """
    Classe pour l'intégration avec l'API Ollama
    """
    def __init__(self, model: str = None):
        self.config = APIConfig.OLLAMA
        if not isinstance(self.config, dict):
            self.config = {
                'api_url': 'http://localhost:11434',
                'model': 'llama2',
                'timeout': 30,
                'max_tokens': 2048,
                'temperature': 0.7
            }
        self.model = model or self.config.get('model', 'llama2')
        self.headers = APIConfig.get_ollama_headers()

    def _prepare_prompt(self, analysis_type: AnalysisType, content: str, context: Optional[Dict] = None) -> str:
        """
        Prépare le prompt en fonction du type d'analyse
        """
        prompts = {
            AnalysisType.CORRECTION: """
                En tant que professeur, veuillez corriger cet exercice :
                
                Exercice :
                {content}
                
                Instructions spécifiques :
                - Identifiez les erreurs
                - Proposez des corrections
                - Donnez une note sur 20
                - Fournissez des commentaires constructifs
                """,
            
            AnalysisType.FEEDBACK: """
                Analysez cette réponse d'étudiant et fournissez un feedback détaillé :
                
                Réponse :
                {content}
                
                Points à couvrir :
                - Points forts
                - Points à améliorer
                - Suggestions spécifiques
                """,
            
            AnalysisType.PLAGIARISM: """
                Analysez ce texte pour détecter d'éventuels signes de plagiat :
                
                Texte :
                {content}
                
                Éléments à vérifier :
                - Style d'écriture cohérent
                - Changements brusques de ton ou de qualité
                - Passages potentiellement copiés
                """,
            
            AnalysisType.CODE_REVIEW: """
                Effectuez une revue de code détaillée :
                
                Code :
                {content}
                
                Critères d'évaluation :
                - Qualité du code
                - Bonnes pratiques
                - Optimisations possibles
                - Problèmes de sécurité
                """
        }

        base_prompt = prompts[analysis_type]
        
        if context:
            context_str = "\n".join(f"{k}: {v}" for k, v in context.items())
            base_prompt = f"Contexte :\n{context_str}\n\n{base_prompt}"
        
        return base_prompt.format(content=content)

    def _make_request(self, prompt: str) -> Dict:
        """
        Envoie une requête à l'API Ollama
        """
        try:
            payload = {
                "model": self.model,
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": self.config['temperature'],
                    "num_predict": self.config['max_tokens']
                }
            }

            response = requests.post(
                f"{self.config['api_url']}/api/generate",
                headers=self.headers,
                json=payload,
                timeout=self.config['timeout']
            )

            if response.status_code == 200:
                return response.json()
            else:
                return {
                    "error": f"Erreur API: {response.status_code}",
                    "details": response.text
                }

        except requests.exceptions.RequestException as e:
            return {
                "error": "Erreur de connexion",
                "details": str(e)
            }

    def analyze_content(
        self,
        content: str,
        analysis_type: Union[AnalysisType, str],
        context: Optional[Dict] = None
    ) -> Dict:
        """
        Analyse le contenu en utilisant Ollama
        """
        if isinstance(analysis_type, str):
            analysis_type = AnalysisType(analysis_type)

        prompt = self._prepare_prompt(analysis_type, content, context)
        response = self._make_request(prompt)

        if "error" in response:
            return response

        # Structurer la réponse
        return {
            "status": "success",
            "analysis_type": analysis_type.value,
            "result": response.get("response", ""),
            "model_used": self.model,
            "metadata": {
                "context": context,
                "timestamp": response.get("created", "")
            }
        }

    def batch_analyze(
        self,
        contents: List[Dict[str, str]],
        analysis_type: Union[AnalysisType, str]
    ) -> List[Dict]:
        """
        Analyse un lot de contenus
        """
        results = []
        for content_item in contents:
            result = self.analyze_content(
                content=content_item["content"],
                analysis_type=analysis_type,
                context=content_item.get("context")
            )
            results.append({
                "content_id": content_item.get("id"),
                "analysis": result
            })
        return results 
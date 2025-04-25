import requests
from typing import Dict, List, Optional
import json

class OllamaClient:
    """
    Client pour l'API Ollama
    """
    def __init__(self, base_url: str = "http://localhost:11434"):
        self.base_url = base_url

    def generate_feedback(self, prompt: str) -> Dict[str, any]:
        """
        Génère du feedback à partir d'un prompt
        """
        url = f"{self.base_url}/api/generate"
        payload = {
            "model": "llama2",
            "prompt": prompt,
            "stream": False
        }

        try:
            response = requests.post(url, json=payload)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {
                "status": "error",
                "message": f"Erreur lors de la génération: {str(e)}"
            }

class FeedbackGenerator:
    """
    Classe pour la génération de feedback avec Ollama
    """
    def __init__(self, ollama_client: OllamaClient):
        self.ollama_client = ollama_client

    def generate_correction(self, answer: str, model_answer: str) -> Dict[str, any]:
        """
        Génère une correction basée sur la réponse de l'étudiant et le modèle de réponse
        """
        prompt = f"""
        Compare la réponse de l'étudiant avec le modèle de réponse et fournis une correction détaillée.
        
        Réponse de l'étudiant:
        {answer}
        
        Modèle de réponse:
        {model_answer}
        
        Fournis:
        1. Une évaluation générale
        2. Les points forts
        3. Les points à améliorer
        4. Des suggestions de correction
        """

        return self.ollama_client.generate_feedback(prompt)

    def provide_explanation(self, error: str) -> Dict[str, any]:
        """
        Fournit une explication détaillée d'une erreur
        """
        prompt = f"""
        Explique en détail l'erreur suivante et comment la corriger:
        
        {error}
        
        Fournis:
        1. Une explication claire de l'erreur
        2. La cause probable
        3. Des exemples de correction
        4. Des conseils pour éviter cette erreur à l'avenir
        """

        return self.ollama_client.generate_feedback(prompt)

    def suggest_resources(self, topic: str) -> Dict[str, any]:
        """
        Suggère des ressources d'apprentissage pour un sujet donné
        """
        prompt = f"""
        Suggère des ressources d'apprentissage pour le sujet suivant:
        
        {topic}
        
        Fournis:
        1. Des ressources en ligne (liens)
        2. Des livres ou articles
        3. Des exercices pratiques
        4. Des conseils d'apprentissage
        """

        return self.ollama_client.generate_feedback(prompt)

    def generate_learning_path(self, current_level: str, target_level: str) -> Dict[str, any]:
        """
        Génère un parcours d'apprentissage personnalisé
        """
        prompt = f"""
        Crée un parcours d'apprentissage pour passer du niveau suivant:
        
        Niveau actuel: {current_level}
        Niveau cible: {target_level}
        
        Fournis:
        1. Les étapes à suivre
        2. Les ressources pour chaque étape
        3. Des exercices pratiques
        4. Des indicateurs de progression
        """

        return self.ollama_client.generate_feedback(prompt) 
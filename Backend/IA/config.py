import os
from typing import Dict, Any
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

class APIConfig:
    """
    Configuration des API DeepSeek et Ollama
    """
    # Configuration DeepSeek
    DEEPSEEK = {
        "api_key": os.getenv("DEEPSEEK_API_KEY", ""),
        "api_url": "https://api.deepseek.com/v1",
        "timeout": int(os.getenv("DEEPSEEK_TIMEOUT", "30")),
        "max_retries": int(os.getenv("DEEPSEEK_MAX_RETRIES", "3")),
        "cache_enabled": os.getenv("DEEPSEEK_CACHE_ENABLED", "True").lower() == "true"
    }

    # Configuration Ollama
    OLLAMA = {
        "base_url": os.getenv("OLLAMA_BASE_URL", "http://localhost:11434"),
        "model": os.getenv("OLLAMA_MODEL", "llama2"),
        "temperature": float(os.getenv("OLLAMA_TEMPERATURE", "0.7")),
        "max_tokens": int(os.getenv("OLLAMA_MAX_TOKENS", "2000")),
        "timeout": int(os.getenv("OLLAMA_TIMEOUT", "60"))
    }

    # Configuration du logging
    LOGGING = {
        "level": os.getenv("LOG_LEVEL", "INFO"),
        "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        "filename": os.getenv("LOG_FILE", "api_logs.log")
    }

    @classmethod
    def validate(cls) -> bool:
        """
        Valide la configuration des API
        """
        # Vérifier la clé API DeepSeek
        if not cls.DEEPSEEK["api_key"]:
            print("Avertissement: DEEPSEEK_API_KEY non configurée")
            return False

        # Vérifier l'URL de base Ollama
        if not cls.OLLAMA["base_url"]:
            print("Avertissement: OLLAMA_BASE_URL non configurée")
            return False

        return True

    @classmethod
    def get_deepseek_headers(cls) -> Dict[str, str]:
        """
        Retourne les headers pour les requêtes DeepSeek
        """
        return {
            "Authorization": f"Bearer {cls.DEEPSEEK['api_key']}",
            "Content-Type": "application/json"
        }

    @classmethod
    def get_ollama_payload(cls, prompt: str) -> Dict[str, Any]:
        """
        Retourne le payload pour les requêtes Ollama
        """
        return {
            "model": cls.OLLAMA["model"],
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": cls.OLLAMA["temperature"],
                "num_predict": cls.OLLAMA["max_tokens"]
            }
        }

    @staticmethod
    def get_deepseek_headers():
        # Implémentez la logique pour obtenir les en-têtes d'authentification DeepSeek
        return {
            'Authorization': 'Bearer YOUR_API_KEY'
        }

    @staticmethod
    def get_ollama_headers():
        return {
            'Content-Type': 'application/json'
        } 
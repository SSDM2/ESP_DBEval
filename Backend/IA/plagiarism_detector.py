import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import Dict, List, Tuple, Optional
import re
from collections import Counter
import requests
from .config import APIConfig

class PlagiarismDetector:
    """
    Classe pour la détection de plagiat utilisant différentes méthodes
    """
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            stop_words='english',
            ngram_range=(1, 3),
            max_features=5000
        )
        self.sources = {}  # Stockage des sources pour comparaison

    def add_source(self, text: str, source_id: str, metadata: Optional[Dict] = None):
        """
        Ajoute une source pour la comparaison
        """
        self.sources[source_id] = {
            'text': text,
            'metadata': metadata or {},
            'vector': None
        }

    def preprocess_text(self, text: str) -> str:
        """
        Prétraite le texte pour l'analyse
        """
        # Convertir en minuscules
        text = text.lower()
        # Supprimer les caractères spéciaux
        text = re.sub(r'[^\w\s]', '', text)
        # Supprimer les espaces multiples
        text = re.sub(r'\s+', ' ', text)
        return text.strip()

    def calculate_cosine_similarity(self, text1: str, text2: str) -> float:
        """
        Calcule la similarité cosinus entre deux textes
        """
        texts = [text1, text2]
        tfidf_matrix = self.vectorizer.fit_transform(texts)
        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        return float(similarity)

    def calculate_jaccard_similarity(self, text1: str, text2: str) -> float:
        """
        Calcule la similarité de Jaccard entre deux textes
        """
        words1 = set(self.preprocess_text(text1).split())
        words2 = set(self.preprocess_text(text2).split())
        
        intersection = len(words1.intersection(words2))
        union = len(words1.union(words2))
        
        return float(intersection / union) if union > 0 else 0.0

    def extract_ngrams(self, text: str, n: int) -> List[str]:
        """
        Extrait les n-grams d'un texte
        """
        words = self.preprocess_text(text).split()
        return [' '.join(words[i:i+n]) for i in range(len(words)-n+1)]

    def find_ngram_matches(self, text: str, source_text: str, n: int = 3) -> List[Tuple[str, int]]:
        """
        Trouve les correspondances de n-grams entre deux textes
        """
        text_ngrams = self.extract_ngrams(text, n)
        source_ngrams = self.extract_ngrams(source_text, n)
        
        matches = []
        for i, ngram in enumerate(text_ngrams):
            if ngram in source_ngrams:
                matches.append((ngram, i))
        
        return matches

    def check_plagiarism(self, text: str, threshold: float = 0.7) -> Dict[str, any]:
        """
        Vérifie le plagiat contre toutes les sources disponibles
        """
        results = {
            'is_plagiarized': False,
            'similarity_scores': {},
            'matched_sources': [],
            'matched_ngrams': []
        }

        for source_id, source in self.sources.items():
            # Calculer la similarité cosinus
            cosine_score = self.calculate_cosine_similarity(text, source['text'])
            
            # Calculer la similarité de Jaccard
            jaccard_score = self.calculate_jaccard_similarity(text, source['text'])
            
            # Trouver les correspondances de n-grams
            ngram_matches = self.find_ngram_matches(text, source['text'])
            
            # Stocker les résultats
            results['similarity_scores'][source_id] = {
                'cosine': cosine_score,
                'jaccard': jaccard_score,
                'ngram_matches': len(ngram_matches)
            }
            
            # Vérifier si le texte est considéré comme plagié
            if cosine_score > threshold or jaccard_score > threshold:
                results['is_plagiarized'] = True
                results['matched_sources'].append({
                    'source_id': source_id,
                    'metadata': source['metadata'],
                    'similarity_scores': {
                        'cosine': cosine_score,
                        'jaccard': jaccard_score
                    }
                })
                results['matched_ngrams'].extend(ngram_matches)

        return results

    def search_external_sources(self, text: str) -> Dict[str, any]:
        """
        Recherche des correspondances dans des sources externes
        """
        # Exemple d'intégration avec une API externe
        # Note: Cette fonction nécessite une implémentation spécifique
        # selon l'API utilisée
        try:
            headers = APIConfig.get_deepseek_headers()
            payload = {
                "text": text,
                "search_type": "plagiarism_check"
            }
            
            response = requests.post(
                f"{APIConfig.DEEPSEEK['api_url']}/search",
                headers=headers,
                json=payload,
                timeout=APIConfig.DEEPSEEK['timeout']
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

    def generate_report(self, results: Dict[str, any]) -> Dict[str, any]:
        """
        Génère un rapport détaillé de détection de plagiat
        """
        report = {
            'summary': {
                'is_plagiarized': results['is_plagiarized'],
                'total_sources_checked': len(results['similarity_scores']),
                'matched_sources_count': len(results['matched_sources'])
            },
            'detailed_analysis': {
                'similarity_scores': results['similarity_scores'],
                'matched_sources': results['matched_sources'],
                'matched_ngrams': results['matched_ngrams']
            },
            'recommendations': []
        }

        # Ajouter des recommandations basées sur les résultats
        if results['is_plagiarized']:
            report['recommendations'].append({
                'type': 'warning',
                'message': 'Des similarités significatives ont été détectées avec d\'autres sources.'
            })
            
            # Ajouter des suggestions spécifiques
            for source in results['matched_sources']:
                report['recommendations'].append({
                    'type': 'suggestion',
                    'message': f'Revoir les similarités avec la source: {source["source_id"]}',
                    'similarity_score': source['similarity_scores']['cosine']
                })

        return report 
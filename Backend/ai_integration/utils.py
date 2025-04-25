import os
import json
import requests
from typing import List, Dict, Any
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import PyPDF2
import docx

class TextProcessor:
    """Class for processing text documents"""
    
    def extract_text_from_file(self, file_path: str) -> str:
        """Extract text from various file formats"""
        ext = os.path.splitext(file_path)[1].lower()
        
        if ext == '.pdf':
            return self._extract_from_pdf(file_path)
        elif ext == '.docx':
            return self._extract_from_docx(file_path)
        elif ext == '.txt':
            return self._extract_from_txt(file_path)
        else:
            raise ValueError(f"Unsupported file format: {ext}")
    
    def _extract_from_pdf(self, file_path: str) -> str:
        """Extract text from PDF file"""
        with open(file_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ''
            for page in reader.pages:
                text += page.extract_text()
        return text
    
    def _extract_from_docx(self, file_path: str) -> str:
        """Extract text from DOCX file"""
        doc = docx.Document(file_path)
        text = ''
        for paragraph in doc.paragraphs:
            text += paragraph.text + '\n'
        return text
    
    def _extract_from_txt(self, file_path: str) -> str:
        """Extract text from TXT file"""
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    
    def preprocess_text(self, text: str) -> str:
        """Preprocess text for analysis"""
        # Remove extra whitespace
        text = ' '.join(text.split())
        # Convert to lowercase
        text = text.lower()
        return text

class PlagiarismDetector:
    """Class for detecting plagiarism in text"""
    
    def __init__(self):
        self.vectorizer = TfidfVectorizer()
    
    def check_plagiarism(self, text: str, reference_texts: List[str]) -> Dict[str, Any]:
        """Check text for plagiarism against reference texts"""
        # Add the text to check at the beginning of the list
        all_texts = [text] + reference_texts
        
        # Calculate TF-IDF matrix
        tfidf_matrix = self.vectorizer.fit_transform(all_texts)
        
        # Calculate similarity scores
        similarity_matrix = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])
        
        # Find matches above threshold
        threshold = 0.8
        matches = []
        for i, score in enumerate(similarity_matrix[0]):
            if score > threshold:
                matches.append({
                    'reference_index': i,
                    'similarity_score': float(score)
                })
        
        return {
            'similarity_score': float(max(similarity_matrix[0])) if similarity_matrix[0].size > 0 else 0.0,
            'matched_sources': matches
        }

class OllamoClient:
    """Client for interacting with Ollama API"""
    
    def __init__(self, api_key: str = None):
        self.api_key = api_key
        self.base_url = os.getenv('OLLAMA_API_URL', 'http://localhost:11434')
    
    def analyze_text(self, text: str, analysis_type: str) -> Dict[str, Any]:
        """Analyze text using Ollama"""
        prompt = self._get_prompt(text, analysis_type)
        
        response = requests.post(
            f"{self.base_url}/api/generate",
            json={
                "model": "mistral",
                "prompt": prompt,
                "stream": False
            }
        )
        
        if response.status_code != 200:
            raise Exception(f"Ollama API error: {response.text}")
        
        return {
            'type': analysis_type,
            'result': response.json()['response']
        }
    
    def _get_prompt(self, text: str, analysis_type: str) -> str:
        """Get appropriate prompt based on analysis type"""
        prompts = {
            'correction': f"Please correct any grammatical or spelling errors in the following text:\n\n{text}",
            'feedback': f"Please provide detailed feedback on the following text:\n\n{text}",
            'grading': f"Please evaluate and grade the following text (out of 100):\n\n{text}"
        }
        return prompts.get(analysis_type, f"Please analyze the following text:\n\n{text}")

class DeepSeekClient:
    """Client for interacting with DeepSeek API"""
    
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.deepseek.com/v1"
    
    def analyze_code(self, code: str) -> Dict[str, Any]:
        """Analyze code using DeepSeek"""
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        response = requests.post(
            f"{self.base_url}/code/analyze",
            headers=headers,
            json={
                "code": code,
                "analysis_type": "full"
            }
        )
        
        if response.status_code != 200:
            raise Exception(f"DeepSeek API error: {response.text}")
        
        return response.json() 
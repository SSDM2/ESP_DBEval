import PyPDF2
import docx
import re
from typing import Dict, List, Optional

class DocumentProcessor:
    """
    Classe pour le traitement des documents (PDF, DOCX, TXT)
    """
    def __init__(self):
        self.supported_formats = ['.pdf', '.docx', '.txt']

    def extract_text(self, file_path: str) -> str:
        """
        Extrait le texte d'un document selon son format
        """
        if file_path.endswith('.pdf'):
            return self._extract_from_pdf(file_path)
        elif file_path.endswith('.docx'):
            return self._extract_from_docx(file_path)
        elif file_path.endswith('.txt'):
            return self._extract_from_txt(file_path)
        else:
            raise ValueError(f"Format non supporté. Formats supportés: {self.supported_formats}")

    def _extract_from_pdf(self, file_path: str) -> str:
        """Extrait le texte d'un fichier PDF"""
        text = ""
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                text += page.extract_text()
        return text

    def _extract_from_docx(self, file_path: str) -> str:
        """Extrait le texte d'un fichier DOCX"""
        doc = docx.Document(file_path)
        return "\n".join([paragraph.text for paragraph in doc.paragraphs])

    def _extract_from_txt(self, file_path: str) -> str:
        """Extrait le texte d'un fichier TXT"""
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()

    def analyze_structure(self, text: str) -> Dict[str, List[str]]:
        """
        Analyse la structure du document et identifie les sections importantes
        """
        structure = {
            'questions': [],
            'answers': [],
            'explanations': [],
            'code_blocks': []
        }

        # Détection des questions
        question_pattern = r'(?:Question|Exercice|Problème)\s*\d+[.:]?\s*(.*?)(?=\n\n|\Z)'
        structure['questions'] = re.findall(question_pattern, text, re.DOTALL)

        # Détection des blocs de code
        code_pattern = r'```(?:python|java|cpp|javascript)?\n(.*?)```'
        structure['code_blocks'] = re.findall(code_pattern, text, re.DOTALL)

        return structure

    def identify_sections(self, text: str) -> Dict[str, str]:
        """
        Identifie les sections importantes du document
        """
        sections = {
            'introduction': '',
            'main_content': '',
            'conclusion': '',
            'references': ''
        }

        # Détection de l'introduction
        intro_pattern = r'(?:Introduction|Préambule|Contexte)[\s\S]*?(?=\n\n[A-Z]|\Z)'
        intro_match = re.search(intro_pattern, text, re.IGNORECASE)
        if intro_match:
            sections['introduction'] = intro_match.group()

        # Détection de la conclusion
        conclusion_pattern = r'(?:Conclusion|Résumé|Synthèse)[\s\S]*?(?=\n\n[A-Z]|\Z)'
        conclusion_match = re.search(conclusion_pattern, text, re.IGNORECASE)
        if conclusion_match:
            sections['conclusion'] = conclusion_match.group()

        return sections 
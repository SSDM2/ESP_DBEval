import os
from typing import Dict, List, Optional, Union
from pathlib import Path
from .document_processor import DocumentProcessor
import json

class DataCollector:
    """
    Classe pour la collecte et la préparation des données
    """
    def __init__(self, base_dir: str = "data"):
        self.base_dir = Path(base_dir)
        self.document_processor = DocumentProcessor()
        self._ensure_directories()

    def _ensure_directories(self):
        """Crée les répertoires nécessaires s'ils n'existent pas"""
        directories = [
            self.base_dir,
            self.base_dir / "exercises",
            self.base_dir / "submissions",
            self.base_dir / "model_answers",
            self.base_dir / "processed"
        ]
        for directory in directories:
            directory.mkdir(parents=True, exist_ok=True)

    def collect_exercise(self, file_path: str, metadata: Optional[Dict] = None) -> Dict:
        """
        Collecte un exercice et ses métadonnées
        """
        exercise_data = {
            "file_path": file_path,
            "metadata": metadata or {},
            "processed_text": self._process_file(file_path),
            "structure": self.document_processor.analyze_structure(
                self._process_file(file_path)
            )
        }
        
        # Sauvegarde les données traitées
        output_path = self.base_dir / "processed" / f"{Path(file_path).stem}.json"
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(exercise_data, f, ensure_ascii=False, indent=2)
        
        return exercise_data

    def collect_submission(self, file_path: str, exercise_id: str, student_id: str) -> Dict:
        """
        Collecte une soumission d'étudiant
        """
        submission_data = {
            "file_path": file_path,
            "exercise_id": exercise_id,
            "student_id": student_id,
            "processed_text": self._process_file(file_path),
            "structure": self.document_processor.analyze_structure(
                self._process_file(file_path)
            )
        }
        
        # Sauvegarde les données traitées
        output_path = self.base_dir / "processed" / f"submission_{student_id}_{exercise_id}.json"
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(submission_data, f, ensure_ascii=False, indent=2)
        
        return submission_data

    def collect_model_answer(self, file_path: str, exercise_id: str) -> Dict:
        """
        Collecte une réponse modèle
        """
        model_answer_data = {
            "file_path": file_path,
            "exercise_id": exercise_id,
            "processed_text": self._process_file(file_path),
            "structure": self.document_processor.analyze_structure(
                self._process_file(file_path)
            )
        }
        
        # Sauvegarde les données traitées
        output_path = self.base_dir / "processed" / f"model_answer_{exercise_id}.json"
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(model_answer_data, f, ensure_ascii=False, indent=2)
        
        return model_answer_data

    def _process_file(self, file_path: str) -> str:
        """
        Traite un fichier et retourne son texte
        """
        return self.document_processor.extract_text(file_path)

    def prepare_for_analysis(self, data: Dict) -> Dict:
        """
        Prépare les données pour l'analyse par DeepSeek ou Ollama
        """
        prepared_data = {
            "text": data["processed_text"],
            "metadata": {
                "source": data.get("file_path"),
                "exercise_id": data.get("exercise_id"),
                "student_id": data.get("student_id")
            },
            "structure": data["structure"],
            "sections": self.document_processor.identify_sections(data["processed_text"])
        }
        return prepared_data

    def batch_process(self, directory: str, file_type: str) -> List[Dict]:
        """
        Traite un lot de fichiers
        """
        processed_files = []
        directory_path = Path(directory)
        
        for file_path in directory_path.glob("*"):
            if file_path.is_file():
                try:
                    if file_type == "exercise":
                        processed_files.append(self.collect_exercise(str(file_path)))
                    elif file_type == "submission":
                        # Extraire l'ID de l'exercice et de l'étudiant du nom du fichier
                        parts = file_path.stem.split('_')
                        if len(parts) >= 2:
                            exercise_id = parts[0]
                            student_id = parts[1]
                            processed_files.append(
                                self.collect_submission(str(file_path), exercise_id, student_id)
                            )
                    elif file_type == "model_answer":
                        exercise_id = file_path.stem.split('_')[-1]
                        processed_files.append(
                            self.collect_model_answer(str(file_path), exercise_id)
                        )
                except Exception as e:
                    print(f"Erreur lors du traitement de {file_path}: {str(e)}")
        
        return processed_files

    def get_processed_data(self, file_type: Optional[str] = None) -> List[Dict]:
        """
        Récupère les données traitées
        """
        processed_files = []
        processed_dir = self.base_dir / "processed"
        
        for file_path in processed_dir.glob("*.json"):
            if file_type:
                if file_type in str(file_path):
                    with open(file_path, 'r', encoding='utf-8') as f:
                        processed_files.append(json.load(f))
            else:
                with open(file_path, 'r', encoding='utf-8') as f:
                    processed_files.append(json.load(f))
        
        return processed_files 
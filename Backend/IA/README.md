# Module d'Intégration IA

Ce module fournit des fonctionnalités d'intégration avec DeepSeek et Ollama pour le traitement de documents, l'analyse de code et la génération de feedback.

## Installation

1. Installer les dépendances requises :

```bash
pip install PyPDF2 python-docx requests
```

2. Installer Ollama (si ce n'est pas déjà fait) :

```bash
# Pour macOS
brew install ollama

# Pour Linux
curl -fsSL https://ollama.com/install.sh | sh
```

## Utilisation

### Collecte et préparation des données

```python
from IA import DataCollector

# Initialiser le collecteur de données
collector = DataCollector(base_dir="data")

# Collecter un exercice
exercise_data = collector.collect_exercise(
    "exercises/exercise1.pdf",
    metadata={"difficulty": "medium", "topic": "algorithms"}
)

# Collecter une soumission d'étudiant
submission_data = collector.collect_submission(
    "submissions/student1_exercise1.pdf",
    exercise_id="exercise1",
    student_id="student1"
)

# Collecter une réponse modèle
model_answer_data = collector.collect_model_answer(
    "model_answers/exercise1_solution.pdf",
    exercise_id="exercise1"
)

# Traiter un lot de fichiers
processed_exercises = collector.batch_process("exercises/", "exercise")
processed_submissions = collector.batch_process("submissions/", "submission")

# Préparer les données pour l'analyse
prepared_data = collector.prepare_for_analysis(exercise_data)

# Récupérer les données traitées
all_processed_data = collector.get_processed_data()
exercises_only = collector.get_processed_data("exercise")
```

### Traitement de documents

```python
from IA import DocumentProcessor

processor = DocumentProcessor()
text = processor.extract_text("document.pdf")
structure = processor.analyze_structure(text)
sections = processor.identify_sections(text)
```

### Analyse de code

```python
from IA import CodeAnalyzer

analyzer = CodeAnalyzer(api_key="votre-clé-api")
syntax_check = analyzer.check_syntax(code)
complexity = analyzer.analyze_complexity(code)
improvements = analyzer.suggest_improvements(code)
```

### Génération de feedback

```python
from IA import FeedbackGenerator, OllamaClient

ollama = OllamaClient()
generator = FeedbackGenerator(ollama)

# Générer une correction
correction = generator.generate_correction(student_answer, model_answer)

# Fournir une explication
explanation = generator.provide_explanation(error)

# Suggérer des ressources
resources = generator.suggest_resources(topic)
```

## Structure des données

Le module crée automatiquement la structure de répertoires suivante :

```
data/
├── exercises/          # Exercices originaux
├── submissions/        # Soumissions des étudiants
├── model_answers/      # Réponses modèles
└── processed/          # Données traitées (JSON)
```

## Configuration

### DeepSeek

- Obtenir une clé API : [DeepSeek API](https://api.deepseek.com)
- Configurer la clé API dans les paramètres de l'application

### Ollama

- Par défaut, le client se connecte à `http://localhost:11434`
- Pour utiliser un serveur différent, spécifier l'URL dans le constructeur :

```python
ollama = OllamaClient(base_url="http://votre-serveur:11434")
```

## Fonctionnalités

### DataCollector

- Collecte et préparation des données
- Traitement par lots
- Extraction de métadonnées
- Structuration des données pour l'analyse

### DocumentProcessor

- Extraction de texte depuis PDF, DOCX et TXT
- Analyse de la structure du document
- Identification des sections importantes

### CodeAnalyzer

- Vérification de la syntaxe
- Analyse de la complexité
- Suggestions d'amélioration
- Calcul de métriques de qualité

### FeedbackGenerator

- Génération de corrections
- Explications d'erreurs
- Suggestions de ressources
- Création de parcours d'apprentissage

## Documentation API

Pour plus de détails sur l'API, consultez la documentation Swagger à l'adresse :
`http://localhost:8000/swagger/`

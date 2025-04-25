import unittest
from ..plagiarism_detector import PlagiarismDetector

class TestPlagiarismDetector(unittest.TestCase):
    def setUp(self):
        self.detector = PlagiarismDetector()
        
        # Ajouter des sources de test
        self.original_text = """
        Python est un langage de programmation interprété, multi-paradigme et multiplateforme.
        Il favorise la programmation impérative structurée, fonctionnelle et orientée objet.
        Il est doté d'un typage dynamique fort, d'une gestion automatique de la mémoire
        par ramasse-miettes et d'un système de gestion d'exceptions.
        """
        
        self.plagiarized_text = """
        Python est un langage de programmation interprété, multi-paradigme et multiplateforme.
        Il favorise la programmation impérative structurée, fonctionnelle et orientée objet.
        Il est doté d'un typage dynamique fort, d'une gestion automatique de la mémoire
        par ramasse-miettes et d'un système de gestion d'exceptions.
        """
        
        self.different_text = """
        Java est un langage de programmation orienté objet créé par James Gosling.
        Il est conçu pour être portable sur différentes plateformes.
        Java utilise une machine virtuelle pour exécuter le code compilé.
        """
        
        self.detector.add_source(
            self.original_text,
            "source1",
            {"author": "Test Author", "date": "2024-01-01"}
        )

    def test_preprocess_text(self):
        text = "Hello, World!  How are you?"
        processed = self.detector.preprocess_text(text)
        self.assertEqual(processed, "hello world how are you")

    def test_cosine_similarity(self):
        # Texte identique
        score1 = self.detector.calculate_cosine_similarity(
            self.original_text,
            self.plagiarized_text
        )
        self.assertAlmostEqual(score1, 1.0, places=2)
        
        # Texte différent
        score2 = self.detector.calculate_cosine_similarity(
            self.original_text,
            self.different_text
        )
        self.assertLess(score2, 0.5)

    def test_jaccard_similarity(self):
        # Texte identique
        score1 = self.detector.calculate_jaccard_similarity(
            self.original_text,
            self.plagiarized_text
        )
        self.assertAlmostEqual(score1, 1.0, places=2)
        
        # Texte différent
        score2 = self.detector.calculate_jaccard_similarity(
            self.original_text,
            self.different_text
        )
        self.assertLess(score2, 0.5)

    def test_ngram_extraction(self):
        text = "hello world how are you"
        ngrams = self.detector.extract_ngrams(text, 2)
        expected = ["hello world", "world how", "how are", "are you"]
        self.assertEqual(ngrams, expected)

    def test_ngram_matches(self):
        matches = self.detector.find_ngram_matches(
            self.plagiarized_text,
            self.original_text,
            n=3
        )
        self.assertGreater(len(matches), 0)

    def test_check_plagiarism(self):
        # Vérifier le plagiat avec un texte identique
        results = self.detector.check_plagiarism(self.plagiarized_text)
        self.assertTrue(results['is_plagiarized'])
        self.assertGreater(len(results['matched_sources']), 0)
        
        # Vérifier avec un texte différent
        results = self.detector.check_plagiarism(self.different_text)
        self.assertFalse(results['is_plagiarized'])

    def test_generate_report(self):
        results = self.detector.check_plagiarism(self.plagiarized_text)
        report = self.detector.generate_report(results)
        
        self.assertIn('summary', report)
        self.assertIn('detailed_analysis', report)
        self.assertIn('recommendations', report)
        
        self.assertTrue(report['summary']['is_plagiarized'])
        self.assertGreater(len(report['recommendations']), 0)

if __name__ == '__main__':
    unittest.main() 
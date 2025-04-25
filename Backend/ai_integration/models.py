from django.db import models
from django.conf import settings
from exercise.models import Exercise

class ProcessedDocument(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE, related_name='processed_documents')
    original_file = models.FileField(upload_to='documents/')
    processed_text = models.TextField(blank=True)
    processed_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Document for {self.exercise} processed by {self.processed_by}"

class PlagiarismCheck(models.Model):
    document = models.ForeignKey(ProcessedDocument, on_delete=models.CASCADE, related_name='plagiarism_checks')
    similarity_score = models.FloatField(null=True, blank=True)
    matched_sources = models.JSONField(default=dict, blank=True)
    checked_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Plagiarism check for {self.document} (Score: {self.similarity_score})"

class AIAnalysis(models.Model):
    ANALYSIS_TYPES = [
        ('code', 'Code Analysis'),
        ('text', 'Text Analysis'),
        ('custom', 'Custom Analysis'),
    ]

    document = models.ForeignKey(ProcessedDocument, on_delete=models.CASCADE, related_name='ai_analyses')
    analysis_type = models.CharField(max_length=20, choices=ANALYSIS_TYPES)
    analysis_result = models.JSONField(default=dict)
    analyzed_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.analysis_type} analysis for {self.document}"

    class Meta:
        verbose_name_plural = "AI Analyses" 
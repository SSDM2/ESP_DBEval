from django.db import models
from django.contrib.auth import get_user_model
from classroom.models import Exercise

User = get_user_model()

class ProcessedDocument(models.Model):
    """Model to store processed documents and their analysis results"""
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE, related_name='processed_documents')
    original_file = models.FileField(upload_to='processed_documents/')
    processed_text = models.TextField(blank=True)
    processed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='processed_documents')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Document for {self.exercise.title} by {self.processed_by}"

class PlagiarismCheck(models.Model):
    """Model to store plagiarism check results"""
    document = models.ForeignKey(ProcessedDocument, on_delete=models.CASCADE, related_name='plagiarism_checks')
    similarity_score = models.FloatField(null=True, blank=True)
    matched_sources = models.JSONField(default=dict, blank=True)
    checked_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='plagiarism_checks')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Plagiarism check for {self.document}"

class AIAnalysis(models.Model):
    """Model to store AI analysis results"""
    ANALYSIS_TYPES = [
        ('correction', 'Grammar and Spelling Correction'),
        ('feedback', 'Detailed Feedback'),
        ('grading', 'Grading'),
        ('code', 'Code Analysis'),
    ]

    document = models.ForeignKey(ProcessedDocument, on_delete=models.CASCADE, related_name='ai_analyses')
    analysis_type = models.CharField(max_length=20, choices=ANALYSIS_TYPES)
    analysis_result = models.JSONField(default=dict, blank=True)
    analyzed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='ai_analyses')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'AI Analysis'
        verbose_name_plural = 'AI Analyses'

    def __str__(self):
        return f"{self.get_analysis_type_display()} for {self.document}"

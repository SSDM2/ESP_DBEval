from rest_framework import serializers
from .models import ProcessedDocument, PlagiarismCheck, AIAnalysis

class ProcessedDocumentSerializer(serializers.ModelSerializer):
    """Serializer for ProcessedDocument model."""
    class Meta:
        model = ProcessedDocument
        fields = ['id', 'exercise', 'original_file', 'processed_text', 'processed_by', 'created_at', 'updated_at']
        read_only_fields = ['processed_text', 'processed_by', 'created_at', 'updated_at']

class PlagiarismCheckSerializer(serializers.ModelSerializer):
    """Serializer for PlagiarismCheck model."""
    class Meta:
        model = PlagiarismCheck
        fields = ['id', 'document', 'similarity_score', 'matched_sources', 'checked_by', 'created_at', 'updated_at']
        read_only_fields = ['similarity_score', 'matched_sources', 'checked_by', 'created_at', 'updated_at']

class AIAnalysisSerializer(serializers.ModelSerializer):
    """Serializer for AIAnalysis model."""
    class Meta:
        model = AIAnalysis
        fields = ['id', 'document', 'analysis_type', 'analysis_result', 'analyzed_by', 'created_at', 'updated_at']
        read_only_fields = ['analysis_result', 'analyzed_by', 'created_at', 'updated_at'] 
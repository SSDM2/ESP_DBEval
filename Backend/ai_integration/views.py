from django.shortcuts import render
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import ProcessedDocument, PlagiarismCheck, AIAnalysis
from .utils import TextProcessor, PlagiarismDetector, OllamoClient, DeepSeekClient
from .serializers import (
    ProcessedDocumentSerializer,
    PlagiarismCheckSerializer,
    AIAnalysisSerializer
)
import os
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

# Create your views here.

class ProcessedDocumentViewSet(viewsets.ModelViewSet):
    """ViewSet for viewing and editing processed documents."""
    queryset = ProcessedDocument.objects.all()
    serializer_class = ProcessedDocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Filter documents to return only those processed by the current user."""
        return ProcessedDocument.objects.filter(processed_by=self.request.user)

    def perform_create(self, serializer):
        """Set the processed_by field to the current user when creating a document."""
        serializer.save(processed_by=self.request.user)

    @action(detail=True, methods=['post'])
    def process_document(self, request, pk=None):
        """Process the document and extract its text."""
        document = get_object_or_404(ProcessedDocument, pk=pk, processed_by=request.user)
        text_processor = TextProcessor()
        
        try:
            # Extract text from the document
            text = text_processor.extract_text_from_file(document.original_file.path)
            processed_text = text_processor.preprocess_text(text)
            
            # Update the processed document
            document.processed_text = processed_text
            document.save()
            
            return Response({
                'status': 'success',
                'message': 'Document processed successfully',
                'processed_text': processed_text
            })
        except Exception as e:
            return Response({
                'status': 'error',
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

class PlagiarismCheckViewSet(viewsets.ModelViewSet):
    """ViewSet for viewing and editing plagiarism checks."""
    queryset = PlagiarismCheck.objects.all()
    serializer_class = PlagiarismCheckSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Filter checks to return only those performed by the current user."""
        return PlagiarismCheck.objects.filter(checked_by=self.request.user)

    def perform_create(self, serializer):
        """Set the checked_by field to the current user when creating a check."""
        serializer.save(checked_by=self.request.user)

    @action(detail=True, methods=['post'])
    def check_plagiarism(self, request, pk=None):
        """Check the document for plagiarism."""
        plagiarism_check = get_object_or_404(PlagiarismCheck, pk=pk, checked_by=request.user)
        detector = PlagiarismDetector()
        
        try:
            # Get the document text
            document_text = plagiarism_check.document.processed_text
            if not document_text:
                return Response({
                    'status': 'error',
                    'message': 'Document has not been processed yet'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Get reference texts from request
            reference_texts = request.data.get('reference_texts', [])
            if not reference_texts:
                return Response({
                    'status': 'error',
                    'message': 'No reference texts provided'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Perform plagiarism check
            result = detector.check_plagiarism(document_text, reference_texts)
            
            # Update the plagiarism check
            plagiarism_check.similarity_score = result['similarity_score']
            plagiarism_check.matched_sources = result['matched_sources']
            plagiarism_check.save()
            
            return Response(result)
        except Exception as e:
            return Response({
                'status': 'error',
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

class AIAnalysisViewSet(viewsets.ModelViewSet):
    """ViewSet for viewing and editing AI analyses."""
    queryset = AIAnalysis.objects.all()
    serializer_class = AIAnalysisSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Filter analyses to return only those performed by the current user."""
        return AIAnalysis.objects.filter(analyzed_by=self.request.user)

    def perform_create(self, serializer):
        """Set the analyzed_by field to the current user when creating an analysis."""
        serializer.save(analyzed_by=self.request.user)

    @action(detail=True, methods=['post'])
    def analyze(self, request, pk=None):
        """Analyze the document using AI."""
        analysis = get_object_or_404(AIAnalysis, pk=pk, analyzed_by=request.user)
        
        try:
            # Get the document text
            document_text = analysis.document.processed_text
            if not document_text:
                return Response({
                    'status': 'error',
                    'message': 'Document has not been processed yet'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Initialize appropriate AI client based on analysis type
            if analysis.analysis_type == 'code':
                client = DeepSeekClient(api_key=os.getenv('DEEPSEEK_API_KEY'))
                result = client.analyze_code(document_text)
            else:
                client = OllamoClient(api_key=os.getenv('OLLAMA_API_KEY'))
                result = client.analyze_text(document_text, analysis.analysis_type)
            
            # Update the analysis
            analysis.analysis_result = result
            analysis.save()
            
            return Response(result)
        except Exception as e:
            return Response({
                'status': 'error',
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

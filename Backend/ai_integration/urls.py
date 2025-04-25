from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProcessedDocumentViewSet, PlagiarismCheckViewSet, AIAnalysisViewSet

router = DefaultRouter()
router.register(r'documents', ProcessedDocumentViewSet, basename='processed-document')
router.register(r'plagiarism', PlagiarismCheckViewSet, basename='plagiarism-check')
router.register(r'analysis', AIAnalysisViewSet, basename='ai-analysis')

urlpatterns = [
    path('', include(router.urls)),
] 
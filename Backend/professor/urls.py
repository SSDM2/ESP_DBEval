# exercises/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'professor', ProfessorViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('prof/add/', RegisterView.as_view(), name="add_professor"),
]
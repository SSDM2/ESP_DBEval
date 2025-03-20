from django.conf import settings
from exercise.functions import validate_pdf
from utils.constants import AppConstants
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Exercise, Classroom
from .serializers import ExerciseSerializer
from django.core.exceptions import ValidationError

class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'uuid'
    
    # def get_serializer_context(self):
    #     context = super().get_serializer_context()
    #     context['request'] = self.request
    #     return context

    
    def create(self, request):
        pdf_file = request.FILES.get('pdf')
        if not pdf_file:
            return Response({"error": "pdf file is mandatory"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Vérifier que l'utilisateur est un professeur
        user = self.request.user
        if not user.is_professor:
            return Response({"error": "Only professors can create exercises"}, status=status.HTTP_403_FORBIDDEN)
        
        # Récupérer la classe associée
        classroom_id = self.request.data.get('classroom')
        
        try:
            classroom = Classroom.objects.get(uuid=classroom_id)
        except Classroom.DoesNotExist:
            return Response({"error": "Classroom not found"}, status=status.HTTP_404_NOT_FOUND)

        # Vérifier que le professeur est bien le professeur de la classe
        if classroom.professor != self.request.user:
            return Response({"error": "You are not the professor of this classroom"}, status=status.HTTP_403_FORBIDDEN)


        # Valider la taille du fichier
        try:
            validate_pdf(pdf_file)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Générer un nom unique pour le fichier
        data = request.data
        data['classroom'] = classroom.uuid  # Associer la classe à l'exercice
        data['sender'] = user.uuid
        
        # Sauvegarder l'exercice dans la base de données
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

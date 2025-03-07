from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Exercise, Classroom
from .serializers import ExerciseSerializer

class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'uuid'
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def create(self, request):
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

        data = request.data
        data['classroom'] = classroom.uuid  # Associer la classe à l'exercice
        data['sender'] = user.uuid

        serializer = self.get_serializer(data=data)  # Utiliser les données avec le serializer
        if serializer.is_valid():
            serializer.save()  # Sauvegarder l'exercice
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Retourner la réponse avec l'exercice créé
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Retourner les erreurs du serializer si invalide
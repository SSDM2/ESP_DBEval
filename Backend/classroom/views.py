from professor.models import Professor
from student.models import Student
from user.models import RoleEnum
from rest_framework import viewsets, status
from .models import Classroom
from .serializers import ClassroomSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import authentication_classes, permission_classes, action
from rest_framework.response import Response

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class ClassroomViewSet(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer
    lookup_field = 'uuid'
    


    # Ajouter un étudiant à une classe
    @action(detail=True, methods=['post'], url_path='add-student')
    def add_student(self, request, uuid):
        classroom = self.get_object()
        student_id = request.data.get('student_uuid')

        if not student_id:
            return Response({"error": "student_uuid is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            student = Student.objects.get(uuid=student_id)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

        classroom.students.add(student)
        return Response({"message": "Student: "+ student.first_name +" added successfully"}, status=status.HTTP_200_OK)

    # Supprimer un étudiant d'une classe
    @action(detail=True, methods=['post'], url_path='remove-student')
    def remove_student(self, request, uuid):
        classroom = self.get_object()
        student_id = request.data.get('student_uuid')

        if not student_id:
            return Response({"error": "student_uuid is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            student = Student.objects.get(uuid=student_id)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

        classroom.students.remove(student)
        return Response({"message": "Student: "+ student.first_name +" removed successfully"}, status=status.HTTP_200_OK)

    # Ajouter ou modifier le professeur d'une classe
    @action(detail=True, methods=['post'], url_path='change-professor')
    def change_professor(self, request, uuid):
        classroom = self.get_object()
        professor_id = request.data.get('professor_uuid')

        if not professor_id:
            return Response({"error": "professor_uuid is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            professor = Professor.objects.get(uuid=professor_id, role=RoleEnum.PROFESSOR.name)
        except Professor.DoesNotExist:
            return Response({"error": "Professor not found"}, status=status.HTTP_404_NOT_FOUND)

        classroom.professor = professor
        classroom.save()
        serializer = self.get_serializer(classroom)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
        # Supprimer le professeur d'une classe
    @action(detail=True, methods=['post'], url_path='remove-professor')
    def remove_professor(self, request, uuid):
        classroom = self.get_object()
        professor_id = request.data.get('professor_uuid')

        if not professor_id:
            return Response({"error": "professor_uuid is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            professor = Professor.objects.get(uuid=professor_id, role=RoleEnum.PROFESSOR.name)
            delete = professor
        except Professor.DoesNotExist:
            return Response({"error": "Professor not found"}, status=status.HTTP_404_NOT_FOUND)

        classroom.professor = None
        classroom.save()
        return Response({"message": "Professor: "+ delete.first_name +" removed successfully"}, status=status.HTTP_200_OK)
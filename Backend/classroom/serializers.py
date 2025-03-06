

from professor.models import Professor
from classroom.models import Classroom
from professor.serializers import ProfessorSerializer
from student.models import Student
from rest_framework import serializers


class ClassroomSerializer(serializers.ModelSerializer):
    professor = ProfessorSerializer(read_only=True)
    students = serializers.SlugRelatedField(queryset=Student.objects.all(), many=True, slug_field='uuid')

    class Meta:
        model = Classroom
        fields = ['uuid', 'name', 'professor', 'students', 'acad_year', 'created_at', 'updated_at']
     
class ClassroomStudentSerializer(serializers.ModelSerializer):
    professor = ProfessorSerializer(read_only=True)

    class Meta:
        model = Classroom
        fields = ['uuid', 'name', 'professor', 'acad_year', 'created_at', 'updated_at']

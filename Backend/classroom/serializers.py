

from classroom.models import Classroom
from professor.serializers import ProfessorSerializer
from student.models import Student
from rest_framework import serializers, validators


class ClassroomSerializer(serializers.ModelSerializer):
    professor = ProfessorSerializer(read_only=True)
    students = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all(), many=True)

    class Meta:
        model = Classroom
        fields = ['uuid', 'name', 'professor', 'students','acad_year','created_at', 'updated_at']
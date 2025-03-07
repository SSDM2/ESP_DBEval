# serializers.py

from classroom.serializers import ClassroomSerializer
from professor.serializers import ProfessorSerializer
from classroom.models import Classroom
from professor.models import Professor
from rest_framework import serializers
from .models import Exercise

class ExerciseSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(queryset=Professor.objects.all(), many=False, slug_field='uuid')
    classroom = serializers.SlugRelatedField(queryset=Classroom.objects.all(), many=False, slug_field='uuid')
    
    class Meta:
        model = Exercise
        fields = ['uuid', 'title', 'description', 'pdf', 'sender', 'classroom', 'deadline', 'created_at', 'updated_at']

    def validate_pdf(self, value):
        return value
    
    def get_pdf(self, obj):
        return obj.pdf.url if obj.pdf else None
    
    # def create(self, validated_data):
    #     sender = self.context['request'].user
    #     classroom = Classroom.objects.get(uuid=validated_data['classroom'])
        
    #     exercise = Exercise.objects.create(
    #         title=validated_data['title'],
    #         description=validated_data['description'],
    #         pdf=validated_data['pdf'],
    #         email=validated_data['email'],
    #         sender=sender,
    #         deadline=validated_data['deadline'],
    #         classroom = classroom
    #     )
    #     return exercise
    
from Backend.professor.models import Professor
from rest_framework import serializers

class ProfessorSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='get_role_display')
    class Meta:
        model = Professor
        fields = ['uuid', 'last_name', 'users', 'role', 'first_name', 'email','created_at','updated_at']
from exercise.models import Exercise
from classroom.models import Classroom
from user.models import RoleEnum, User
from professor.models import Professor
from rest_framework import serializers, validators
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.tokens import RefreshToken

class ProfessorSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='get_role_display')
    classrooms = serializers.SlugRelatedField(queryset=Classroom.objects.all(), many=True, slug_field='uuid')
    exercises = serializers.SlugRelatedField(queryset=Exercise.objects.all(), many=True, slug_field='uuid')
    class Meta:
        model = Professor
        fields = ['uuid', 'last_name', 'role', 'first_name', 'classrooms', 'exercises', 'email','created_at','updated_at']
    
class RegisterProfessorSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)

    class Meta:
        model = Professor
        fields = ['uuid', 'last_name', 'first_name', 'email', 'password', 'refresh', 'access','created_at','updated_at']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {
                'required': True,
                'allow_blank': False,
                'validators': [
                    validators.UniqueValidator(Professor.objects.all(), "Cet email existe déjà")
                ]
            }
        }

    def create(self, validated_data):
        user = Professor.objects.create(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            role=RoleEnum.PROFESSOR.name
        )
        user.set_password(validated_data['password'])  # Hache le mot de passe
        user.save()
        
        return user
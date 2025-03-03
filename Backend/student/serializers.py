from .models import Student
from rest_framework import serializers, validators
from django.contrib.auth.password_validation import validate_password
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
      
class GetStudentSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='get_role_display')
    # role = serializers.ChoiceField(choices=Student.role.choices)
    class Meta:
        model = Student
        fields = ['uuid', 'last_name', 'role', 'first_name', 'email','created_at','updated_at']
        

class RegisterStudentSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    token = serializers.SerializerMethodField(read_only=True)  # Token généré après l'inscription

    class Meta:
        model = Student
        fields = ['last_name', 'role', 'first_name', 'email', 'password', 'token']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {
                'required': True,
                'allow_blank': False,
                'validators': [
                    validators.UniqueValidator(Student.objects.all(), "Cet email existe déjà")
                ]
            }
        }

    def get_token(self, obj):
        # Génère un token pour l'utilisateur après l'inscription
        token, created = Token.objects.get_or_create(user=obj)
        return token.key

    def create(self, validated_data):
        # Crée un nouvel utilisateur avec un mot de passe haché
        user = Student.objects.create_user(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
            email=validated_data['email'],
            role=validated_data['role']
        )
        return user

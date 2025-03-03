from professor.models import Professor
from rest_framework import serializers, validators
from django.contrib.auth.password_validation import validate_password
from rest_framework.authtoken.models import Token

# class ProfessorSerializer(serializers.ModelSerializer):
#     # role = serializers.CharField(source='get_role_display')
#     class Meta:
#         model = Professor
#         fields = ['uuid', 'last_name', 'role', 'first_name', 'email','created_at','updated_at']
        
class GetProfessorSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='get_role_display')
    # role = serializers.ChoiceField(choices=Professor.role.choices)
    class Meta:
        model = Professor
        fields = ['uuid', 'last_name', 'role', 'first_name', 'email','created_at','updated_at']
        
# class PasswordSerializer(serializers.Serializer):
#     password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

#     def update(self, instance, validated_data):
#         instance.set_password(validated_data['password'])# Hache le mot de passe
#         instance.save()
#         return instance

class RegisterProfessorSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    token = serializers.SerializerMethodField(read_only=True)  # Token généré après l'inscription

    class Meta:
        model = Professor
        fields = ['last_name', 'role', 'first_name', 'email', 'password', 'token']
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

    def get_token(self, obj):
        # Génère un token pour l'utilisateur après l'inscription
        token, created = Token.objects.get_or_create(user=obj)
        return token.key

    def create(self, validated_data):
        # Crée un nouvel utilisateur avec un mot de passe haché
        user = Professor.objects.create_user(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
            email=validated_data['email'],
            role=validated_data['role']
        )
        return user
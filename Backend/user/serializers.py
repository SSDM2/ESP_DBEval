from professor.models import Professor
from rest_framework import serializers, validators
from django.contrib.auth.password_validation import validate_password
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    token = serializers.CharField(read_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            if not user:
                raise serializers.ValidationError("Identifiants incorrects.")
        else:
            raise serializers.ValidationError("L'email et le mot de passe sont requis.")

        data['user'] = user
        data['token'] = user.auth_token.key  # Récupère le token de l'utilisateur
        return data
    
    def renvoie(self, instance):
        user = instance['user']
        token = instance['token']
        return {
            'token': token,
            'uuid': user.uuid,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'role': user.get_role_display(),
            'created_at': user.created_at,
            'updated_at': user.updated_at,
        }
    
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True, validators=[validate_password])

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Ancien mot de passe incorrect.")
        return value

    def update(self, instance, validated_data):
        instance.set_password(validated_data['new_password'])
        instance.save()
        return instance

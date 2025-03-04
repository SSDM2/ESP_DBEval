# backends.py
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        UserModel = get_user_model()
        try:
            # Récupérer l'utilisateur par email
            user = UserModel.objects.get(email=email)
            # Vérifier le mot de passe
            if user.check_password(password):
                return user
        except UserModel.DoesNotExist:
            return None
        return None
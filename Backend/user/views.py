from datetime import datetime
from .models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from .serializers import ChangePasswordSerializer, LoginSerializer
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken


class LoginView(APIView):
    @swagger_auto_schema(
        request_body=LoginSerializer,
        responses={201: 'Token and user information', 400: 'Bad Request'},
        operation_description="Authenticate a user and return a token along with user information."
    )
    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.validated_data['user']
            user.last_login = datetime.today()
            user.save()
            # Générer les tokens JWT
            refresh = RefreshToken.for_user(user)
            
            # Construire la réponse
            response_data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'uuid': str(user.uuid),
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'role': user.get_role_display(),
                'created_at': user.created_at,
                'updated_at': user.updated_at,
            }
            
            return Response(response_data, status=status.HTTP_200_OK)
        
        # Si les données ne sont pas valides, renvoyer les erreurs
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class ChangePasswordView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ChangePasswordSerializer
    lookup_field = 'uuid'

    @swagger_auto_schema(
        request_body=ChangePasswordSerializer,  # Spécifie le serializer pour les paramètres
        responses={200: 'Password changed successfully', 400: 'Bad Request'},
        operation_description="Change the password of the authenticated user."
    )
    def get_object(self):
        # Utilisez l'utilisateur authentifié, qui est supposé être un professeur
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.update(user, serializer.validated_data)
            return Response({'status': 'password changed'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

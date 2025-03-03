from rest_framework.decorators import action
from rest_framework.exceptions import MethodNotAllowed
from .serializers import *
from .models import *
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class ProfessorViewSet(viewsets.ModelViewSet):
    queryset = Professor.objects.all()
    serializer_class = GetProfessorSerializer
    lookup_field = 'uuid'
    
    @swagger_auto_schema(
        request_body=ChangePasswordSerializer,  # Spécifie le serializer pour les paramètres
        responses={200: 'Password changed successfully', 400: 'Bad Request'},
        operation_description="Change the password of the authenticated user."
    )
    
    def create(self, request, *args, **kwargs):
        raise MethodNotAllowed('POST', detail="Creation of professors is not allowed.")
    
    @action(detail=True, methods=['post'])
    def change_password(self, request, pk=None):
        user = self.get_object()
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.update(user, serializer.validated_data)
            return Response({'status': 'password changed'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(generics.CreateAPIView):
    queryset = Professor.objects.all()
    serializer_class = RegisterProfessorSerializer
    lookup_field = 'uuid'

class LoginView(APIView):
    @swagger_auto_schema(
        request_body=LoginSerializer,
        responses={201: 'Token and user information', 400: 'Bad Request'},
        operation_description="Authenticate a user and return a token along with user information."
    )
    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
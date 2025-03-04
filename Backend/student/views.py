from rest_framework.decorators import action
from rest_framework.exceptions import MethodNotAllowed
from .serializers import *
from .models import *
from user.serializers import ChangePasswordSerializer
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = GetStudentSerializer
    lookup_field = 'uuid'
    
    def create(self, request, *args, **kwargs):
        raise MethodNotAllowed('POST', detail="Creation of students is not allowed.")

class RegisterView(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = RegisterStudentSerializer
    lookup_field = 'uuid'
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
                # Générer les tokens JWT
        refresh = RefreshToken.for_user(user)
        
        # Créer une réponse personnalisée
        response_data = serializer.data
        response_data['refresh'] = str(refresh)
        response_data['access'] = str(refresh.access_token)
        
        return Response(
            response_data,
            status=status.HTTP_201_CREATED
        )
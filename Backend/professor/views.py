from rest_framework.decorators import action
from rest_framework.exceptions import MethodNotAllowed
from .serializers import *
from .models import *
from user.serializers import ChangePasswordSerializer, LoginSerializer
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
    
    def create(self, request, *args, **kwargs):
        raise MethodNotAllowed('POST', detail="Creation of professors is not allowed.")

class RegisterView(generics.CreateAPIView):
    queryset = Professor.objects.all()
    serializer_class = RegisterProfessorSerializer
    lookup_field = 'uuid'

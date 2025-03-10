from classroom.models import Classroom
from classroom.serializers import ClassroomStudentSerializer
from user.models import RoleEnum
from .models import Student
from rest_framework import serializers, validators
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.tokens import RefreshToken
      
class StudentSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='get_role_display')
    classroom = ClassroomStudentSerializer()
    class Meta:
        model = Student
        fields = ['uuid', 'last_name', 'role', 'first_name', 'email', 'classroom', 'created_at','updated_at']
        
    def get_classroom(self, obj):
        return obj.classroom if obj.classroom else None

class StudentBasicSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='get_role_display')
    classroom =serializers.SlugRelatedField(queryset=Classroom.objects.all(), many=True, slug_field='uuid' )
    class Meta:
        model = Student
        fields = ['uuid', 'last_name', 'role', 'first_name', 'email', 'classroom', 'created_at','updated_at']        

class RegisterStudentSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
    class Meta:
        model = Student
        fields = ['uuid', 'last_name', 'first_name', 'email', 'password', 'refresh', 'access','created_at','updated_at']
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

    def create(self, validated_data):
        user = Student.objects.create(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            role=RoleEnum.STUDENT.name
        )
        user.set_password(validated_data['password'])  # Hache le mot de passe
        user.save()
        
        return user

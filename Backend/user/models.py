from enum import Enum
import uuid
from django.utils.translation import gettext_lazy as _
from django.contrib.gis.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class RoleEnum(Enum):
    PROFESSOR = 'Professor'
    STUDENT = 'Student'

class CustomAccountManager(BaseUserManager):
    def create_superuser(self, email, first_name, last_name, password, **other_fields):
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)
            
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, first_name, last_name, password, **other_fields)

    def create_user(self, email, first_name, last_name, password, role=None, **other_fields):
        if role not in RoleEnum.__members__.values():
            raise ValueError('Role must be either Professor or Student.')
        
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, ** other_fields)
        user.set_password(password)
        user.role = role
        user.save()
        return user
    
class User(AbstractBaseUser, PermissionsMixin):
    objects         =   CustomAccountManager()
    email           =   models.EmailField(_('email address'), unique=True)
    uuid            =   models.UUIDField(default=uuid.uuid4,unique=True, editable=False)
    last_name       =   models.CharField(max_length=150, blank=True)
    first_name      =   models.CharField(max_length=150, blank=True)
    role = models.CharField(
            max_length=10,
            choices=[(role.name, role.value) for role in RoleEnum],
        )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  
    
    
    groups = models.ManyToManyField('auth.Group', related_name='user_set_custom', blank=True)
    user_permissions = models.ManyToManyField('auth.Permission', related_name='user_permissions_custom', blank=True)
    
    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = [ 'first_name','last_name', 'email', ]
    
    
    @property
    def is_professor(self):
        return self.role == RoleEnum.PROFESSOR.name

    @property
    def is_student(self):
        return self.role == RoleEnum.STUDENT.name

    def __str__(self):
        return f" {self.first_name}  {self.last_name}"
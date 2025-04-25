import uuid
from django.utils.translation import gettext_lazy as _
from django.contrib.gis.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from utils.enums import RoleEnum

class CustomAccountManager(BaseUserManager):
    def create_superuser(self, email, first_name, last_name, password, **other_fields):
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)
        other_fields.setdefault('is_staff', True)
            
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')
            
        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')

        return self.create_user(email, first_name, last_name, password, **other_fields)

    def create_user(self, email, first_name, last_name, password, role=RoleEnum.ADMIN.name, **other_fields):
        if role:
            if role not in [role.name for role in RoleEnum]:
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
    uuid            =   models.UUIDField(default=uuid.uuid4,unique=True, editable=False, db_index=True)
    last_name       =   models.CharField(max_length=150, null=False, blank=False)
    first_name      =   models.CharField(max_length=150, blank=True)
    role = models.CharField(
            max_length=10,
            choices=[(role.name, role.value) for role in RoleEnum],
        )
    is_staff = models.BooleanField(default=False)  # Champ requis pour l'interface d'administration
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  
    
    
    groups = models.ManyToManyField('auth.Group', related_name='user_set_custom', blank=True)
    user_permissions = models.ManyToManyField('auth.Permission', related_name='user_permissions_custom', blank=True)
    
    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = [ 'first_name','last_name']
    
    
    @property
    def is_professor(self):
        return self.role == RoleEnum.PROFESSOR.name

    @property
    def is_student(self):
        return self.role == RoleEnum.STUDENT.name

    def __str__(self):
        return f" {self.first_name}  {self.last_name}"
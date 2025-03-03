
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import BaseUserManager
from user.models import *

# Gestion des managers    
class StudentManager(BaseUserManager):
    def get_queryset(self):
        """
        Renvoie un queryset filtré pour n'inclure que les utilisateurs de type 'Student'.
        """
        return super().get_queryset().filter(role=RoleEnum.STUDENT.name)

class Student(User):
    objects = StudentManager()
    class  Meta:
        proxy =True
        managed = True
        verbose_name = 'Student'
        verbose_name_plural = 'Students'


from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import BaseUserManager
from user.models import *



# Gestion des managers
class ProfessorManager(BaseUserManager):
    def get_queryset(self):
        """
        Renvoie un queryset filtré pour n'inclure que les utilisateurs de type 'Professor'.
        """
        return super().get_queryset().filter(role=RoleEnum.PROFESSOR.name)


class Professor(User):
    objects = ProfessorManager()
    class Meta:
        proxy=True
        managed = True
        verbose_name = 'Professor'
        verbose_name_plural = 'Professors'
        
    @property
    def classrooms(self):
        """
        Renvoie les classes enseignées par ce professeur.
        """
        return self.taught_classrooms.all()
    
    @property
    def exercises(self):
        """
        Renvoie les les exercices créés par ce professeur.
        """
        return self.created_exercises.all()

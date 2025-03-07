from django.db import models
from student.models import Student
from professor.models import Professor
from user.models import RoleEnum
import uuid

# Create your models here.
class Classroom(models.Model):
    uuid            =   models.UUIDField(default=uuid.uuid4,unique=True, editable=False, db_index=True)
    name            =   models.CharField(max_length=150, unique=True)
    acad_year       =   models.DateField(null=False)
    professor       =   models.ForeignKey(Professor, on_delete=models.CASCADE, related_name='taught_classrooms', limit_choices_to={'role': RoleEnum.PROFESSOR.name},null=True)
    created_at      =   models.DateTimeField(auto_now_add=True)
    updated_at      =   models.DateTimeField(auto_now=True)
    students        =   models.ManyToManyField(Student, related_name='student_classroom', limit_choices_to={'role': RoleEnum.STUDENT.name})

    def __str__(self):
        return self.name
    
    @property
    def exercises(self):
        """
        Renvoie les exercises d'une classe.
        """
        return self.all_exercises.all()
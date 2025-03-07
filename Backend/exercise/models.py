from django.db import models
from datetime import datetime
from professor.models import Professor
from user.models import RoleEnum, User
from classroom.models import Classroom
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
import uuid

def validate_pdf_size(value):
    max_size = 10 * 1024 * 1024  # 10 MB en octets
    if value.size > max_size:
        raise ValidationError("Le fichier est trop volumineux. La taille maximale autorisée est de 10 MB.")

class Exercise(models.Model):
    uuid            =   models.UUIDField(default=uuid.uuid4,unique=True, editable=False, db_index=True)
    title           =   models.CharField(max_length=200, null=False)
    description     =   models.TextField(null=True, blank=True)
    classroom       =   models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name='all_exercises')  # Relie l'exercice à une classe
    sender          =   models.ForeignKey(Professor, on_delete=models.DO_NOTHING, related_name='created_exercises', limit_choices_to={'role': RoleEnum.PROFESSOR.name}, blank=True)  # Le professeur qui crée l'exercice
    deadline        =   models.DateTimeField(null=False)  # Date limite pour rendre l'exercice
    pdf             =   models.FileField(upload_to='exercises/%Y/%m/%d/', null=False,
                        validators=[
                        FileExtensionValidator(allowed_extensions=['pdf']),
                        validate_pdf_size 
                    ])
    created_at      =   models.DateTimeField(auto_now_add=True) 
    updated_at      =   models.DateTimeField(auto_now=True)    

    def __str__(self):
        return self.title

from django.db.models.signals import post_migrate
from django.core.management import call_command
from django.dispatch import receiver

@receiver(post_migrate)
def create_superuser(sender, **kwargs):
    print("Création du superutilisateur après migration...")
    call_command('create_superuser')
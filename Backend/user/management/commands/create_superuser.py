from django.core.management.base import BaseCommand
from user.models import RoleEnum, User

class Command(BaseCommand):
    help = 'Crée un superutilisateur avec des informations par défaut'

    def handle(self, *args, **kwargs):
        email = "admin@smartedu.sn"
        last_name = "admin"
        first_name = ""
        password = "@dmin1234"

        if not User.objects.filter(last_name=last_name).exists():
            print(f"Création du superutilisateur {last_name}...")
            User.objects.create_superuser(email=email, password=password, last_name=last_name, first_name=first_name)
            print("Superutilisateur créé avec succès !")
        else:
            print(f"Le superutilisateur {last_name} existe déjà.")

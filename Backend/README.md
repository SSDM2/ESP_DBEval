# Projet Python

## Description

Ce projet utilise **Django** et **Django REST Framework** pour gérer les informations de gestion de note des etudiants pour l'IA, permettre l'authentification des utilisateurs, et exposer des API RESTful permettant de créer, lire, mettre à jour et supprimer.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- **Python 3.x** - [Télécharger Python](https://www.python.org/downloads/)
- **Pip** - [Installer Pip](https://pip.pypa.io/en/stable/)
- **Virtualenv** - [Installer Virtualenv](https://virtualenv.pypa.io/en/stable/)

## Installation

**1. Cloner le projet**
   Clonez ce dépôt sur votre machine locale :
   ```python
   gith clone https://github.com/SSDM2/ESP_DBEval
   cd ESP_DBEVAL/Backend
   ```
**2. Créer un environnement virtuel**
   ```python
   python -m venv .env
   ```
**3. Activer l'environnement virtuel**
   - **Sur Windows**
   ```python
   .env\Scripts\activate
   ```
   - **Sur macOS/Linux :**
   ```python
   source .env/bin/activate
   ```
**4. Installer les dépendances**
   
   Une fois l'environnement virtuel activé, installez les dépendances à partir du fichier `requirements.txt` :
   ```python
   pip install -r requirements.txt
   ```

## Configuration

**1. Configurer la base de données**

   Le projet utilise une base de données SQLite par défaut. Si vous souhaitez utiliser une autre base de données (PostgreSQL, MySQL, etc.), vous devez modifier les paramètres dans le fichier `settings.py`.
   ```
   /Backend│
   ├── /config                         # Dossier de configuration global de Django
   │   ├── __init__.py                 
   │   ├── settings.py                 # Paramètres globaux du projet Django (base de données, CORS, etc.)
   ```

**2. Créer les migrations**

   Après avoir installé les dépendances, configuré la base de données(optionnel), vous devez créer les migrations :

   ```python
   python manage.py makemigrations
   python manage.py migrate
   ```

**3. Créer un superutilisateur (facultatif)**

   Si vous souhaitez accéder à l'interface d'administration de Django, créez un superutilisateur :

   ```python
   python manage.py createsuperuser
   ```

   Suivez les instructions pour définir le nom, l'adresse e-mail et le mot de passe.

## Exécution du projet

1. Démarrer le serveur de développement

   Vous pouvez démarrer le serveur de développement avec la commande suivante :
   ```python
   python manage.py runserver 0.0.0.0:8000
   ```
   Cela démarrera le serveur sur http://localhost:8000, et vous pouvez aussi avoir accès depuis un autre devices en mettant l'adresse de la machine hôte et le port. Ex: [192.168.1.39:8000](#)

2. Accédez à l'interface d'administration Django :

   http://localhost:8000/admin/

   Utilisez les identifiants du superutilisateur pour vous connecter.

3. Accéder à l'API

   Vous pouvez maintenant accéder aux différentes API exposées à l'adresse http://localhost:8000.
   Aller sur http://localhost:8000/swagger/ pour voir la documentation des différents Endpoits existants.
   Pour interagir avec l'API, utilisez des outils comme `Postman` ou `curl`.

## Exemples d'Endpoints API
   - **GET** /professor/ : Liste tous les professeurs.
   - **GET** /professor/{uuid}/ : Récupère les détails d'un professeur spécifique.
   - **POST** /auth/{uuid}/change_password/ : Change le mot de passe du utilisateur authentifié.
   - **POST** /auth/login/ : Connexion d'un utilisateur, renvoie un token.
   - **POST** /auth/logout/ : Déconnexion de l'utilisateur.


## Collaboration

   Pour travailler au backend, suivez ces étapes :

   - Créez une branche pour votre fonctionnalité (git checkout -b feature/NouvelleFonctionnalité).
   - Committez vos changements (git commit -m 'Ajouter une nouvelle fonctionnalité').
   - Pushez la branche (git push origin feature/NouvelleFonctionnalité).
   - Ouvrez une Pull Request(sur Github).
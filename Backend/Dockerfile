# Utilisation d'une image de base officielle de Python
FROM python:3.9-slim

# Mettre à jour pip
RUN pip install --upgrade pip

# Installation des dépendances système pour mysqlclient
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Définition d'un répertoire de travail
WORKDIR /app

#Copie du fichier de dépendances (requirements.txt)
COPY requirements.txt /app/

# Installation des dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Copie du reste des fichiers du projet dans le conteneur
COPY . /app/

# Exposition du port sur lequel l'application Django va écouter (par défaut, 8000)
EXPOSE 8000

# Lancer les migrations et démarrer le serveur Django
CMD ["bash", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
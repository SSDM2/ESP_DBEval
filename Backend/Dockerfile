# Étape 1 : Utiliser une image de base officielle de Python
FROM python:3.13.2-slim

# Étape 2 : Définir un répertoire de travail
WORKDIR /app

# Installer les dépendances système nécessaires pour GDAL
RUN apt-get update && apt-get install -y \
    binutils \
    libproj-dev \
    gdal-bin \
    libgdal-dev \
    # Autres dépendances qui pourraient être nécessaires
    build-essential \
    pkg-config \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Définir les variables d'environnement pour GDAL
ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal

# Étape 3 : Copier le fichier de dépendances (requirements.txt)
COPY requirements.txt /app/

# Étape 4 : Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Étape 5 : Copier le reste des fichiers du projet dans le conteneur
COPY . /app/

# Étape 6 : Exposer le port sur lequel l'application Django va écouter (par défaut, 8000)
EXPOSE 8000


# Étape 7 : Lancer les migrations et démarrer le serveur Django
CMD ["bash", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]


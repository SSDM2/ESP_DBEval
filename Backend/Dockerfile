# Utilisation d'une image GDAL comme base
FROM osgeo/gdal:ubuntu-full-3.4.1

# Installation de Python et des dépendances système
RUN apt-get update && apt-get install -y \
    python3.9 \
    python3.9-dev \
    python3-pip \
    default-libmysqlclient-dev \
    build-essential \
    python3-setuptools \
    python3-wheel \
    && rm -rf /var/lib/apt/lists/*

# Créer un lien symbolique pour python3.9
RUN ln -sf /usr/bin/python3.9 /usr/bin/python
RUN ln -sf /usr/bin/pip3 /usr/bin/pip

# Mettre à jour pip et installer les outils de build
RUN python -m pip install --upgrade pip setuptools wheel

# Configuration des variables d'environnement GDAL
ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal
ENV LIBRARY_PATH=/usr/lib
ENV LD_LIBRARY_PATH=/usr/lib
ENV GDAL_DATA=/usr/share/gdal
ENV PYTHONPATH=/usr/lib/python3/dist-packages

# Définition d'un répertoire de travail
WORKDIR /app

# Copie du fichier de dépendances (requirements.txt)
COPY requirements.txt /app/

# Installation des dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Exposition du port sur lequel l'application Django va écouter
EXPOSE 8000

# Point d'entrée par défaut
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
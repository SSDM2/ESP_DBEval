# Plateforme Intelligente d'Évaluation Automatisée des Exercices de Bases de Données

## Description

Ce projet vise à créer une **plateforme web intelligente** permettant aux professeurs de déposer des sujets d'exercices en bases de données et aux étudiants de soumettre leurs réponses sous forme de fichiers PDF. La plateforme utilise un moteur d'intelligence artificielle basé sur **Ollama** pour :

- Générer une correction automatique des exercices soumis.
- Comparer les copies des étudiants avec les réponses correctes pour attribuer une note.
- Fournir un retour détaillé sur les erreurs et suggestions d'améliorations.

La plateforme offre également des fonctionnalités de gestion des utilisateurs, des tableaux de bord interactifs, et une grande attention à l'ergonomie, la sécurité et la scalabilité.

## Fonctionnalités

- **Pour les professeurs :**
  - Création et gestion des comptes.
  - Dépôt de sujets d'examen (formats texte/PDF).
  - Modèles de correction pour chaque exercice.
  - Consultation des notes générées par l'IA.
  - Tableau de bord avec statistiques de performance des étudiants.
  
- **Pour les étudiants :**
  - Création de compte avec authentification via Google, Microsoft ou GitHub.
  - Accès aux sujets déposés par les professeurs.
  - Soumission de réponses au format PDF.
  - Consultation des corrections automatiques et des notes attribuées.
  - Suivi des performances et graphiques d'évolution.

- **Interface Web :**
  - Frontend dynamique et responsive (React.js).
  - Animations, Dark Mode, notifications en temps réel.
  - Tableaux de bord interactifs (Recharts ou Chart.js).

- **Intégration IA ( Ollama) :**
  - Correction automatique des exercices.
  - Analyse syntaxique des requêtes SQL.
  - Notation intelligente prenant en compte différentes approches de réponse.
  - Apprentissage automatique pour affiner les corrections.

## Technologies Utilisées

- **Frontend :** React.js | Tailwind CSS / Material UI
- **Backend :**  Node.js (Express)
- **Base de données :** MySQL
- **IA & NLP :** Ollama
- **Stockage :** AWS S3, Firebase Storage, MinIO
- **Déploiement :** Docker, Kubernetes, AWS, GCP, Azure
- **Sécurité :** OAuth2, chiffrement des fichiers, détection de plagiat

## Installation

### Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine avant de commencer :

- [Node.js](https://nodejs.org/) (pour le frontend)
- [Python 3](https://www.python.org/) (pour le backend)
- [Docker](https://www.docker.com/) (pour la conteneurisation et le déploiement)
- [Git](https://git-scm.com/) (pour la gestion du code source)

### Cloner le dépôt

Clonez ce projet sur votre machine locale en utilisant la commande suivante :

```bash
git clone https://github.com/SSDM2/ESP_DBEval.git
cd plateforme-evaluation

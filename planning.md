## Le planning

### **Semaine 1 : Sprint 1 – Mise en place des bases du projet et gestion des utilisateurs**

#### Objectifs principaux

- Initialisation du projet (création du dépôt, structure de fichiers, configuration des outils de développement, etc.).
- Mise en place du système d’authentification des utilisateurs.
- Création des bases de données pour stocker les informations des utilisateurs (professeurs et étudiants).

#### Tâches

1. **Mise en place de l’environnement de développement** :
   - Configuration du projet avec **React.js** (Frontend) et **Express JS** (Backend).
   - Mise en place du dépôt GitHub/GitLab pour le suivi de version.
   - Configuration du système d’authentification avec OAuth2 pour Google/Microsoft/GitHub.

2. **Création des bases de données** :
   - Conception du modèle de données pour les utilisateurs (professeur, étudiant).
   - Configuration de la base de données **MySQL**.

3. **Gestion des rôles et comptes** :
   - Implémentation de la gestion des comptes : création, modification, et suppression de comptes.
   - Création de la page de connexion et d’inscription pour les étudiants et les professeurs.

#### Livrables

- Code source configuré et versionné.
- Fonctionnalité d’authentification avec gestion des rôles.
- Démo de l’enregistrement et de la connexion des utilisateurs.

---

### **Semaine 2 : Sprint 2 – Dépôt des exercices et soumission des réponses**

#### Objectifs principaux

- Permettre aux professeurs de déposer des sujets d'exercices (en texte ou PDF).
- Permettre aux étudiants de soumettre leurs réponses en format PDF via drag-and-drop.

#### Tâches

1. **Interface pour les professeurs** :
   - Création d'une page permettant aux professeurs de déposer des sujets d'examen en format texte ou PDF.
   - Ajout de la possibilité de gérer plusieurs modèles de correction pour chaque exercice.

2. **Soumission des réponses par les étudiants** :
   - Création d’une interface permettant aux étudiants de soumettre leurs réponses sous forme de fichier PDF avec la fonctionnalité de **drag-and-drop**.
   - Implémentation du stockage des fichiers sur **AWS S3** ou **Firebase Storage**.

3. **Gestion des erreurs et des validations** :
   - Implémentation de la validation côté serveur pour s'assurer que les fichiers soumis sont bien des PDFs.

#### Livrables

- Fonctionnalité de dépôt d'exercices pour les professeurs.
- Interface de soumission de réponses par les étudiants.
- Fonctionnalité de stockage des fichiers PDF.

---

### **Semaine 3 : Sprint 3 – Intégration de l’IA pour la correction automatique et feedback**

#### Objectifs principaux

- Intégrer le moteur d’IA DeepSeek via Ollama pour la correction automatique des exercices.
- Fournir un retour détaillé aux étudiants avec des explications sur leurs erreurs.

#### Tâches

1. **Intégration de l'IA (DeepSeek via Ollama)** :
   - Intégration de l’API Ollama pour la correction automatique des exercices soumis.
   - Développement du processus d’analyse syntaxique des requêtes SQL (si applicable).

2. **Système de notation** :
   - Développement du système de notation intelligent prenant en compte les différentes approches de réponses.

3. **Génération du feedback détaillé** :
   - Implémentation d'un retour automatique détaillant les erreurs, les points d'amélioration et des suggestions de correction.

4. **Tests unitaires** :
   - Effectuer des tests sur les algorithmes de correction et de génération de feedback.

#### Livrables

- Correction automatique fonctionnelle et retour détaillé pour les étudiants.
- Système de notation automatisé.
- Démo de la plateforme avec IA intégrée.

---

### **Semaine 4 : Sprint 4 – Interface utilisateur et tableaux de bord, déploiement**

#### Objectifs principaux

- Développer l'interface utilisateur pour les tableaux de bord et les graphiques de suivi de performance.
- Déploiement de la plateforme en ligne.

#### Tâches

1. **Tableau de bord pour les étudiants** :
   - Création de l’interface pour que les étudiants puissent consulter leurs résultats, visualiser leur progression dans le temps, et comparer leurs notes à la moyenne de la classe.

2. **Tableau de bord pour les professeurs** :
   - Création de l’interface permettant aux professeurs de consulter des statistiques détaillées sur les performances des étudiants : taux de réussite, sujets mal compris, etc.

3. **Graphiques interactifs** :
   - Intégration de **Recharts** ou **Chart.js** pour la visualisation des statistiques et des performances.

4. **Déploiement** :
   - Mise en place du déploiement automatisé via **Docker** et **Kubernetes**.
   - Déploiement sur un service cloud (ex. AWS, Google Cloud, ou Azure).

5. **Tests finaux** :
   - Réaliser des tests de performance, de sécurité et de scalabilité.

#### Livrables

- Tableaux de bord fonctionnels pour les étudiants et les professeurs.
- Plateforme déployée et accessible en ligne.
- Documentation sur l’architecture et le processus de déploiement.

---

### **Suivi et ajustements post-projet**

- À la fin du projet, organiser une rétrospective pour discuter des points à améliorer, des obstacles rencontrés et des ajustements nécessaires pour les prochaines versions.
  
---

### **Résumé des Sprints**

| **Semaine** | **Sprint**                                      | **Objectifs principaux**                                          |
|-------------|-------------------------------------------------|------------------------------------------------------------------|
| Semaine 1   | Sprint 1 : Mise en place des bases et gestion des utilisateurs | Initialisation du projet, authentification et gestion des comptes |
| Semaine 2   | Sprint 2 : Dépôt des exercices et soumission des réponses | Dépôt des sujets par les profs, soumission des réponses par les étudiants |
| Semaine 3   | Sprint 3 : IA pour correction automatique | Intégration de l’IA pour correction et feedback détaillé           |
| Semaine 4   | Sprint 4 : Tableaux de bord et déploiement | Développement des tableaux de bord, déploiement de la plateforme |

---

## Liste des fonctionnalités

Pour la mise en place de la plateforme intelligente d'évaluation automatisée des exercices de bases de données en mode microservices. Chaque microservice doit être indépendant, gérer une tâche spécifique, et communiquer avec les autres services via des API ou des messages.

---

### **1. Gestion des utilisateurs et des rôles**  

**Microservice : User Management Service**

- **Création et gestion des comptes utilisateurs (professeurs et étudiants)**
  - Inscription, modification et suppression des comptes.
  - Gestion des rôles : Professeur, Étudiant, Administrateur.
- **Authentification et autorisation**
  - Authentification via OAuth2 (Google, Microsoft, GitHub).
  - Gestion des sessions utilisateurs (tokens JWT ou sessions).
  - Gestion des permissions et des rôles.
  
---

### **2. Gestion des exercices (Professeurs)**  

**Microservice : Exercise Management Service**

- **Création et gestion des exercices**
  - Téléchargement et gestion des sujets d'examen (format texte/PDF).
  - Création et gestion des modèles de correction pour chaque exercice.
- **Gestion des dates et disponibilités des exercices**
  - Planification des dates de disponibilité des exercices.
  - Attribution des exercices aux étudiants (par classe, par session, etc.).
  
---

### **3. Soumission des réponses (Étudiants)**  

**Microservice : Submission Service**

- **Soumission des réponses par les étudiants**
  - Upload de fichiers PDF (Drag & Drop).
  - Validation des fichiers soumis (format, taille, etc.).
  - Enregistrement et suivi des soumissions.
- **Gestion des versions des réponses**
  - Possibilité pour les étudiants de soumettre plusieurs versions et suivre leur historique.

---

### **4. Correction automatique des exercices (IA)**  

**Microservice : AI Correction Service**

- **Moteur d’IA pour correction automatique**
  - Analyse des réponses soumises par les étudiants via un modèle d'IA (DeepSeek via Ollama).
  - Comparaison de la réponse de l’étudiant avec la correction.
  - Correction des requêtes SQL ou autres exercices en bases de données.
- **Génération de feedback détaillé**
  - Explication des erreurs et suggestions d'amélioration.
- **Apprentissage automatique**
  - Affinage du modèle de correction avec les retours des professeurs.

---

### **5. Attribution des notes et analyse de la performance**  

**Microservice : Grading & Performance Service**

- **Attribution de la note**
  - Calcul de la note finale sur 20, en tenant compte de différentes approches de réponse.
  - Prise en compte de la qualité du code, de la syntaxe SQL, et d'autres critères.
- **Suivi des performances des étudiants**
  - Suivi des progrès des étudiants dans le temps, avec des graphiques d'évolution.
  - Comparaison des résultats d’un étudiant avec la moyenne de la classe.
  - Statistiques de performance : taux de réussite, sujets les plus difficiles, etc.
  
---

### **6. Gestion de la sécurité et des accès**  

**Microservice : Security & Access Management Service**

- **Authentification sécurisée**
  - Gestion de l’authentification OAuth2 (Google, Microsoft, GitHub).
  - Mise en place de l'authentification multi-facteurs (2FA).
- **Chiffrement des fichiers PDF**
  - Chiffrement des fichiers PDF soumis par les étudiants pour garantir la confidentialité.
- **Gestion des permissions et des rôles**
  - Gestion des accès pour chaque utilisateur en fonction de leur rôle (professeur, étudiant).
  
---

### **7. Détection de plagiat**  

**Microservice : Plagiarism Detection Service**

- **Algorithmes de détection de plagiat**
  - Détection de similarités dans les réponses des étudiants via des algorithmes tels que Jaccard, TF-IDF, ou d'autres techniques de NLP.
  - Comparaison des réponses soumises avec une base de données d'exercices précédemment soumis.
  - Génération de rapports de plagiat et alertes aux professeurs.

---

### **8. Tableaux de bord et analyse des performances**  

**Microservice : Dashboard & Analytics Service**

- **Tableau de bord pour les étudiants**
  - Affichage des résultats passés, avec des graphiques d'évolution et des comparaisons.
  - Visualisation des performances en temps réel (via des graphiques générés avec Recharts ou Chart.js).
- **Tableau de bord pour les professeurs**
  - Accès aux statistiques détaillées sur les performances des étudiants : taux de réussite, sujets les plus difficiles, progrès des étudiants.
  - Suggestions d'amélioration des exercices en fonction des performances globales.
  
---

### **9. Notifications en temps réel**  

**Microservice : Notification Service**

- **Notifications pour les étudiants et les professeurs**
  - Envoi de notifications en temps réel pour informer les étudiants de la correction de leurs exercices, de la publication de nouvelles notes, etc.
  - Notification pour les professeurs lors de la soumission des réponses par les étudiants, ainsi que les résultats des tests.
  - Gestion des préférences de notification pour chaque utilisateur.

---

### **10. Gestion des fichiers et du stockage**  

**Microservice : File Management Service**

- **Stockage des fichiers PDF**
  - Enregistrement des fichiers soumis par les étudiants sur un stockage cloud (AWS S3, Firebase Storage, MinIO).
  - Gestion du versionnement des fichiers (si nécessaire).
  - Sécurisation du stockage (chiffrement, gestion des accès).
  
---

### **11. Microservices de déploiement et de scalabilité**  

**Microservice : Deployment & Scalability Service**

- **Séparation des services en microservices** :
  - Chaque fonctionnalité décrite ci-dessus sera un microservice distinct, chacun ayant sa propre base de données ou stockage de données.
  - Communication via des API RESTful ou message queue pour des interactions asynchrones (Kafka, RabbitMQ).
  
- **Mise en place de Docker et Kubernetes** :
  - Conteneurisation des services via Docker pour garantir leur portabilité.
  - Utilisation de Kubernetes pour l'orchestration des microservices et la gestion de la scalabilité.

- **Déploiement sur des infrastructures cloud** :
  - Déploiement de l'ensemble des services via des plateformes comme AWS, Google Cloud ou Azure.

---

### **12. Système de logs et de monitoring**  

**Microservice : Logging & Monitoring Service**

- **Suivi des erreurs et des logs**
  - Utilisation de solutions comme ELK Stack (Elasticsearch, Logstash, Kibana) pour centraliser et analyser les logs des microservices.
  - Mise en place de l’alerting pour les erreurs critiques ou les problèmes de performance.

- **Monitoring des performances**
  - Utilisation de systèmes de monitoring comme Prometheus ou Grafana pour surveiller la santé des microservices (latence, utilisation des ressources, etc.).

---

### **13. Gestion des API et documentation**  

**Microservice : API Gateway & Documentation Service**

- **API Gateway**
  - Mise en place d'un **API Gateway** (par exemple, avec Kong ou API Gateway d'AWS) pour gérer la communication entre les microservices, l'authentification, le routage, etc.
  
- **Documentation des API**
  - Création et gestion de la documentation des API (par exemple, avec Swagger/OpenAPI).

---

### **Résumé des Microservices :**

| **Microservice**                      | **Responsabilité**                                               |
|---------------------------------------|------------------------------------------------------------------|
| **User Management Service**           | Gestion des comptes utilisateurs, authentification, rôles      |
| **Exercise Management Service**       | Création, gestion des exercices, modèles de correction          |
| **Submission Service**                | Soumission des réponses par les étudiants, gestion des fichiers |
| **AI Correction Service**             | Correction automatique des exercices, génération de feedback    |
| **Grading & Performance Service**     | Attribution des notes, suivi des performances                    |
| **Security & Access Management Service** | Authentification sécurisée, chiffrement des fichiers            |
| **Plagiarism Detection Service**      | Détection de plagiat                                            |
| **Dashboard & Analytics Service**     | Tableaux de bord, analyse des performances                      |
| **Notification Service**              | Notifications en temps réel                                      |
| **File Management Service**           | Gestion du stockage des fichiers soumis                         |
| **Deployment & Scalability Service**  | Déploiement des microservices, orchestration avec Kubernetes    |
| **Logging & Monitoring Service**      | Suivi des logs, monitoring des performances des services         |
| **API Gateway & Documentation Service** | Gestion de l'API Gateway, documentation des API                 |

---

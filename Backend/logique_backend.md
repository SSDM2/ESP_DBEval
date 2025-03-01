### **Architecture générale des microservices :**

1. **Service d'authentification (Auth Service)**
2. **Service des utilisateurs (User Service)**
3. **Service des exercices (Exercise Service)**
4. **Service des soumissions (Submission Service)**
5. **Service de correction (Correction Service)**
6. **Service des performances (Performance Service)**
7. **Service de notification (Notification Service)**
8. **Service d'analyse des performances (Analytics Service)**
9. **Service de gestion des rôles et autorisations (Role Service)**
10. **Service de stockage (File Storage Service)**

### **Détail des Microservices :**

---

### **1. Auth Service (Service d'authentification)**

**Responsabilités :**

- Gérer l'authentification des utilisateurs.
- Gérer l'intégration avec Google OAuth2 pour les connexions via Google.
- Émettre des **tokens JWT** pour l'authentification sécurisée de chaque utilisateur.
- Vérifier et valider les informations d'identification (email, mot de passe, Google ID).
- Gérer les mécanismes de session (via refresh tokens).

**Technologies suggérées :**

- **OAuth2** / **JWT** / **Passport.js** / **Google OAuth2** (via `passport-google-oauth20`).

**API principales :**

- **POST** `/auth/login` - Authentification classique (email/mot de passe).
- **POST** `/auth/google` - Authentification via Google.
- **POST** `/auth/refresh-token` - Rafraîchissement du token JWT.
- **GET** `/auth/logout` - Déconnexion.

---

### **2. User Service (Service des utilisateurs)**

**Responsabilités :**

- Gérer les informations des utilisateurs (professeurs, étudiants).
- Gérer les profils des utilisateurs (modification, récupération, suppression).
- Associer les utilisateurs à des rôles (professeur, étudiant).
- Gérer les avatars et informations supplémentaires comme le nom.

**Technologies suggérées :**

- **Node.js** / **Express JS** .
- **Base de données relationnelle** (MySQL).

**API principales :**

- **GET** `/users/{user_id}` - Récupérer le profil utilisateur.
- **PUT** `/users/{user_id}` - Mettre à jour les informations du profil.
- **POST** `/users` - Créer un nouvel utilisateur (via Google ou autre).
- **DELETE** `/users/{user_id}` - Supprimer un utilisateur.

---

### **3. Exercise Service (Service des exercices)**

**Responsabilités :**

- Gérer la création, la mise à jour et la suppression des exercices par les professeurs.
- Gérer le dépôt des exercices (PDF ou fichier texte).
- Fournir la liste des exercices disponibles aux étudiants.

**Technologies suggérées :**

- **Node.js** / **Express JS**.
- **MySQL** pour la gestion des exercices.

**API principales :**

- **POST** `/exercises` - Créer un exercice (professeur).
- **GET** `/exercises/{exercise_id}` - Récupérer un exercice.
- **GET** `/exercises` - Lister les exercices disponibles.
- **PUT** `/exercises/{exercise_id}` - Mettre à jour un exercice.
- **DELETE** `/exercises/{exercise_id}` - Supprimer un exercice.

---

### **4. Submission Service (Service des soumissions)**

**Responsabilités :**

- Gérer les soumissions des étudiants (fichiers PDF).
- Gérer les délais de soumission (si applicable).
- Associer chaque soumission à un exercice spécifique et à un étudiant.

**Technologies suggérées :**

- **Node.js** / **Express.js**.
- **Stockage de fichiers** (par exemple AWS S3, MinIO, ou un système de fichiers distribué).

**API principales :**

- **POST** `/submissions` - Soumettre une réponse (fichier PDF) pour un exercice.
- **GET** `/submissions/{submission_id}` - Récupérer les informations d'une soumission.
- **GET** `/submissions/user/{user_id}` - Récupérer toutes les soumissions d'un utilisateur.
- **DELETE** `/submissions/{submission_id}` - Supprimer une soumission.

---

### **5. Correction Service (Service de correction)**

**Responsabilités :**

- Gérer la correction automatique des soumissions des étudiants en utilisant un moteur d'IA (par exemple DeepSeek via Ollama).
- Fournir un retour détaillé sur les erreurs et suggestions d'amélioration.
- Associer chaque correction à une soumission et une note sur 20.

**Technologies suggérées :**

- **DeepSeek via Ollama** / **Machine Learning API**.
- **Python** pour l'intégration de l'IA.
- **MySQL** pour stocker les corrections.

**API principales :**

- **POST** `/corrections` - Lancer la correction d'une soumission.
- **GET** `/corrections/{correction_id}` - Récupérer une correction spécifique.
- **GET** `/corrections/submission/{submission_id}` - Récupérer la correction d'une soumission spécifique.
- **GET** `/corrections/user/{user_id}` - Récupérer les corrections d'un utilisateur.

---

### **6. Performance Service (Service des performances)**

**Responsabilités :**

- Suivre les performances des étudiants (moyenne des notes, progression).
- Offrir un tableau de bord avec des graphiques sur les performances des étudiants et des professeurs.
- Mettre à jour les statistiques chaque fois qu'une correction est effectuée.

**Technologies suggérées :**

- **Node.js** / **Python** / **Go** pour les calculs de performance.
- **Chart.js** ou **Recharts** pour l'affichage graphique.
- **MySQL** pour la gestion des données.

**API principales :**

- **GET** `/performance/{student_id}` - Récupérer les performances d'un étudiant.
- **GET** `/performance/class/{class_id}` - Récupérer les performances d'une classe.
- **POST** `/performance/update` - Mettre à jour les performances d'un étudiant après une correction.

---

### **7. Notification Service (Service de notification)**

**Responsabilités :**

- Gérer l'envoi de notifications aux étudiants (par exemple, correction disponible, date limite de soumission, etc.).
- Gérer les alertes en temps réel pour les utilisateurs (via WebSockets ou notifications push).

**Technologies suggérées :**

- **Firebase Cloud Messaging** / **Push Notifications**.
- **Socket.io** pour les notifications en temps réel.

**API principales :**

- **POST** `/notifications/send` - Envoyer une notification à un utilisateur ou groupe d'utilisateurs.
- **GET** `/notifications/{user_id}` - Récupérer les notifications non lues d'un utilisateur.

---

### **8. Analytics Service (Service d'analyse des performances)**

**Responsabilités :**

- Analyser les performances globales des étudiants pour détecter les tendances.
- Offrir des rapports statistiques détaillés pour les enseignants.
- Fournir des analyses sur les erreurs les plus communes dans les exercices.

**Technologies suggérées :**

- **Apache Kafka** pour la collecte de données en temps réel.
- **Python** pour l'analyse des données.
- **ElasticSearch** pour les recherches analytiques.

**API principales :**

- **GET** `/analytics/class/{class_id}` - Analyser les performances globales de la classe.
- **GET** `/analytics/exercise/{exercise_id}` - Analyser les tendances des erreurs pour un exercice spécifique.

---

### **9. Role Service (Service de gestion des rôles et autorisations)**

**Responsabilités :**

- Gérer les rôles des utilisateurs (professeur, étudiant, admin) et leurs autorisations.
- Vérifier les autorisations d'accès à certaines ressources (par exemple, accès aux exercices ou aux corrections).

**Technologies suggérées :**

- **RBAC (Role-Based Access Control)**.
- **Node.js** ou .

**API principales :**

- **GET** `/roles/{role_id}` - Récupérer les informations sur un rôle.
- **POST** `/roles` - Créer un nouveau rôle.
- **PUT** `/roles/{role_id}` - Mettre à jour un rôle.
- **DELETE** `/roles/{role_id}` - Supprimer un rôle.

---

### **10. File Storage Service (Service de stockage des fichiers)**

**Responsabilités :**

- Gérer le stockage des fichiers PDF soumis par les étudiants et des exercices.
- Gérer le stockage des fichiers de correction générés par l'IA.

**Technologies suggérées :**

- **AWS S3** / **MinIO** / **Google Cloud Storage**.
- **File System** pour le stockage local si nécessaire.

**API principales :**

- **POST** `/files/upload` - Télécharger un fichier (soumission ou exercice).
- **GET** `/files/{file_id}` - Récupérer un fichier stocké.
- **DELETE** `/files/{file_id}` - Supprimer un fichier.

---

### **Découpage du frontend adapte au microservices :**

1. **Service de gestion de l'authentification et de l'utilisateur (Auth & User Service)**
2. **Service des exercices (Exercise Service)**
3. **Service des soumissions (Submission Service)**
4. **Service de correction (Correction Service)**
5. **Service des performances (Performance Service)**
6. **Service des notifications (Notification Service)**
7. **Service d'analyse (Analytics Service)**
8. **Service de gestion des rôles et des autorisations (Role Service)**
9. **Service de tableau de bord (Dashboard Service)**
10. **Service de gestion des fichiers (File Management Service)**

### **Détail des Microservices Frontend :**

---

### **1. Auth & User Service (Service de gestion de l'authentification et des utilisateurs)**

**Responsabilités :**
- Gérer les interfaces de connexion, d'inscription et de gestion des comptes utilisateur.
- Permettre la connexion via Google OAuth2.
- Gérer la création, la mise à jour et la suppression des utilisateurs.
- Stocker et afficher les informations de profil utilisateur (avatar, nom, email).

**Technologies suggérées :**
- **React.js** ou **Vue.js** pour la gestion des composants frontend.
- **React Router** pour la gestion des routes.
- **Redux** ou **Context API** pour la gestion de l'état global de l'authentification.

**Pages / Composants principaux :**
- **Page de connexion** (Login).
- **Page d'inscription** (Register).
- **Page de gestion de profil utilisateur** (Profile).
- **Composant de gestion de session** (Session management).

**Interactions avec le backend :**
- Appels API pour l'authentification via Google.
- Appels API pour récupérer ou mettre à jour les informations de l'utilisateur.

---

### **2. Exercise Service (Service des exercices)**

**Responsabilités :**
- Gérer l'affichage des exercices disponibles pour les étudiants.
- Permettre aux professeurs de créer et de mettre à jour les exercices.
- Afficher les détails d'un exercice sélectionné.

**Technologies suggérées :**
- **React.js** / **Vue.js** avec **Material UI** ou **Tailwind CSS** pour l'interface.
- **Axios** pour les appels API au backend.

**Pages / Composants principaux :**
- **Liste des exercices** (Exercise List).
- **Page de détail d'un exercice** (Exercise Detail).
- **Formulaire de création/édition d'exercice** (Exercise Form).

**Interactions avec le backend :**
- Appels API pour récupérer, créer, modifier et supprimer des exercices.

---

### **3. Submission Service (Service des soumissions)**

**Responsabilités :**
- Gérer l'interface pour soumettre les réponses des étudiants (fichiers PDF).
- Permettre aux étudiants de télécharger et de soumettre des réponses via un système de **Drag & Drop** ou via un formulaire.
- Afficher la confirmation de la soumission réussie.

**Technologies suggérées :**
- **React Dropzone** ou **Vue Draggable** pour l'upload de fichiers.
- **Axios** pour les appels API pour la soumission des fichiers.

**Pages / Composants principaux :**
- **Page de soumission d'exercice** (Submit Exercise).
- **Composant d'upload de fichier** (File Upload).
- **Page de confirmation de soumission** (Submission Confirmation).

**Interactions avec le backend :**
- Appels API pour soumettre les fichiers et les associer aux exercices.

---

### **4. Correction Service (Service de correction)**

**Responsabilités :**
- Gérer l'affichage des corrections automatiques générées par le backend (notes, erreurs, feedback).
- Afficher des retours détaillés sur les erreurs et pistes d'amélioration pour les étudiants.
- Permettre aux professeurs de consulter et ajuster les corrections générées par l'IA.

**Technologies suggérées :**
- **React.js** ou **Vue.js** avec **Recharts** ou **Chart.js** pour afficher les graphiques et les notes.
- **Tailwind CSS** pour la mise en page et le style.

**Pages / Composants principaux :**
- **Page de correction d'exercice** (Exercise Correction).
- **Page de feedback détaillé** (Detailed Feedback).
- **Tableau de bord des corrections pour les professeurs** (Teacher Dashboard).

**Interactions avec le backend :**
- Appels API pour récupérer la correction d'une soumission d'exercice.
- Possibilité de modifier les corrections ou de générer un nouveau feedback.

---

### **5. Performance Service (Service des performances)**

**Responsabilités :**
- Gérer l'affichage des statistiques de performance des étudiants : progression, notes moyennes, classement.
- Permettre aux étudiants de suivre leur performance au fil du temps via des graphiques.

**Technologies suggérées :**
- **React.js** / **Vue.js** avec **Recharts** ou **Chart.js** pour les graphiques.
- **Axios** pour les appels API aux services backend d'analyse de performance.

**Pages / Composants principaux :**
- **Page des performances** (Performance Page).
- **Graphiques d’évolution des notes** (Performance Graphs).

**Interactions avec le backend :**
- Appels API pour récupérer les statistiques de performance de l'utilisateur.

---

### **6. Notification Service (Service des notifications)**

**Responsabilités :**
- Gérer les notifications en temps réel pour les étudiants et les professeurs.
- Fournir des alertes concernant les échéances de soumission, les corrections disponibles, les mises à jour, etc.

**Technologies suggérées :**
- **Socket.io** pour les notifications en temps réel.
- **React Toastify** ou **Vue Notifications** pour les notifications côté frontend.

**Pages / Composants principaux :**
- **Composant de notification** (Notification Component).
- **Page des notifications** (Notifications Page).

**Interactions avec le backend :**
- Écoute des événements en temps réel pour recevoir les notifications push via WebSockets.

---

### **7. Analytics Service (Service d'analyse des données)**

**Responsabilités :**
- Afficher des graphiques et des rapports analytiques pour les enseignants sur la performance des étudiants.
- Analyser les résultats des exercices, la compréhension des questions, et les tendances générales des élèves.

**Technologies suggérées :**
- **React.js** ou **Vue.js** avec **Recharts** ou **Chart.js**.
- **Axios** pour les appels API aux services backend d'analyse de données.

**Pages / Composants principaux :**
- **Page d'analyse des résultats** (Results Analysis).
- **Graphiques des tendances d'apprentissage** (Learning Trends).

**Interactions avec le backend :**
- Appels API pour récupérer les données analytiques des étudiants.

---

### **8. Role Service (Service des rôles et autorisations)**

**Responsabilités :**
- Gérer les pages et fonctionnalités accessibles en fonction du rôle de l'utilisateur (étudiant, professeur, administrateur).
- Assurer la gestion des rôles au niveau de l'interface utilisateur pour afficher ou masquer certains éléments de la plateforme.

**Technologies suggérées :**
- **React.js** / **Vue.js** avec **React Context** ou **Vuex** pour la gestion de l'état du rôle de l'utilisateur.
- **React Router** pour la gestion des routes en fonction des autorisations.

**Pages / Composants principaux :**
- **Page d'administration des rôles** (Admin Roles Page).
- **Composants de contrôle d'accès** (Access Control Components).

**Interactions avec le backend :**
- Appels API pour récupérer et définir les rôles d'utilisateur.

---

### **9. Dashboard Service (Service de tableau de bord)**

**Responsabilités :**
- Fournir un tableau de bord global pour les utilisateurs : affichage des soumissions, corrections, notifications, et performances.
- Permettre aux professeurs de voir les statistiques de leurs classes et aux étudiants de suivre leur progression.

**Technologies suggérées :**
- **React.js** / **Vue.js**.
- **Tailwind CSS** ou **Material UI** pour la mise en page et le style.

**Pages / Composants principaux :**
- **Tableau de bord étudiant** (Student Dashboard).
- **Tableau de bord professeur** (Teacher Dashboard).
- **Composant de résumé** pour les statistiques clés (Summary Component).

**Interactions avec le backend :**
- Appels API pour récupérer les données du tableau de bord (soumissions, corrections, performances).

---

### **10. File Management Service (Service de gestion des fichiers)**

**Responsabilités :**
- Permettre aux utilisateurs de gérer leurs fichiers (soumettre, télécharger, voir l'état de leurs fichiers).
- Gérer le stockage local ou sur le cloud des fichiers PDF soumis par les étudiants.

**Technologies suggérées :**
- **React Dropzone** ou **Vue Draggable** pour le téléchargement de fichiers.
- **AWS S3** ou **MinIO** pour le stockage des fichiers.

**Pages / Composants principaux :**
- **Composant de téléchargement de fichier** (File Upload Component).
- **Page de gestion des fichiers** (File Management Page).

**Interactions avec le backend :**
- Appels API pour télécharger et récupérer les fichiers soumis.

---

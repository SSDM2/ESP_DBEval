Voici le schéma global mis à jour en tenant compte de l'intégration OCR pour l'extraction du texte, ainsi que des ajouts pour la gestion des corrections et des suggestions de cours :

---

### **1. Table `users`** (pour gérer les comptes utilisateurs)
Cette table gère les informations des utilisateurs, qu'il s'agisse de professeurs, étudiants ou autres rôles.

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,               -- Identifiant unique de l'utilisateur
    username VARCHAR(100) NOT NULL,           -- Nom d'utilisateur unique
    email VARCHAR(255) UNIQUE NOT NULL,       -- Email unique de l'utilisateur
    password_hash VARCHAR(255),               -- Mot de passe haché (peut être nul si Google auth)
    google_id VARCHAR(255) UNIQUE,            -- Identifiant unique de l'utilisateur Google
    google_token VARCHAR(255),                -- Jeton d'accès Google (si nécessaire)
    role VARCHAR(50) NOT NULL,                -- Rôle de l'utilisateur (professeur, étudiant)
    created_at TIMESTAMP DEFAULT NOW(),       -- Date de création du compte
    updated_at TIMESTAMP DEFAULT NOW(),       -- Date de la dernière mise à jour
    last_login TIMESTAMP,                     -- Dernière connexion de l'utilisateur
    status VARCHAR(50) DEFAULT 'active'       -- Statut de l'utilisateur (actif, suspendu)
);
```

---

### **2. Table `exercises`** (pour gérer les exercices soumis par les professeurs)

Cette table stocke les exercices créés par les professeurs.

```sql
CREATE TABLE exercises (
    exercise_id SERIAL PRIMARY KEY,           -- Identifiant unique de l'exercice
    title VARCHAR(255) NOT NULL,               -- Titre de l'exercice
    description TEXT NOT NULL,                 -- Description ou consigne de l'exercice
    file_url VARCHAR(255),                     -- URL du fichier d'exercice (si applicable)
    correction_file_url VARCHAR(255),          -- URL du fichier de correction (après traitement OCR)
    created_by INT REFERENCES users(user_id), -- Professeur qui a créé l'exercice
    created_at TIMESTAMP DEFAULT NOW(),       -- Date de création de l'exercice
    updated_at TIMESTAMP DEFAULT NOW(),       -- Date de la dernière mise à jour
    correction_available BOOLEAN DEFAULT FALSE, -- Si la correction est disponible
    ocr_extracted_text TEXT,                  -- Texte extrait par OCR avant correction
    ocr_processed BOOLEAN DEFAULT FALSE       -- Si l'OCR a été traité
);
```

---

### **3. Table `submissions`** (pour gérer les soumissions des étudiants)

Les étudiants soumettent leurs fichiers d'exercices. Cette table garde une trace de ces soumissions.

```sql
CREATE TABLE submissions (
    submission_id SERIAL PRIMARY KEY,          -- Identifiant unique de la soumission
    student_id INT REFERENCES users(user_id), -- Étudiant qui a soumis la réponse
    exercise_id INT REFERENCES exercises(exercise_id), -- L'exercice associé
    file_url VARCHAR(255) NOT NULL,            -- URL du fichier PDF soumis
    submitted_at TIMESTAMP DEFAULT NOW(),      -- Date de soumission
    grade DECIMAL(5,2),                        -- Note attribuée par l'IA
    feedback TEXT,                             -- Feedback généré par l'IA
    missing_elements TEXT[],                  -- Manquements détectés dans la soumission
    suggestions TEXT[],                        -- Suggestions de cours basées sur les manquements
    ai_corrected BOOLEAN DEFAULT FALSE,        -- Si l'exercice a été corrigé par l'IA
    corrected_at TIMESTAMP,                    -- Date de correction par l'IA
    ocr_text TEXT,                             -- Texte extrait de l'image par OCR avant correction
    ocr_processed BOOLEAN DEFAULT FALSE        -- Si l'OCR a été traité
);
```

---

### **4. Table `corrections`** (pour enregistrer les corrections et la comparaison)

Cette table contient les informations détaillées sur la correction générée par l'IA pour chaque soumission.

```sql
CREATE TABLE corrections (
    correction_id SERIAL PRIMARY KEY,            -- Identifiant unique de la correction
    submission_id INT REFERENCES submissions(submission_id), -- ID de la soumission associée
    ai_feedback TEXT,                             -- Feedback détaillé sur les erreurs
    score DECIMAL(5,2),                           -- Score final attribué à l'exercice
    errors_detected TEXT[],                       -- Liste des erreurs détectées dans la soumission
    recommendations TEXT[],                       -- Liste des recommandations pour l'étudiant
    created_at TIMESTAMP DEFAULT NOW(),          -- Date de création de la correction
    updated_at TIMESTAMP DEFAULT NOW()           -- Date de la dernière mise à jour
);
```

---

### **5. Table `performances`** (pour stocker les statistiques de performance des étudiants)

Cette table stocke les performances globales des étudiants, y compris leurs notes et tendances.

```sql
CREATE TABLE performances (
    performance_id SERIAL PRIMARY KEY,         -- Identifiant unique de la performance
    student_id INT REFERENCES users(user_id), -- Étudiant concerné
    total_submissions INT DEFAULT 0,           -- Nombre total de soumissions
    average_grade DECIMAL(5,2) DEFAULT 0,      -- Moyenne des notes obtenues
    last_submission_date TIMESTAMP,            -- Dernière soumission effectuée
    grade_history TEXT[],                      -- Historique des notes (JSON ou tableau de notes)
    progress_score DECIMAL(5,2),               -- Score de progression des compétences
    created_at TIMESTAMP DEFAULT NOW(),        -- Date de création de la performance
    updated_at TIMESTAMP DEFAULT NOW()         -- Date de mise à jour de la performance
);
```

---

### **6. Table `roles`** (pour mieux gérer les rôles des utilisateurs, si nécessaire)

Cette table vous permet de mieux gérer les rôles et permissions des utilisateurs.

```sql
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,      -- Identifiant unique du rôle
    role_name VARCHAR(50) UNIQUE,    -- Nom du rôle (professeur, étudiant)
    permissions TEXT[]               -- Liste des permissions associées au rôle
);
```

---

### **7. Table `audit_logs`** (pour gérer les journaux d'audit)

Cette table garde une trace de toute modification importante dans le système (création, modification, suppression).

```sql
CREATE TABLE audit_logs (
    log_id SERIAL PRIMARY KEY,                -- Identifiant unique du log
    user_id INT REFERENCES users(user_id),    -- Utilisateur qui a effectué l'action
    action_type VARCHAR(100),                  -- Type d'action (création, modification, suppression)
    action_details TEXT,                       -- Détails de l'action effectuée
    action_timestamp TIMESTAMP DEFAULT NOW()   -- Date et heure de l'action
);
```

---

### **Relations entre les tables :**

- **`users`** : La table des utilisateurs contient tous les utilisateurs du système (professeurs, étudiants, etc.). Chaque utilisateur a un rôle qui est géré dans la table `roles`.
- **`exercises`** : Les exercices sont créés par les professeurs et sont associés à un **`user_id`** (professeur). Ils contiennent des informations sur le texte extrait par l'OCR et l'état du traitement OCR.
- **`submissions`** : Les étudiants soumettent des fichiers PDF pour un exercice donné. Chaque soumission est associée à un étudiant et un exercice.
- **`corrections`** : Les corrections sont effectuées par l'IA et contiennent des informations sur le feedback, le score et les erreurs détectées dans les soumissions.
- **`performances`** : Cette table enregistre les statistiques de performance des étudiants, telles que la moyenne des notes et l'historique de leurs soumissions.

---

### **Flux de travail avec la base de données :**

1. **Création d'un exercice** : Le professeur crée un exercice via l'interface, et l'exercice est stocké dans la table `exercises`. Le texte OCR peut être extrait et stocké.
2. **Soumission de l'étudiant** : L'étudiant soumet son fichier PDF. La soumission est enregistrée dans la table `submissions`.
3. **Extraction de texte via OCR** : Avant de passer la soumission à l'IA pour correction, le texte est extrait du fichier via OCR et stocké dans le champ `ocr_text`.
4. **Correction par l'IA** : Le texte extrait est envoyé à l'IA pour la correction, les manquements sont détectés, et des suggestions sont ajoutées. Ces informations sont stockées dans la table `submissions` et `corrections`.
5. **Mise à jour de la performance** : Les performances de l'étudiant sont mises à jour dans la table `performances` après chaque soumission et correction.

---

### **Ajout de l'OCR dans le flux** :

- L'OCR extrait le texte des soumissions, le stocke dans la base de données et le transmet à l'IA pour la correction.
- Une fois la correction terminée, le texte corrigé est sauvegardé avec le feedback et les suggestions.

---

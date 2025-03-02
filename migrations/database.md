**structure des tables** pour la base de données :

### 1. **Table `users`** (pour gérer les comptes utilisateurs)

Cette table gère les informations des utilisateurs (professeurs et étudiants).

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,           -- Identifiant unique de l'utilisateur
    username VARCHAR(100) NOT NULL,       -- Nom d'utilisateur unique
    email VARCHAR(255) UNIQUE NOT NULL,   -- Email unique de l'utilisateur
    password_hash VARCHAR(255) NOT NULL,  -- Mot de passe haché
    role VARCHAR(50) NOT NULL,            -- Rôle de l'utilisateur (professeur, étudiant)
    created_at TIMESTAMP DEFAULT NOW(),   -- Date de création du compte
    updated_at TIMESTAMP DEFAULT NOW()    -- Date de la dernière mise à jour
);
```

### 2. **Table `exercises`** (pour gérer les exercices soumis par les professeurs)

Cette table stocke les exercices (questions, consignes, etc.) créés par les professeurs.

```sql
CREATE TABLE exercises (
    exercise_id SERIAL PRIMARY KEY,           -- Identifiant unique de l'exercice
    title VARCHAR(255) NOT NULL,               -- Titre de l'exercice
    description TEXT NOT NULL,                 -- Description ou consigne de l'exercice
    file_url VARCHAR(255),                     -- URL du fichier d'exercice (si applicable)
    created_by INT REFERENCES users(user_id), -- Professeur qui a créé l'exercice
    created_at TIMESTAMP DEFAULT NOW(),       -- Date de création de l'exercice
    updated_at TIMESTAMP DEFAULT NOW()        -- Date de la dernière mise à jour
);
```

### 3. **Table `submissions`** (pour gérer les soumissions des étudiants)

Cette table garde trace des soumissions des étudiants, avec les fichiers PDF soumis.

```sql
CREATE TABLE submissions (
    submission_id SERIAL PRIMARY KEY,          -- Identifiant unique de la soumission
    student_id INT REFERENCES users(user_id), -- Étudiant qui a soumis la réponse
    exercise_id INT REFERENCES exercises(exercise_id), -- L'exercice associé
    file_url VARCHAR(255) NOT NULL,            -- URL du fichier PDF soumis
    submitted_at TIMESTAMP DEFAULT NOW(),      -- Date de soumission
    grade DECIMAL(5,2),                        -- Note attribuée par l'IA
    feedback TEXT,                             -- Feedback généré par l'IA
    ai_corrected BOOLEAN DEFAULT FALSE,        -- Si l'exercice a été corrigé par l'IA
    corrected_at TIMESTAMP                     -- Date de correction par l'IA
);
```

### 4. **Table `corrections`** (pour enregistrer les corrections et la comparaison)

Cette table contient des informations détaillées sur la correction générée par l'IA pour chaque soumission.

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

### 5. **Table `performances`** (pour stocker les statistiques de performance des étudiants)

Cette table stocke les performances globales des étudiants (notes, tendances, etc.).

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

### 6. **Table `roles`** (pour mieux gérer les rôles des utilisateurs, si nécessaire)

Si vous souhaitez gérer les rôles de manière plus détaillée, vous pouvez créer une table `roles`. Cette table vous permet de gérer les droits d'accès et la hiérarchie des utilisateurs.

```sql
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,      -- Identifiant unique du rôle
    role_name VARCHAR(50) UNIQUE,    -- Nom du rôle (professeur, étudiant)
    permissions TEXT[]               -- Liste des permissions associées au rôle
);
```

### 7. **Table `audit_logs`** (pour gérer les journaux d'audit)

Cette table peut être utile pour garder une trace de toute modification importante (par exemple, modifications des exercices, soumissions, corrections, etc.).

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

- **`users`** : Les utilisateurs (professeurs et étudiants) sont gérés dans cette table. Chaque utilisateur peut avoir un rôle, comme professeur ou étudiant.
- **`exercises`** : Les exercices sont créés par les professeurs et sont associés à un **`user_id`** (professeur).
- **`submissions`** : Les étudiants soumettent des fichiers PDF pour un exercice donné. Chaque soumission est associée à un étudiant et un exercice.
- **`corrections`** : Chaque soumission est corrigée par l'IA, et la correction génère un **feedback** et une **note**.
- **`performances`** : Cette table enregistre les statistiques de performance des étudiants, telles que la moyenne des notes et l'historique de leurs soumissions.

---

### **Exemple de flux de travail avec la base de données :**

1. **Création d'un exercice** : Le professeur crée un exercice via l'interface, et l'exercice est stocké dans la table `exercises`.
2. **Soumission de l'étudiant** : L'étudiant soumet son fichier PDF pour l'exercice. Cette soumission est enregistrée dans la table `submissions`.
3. **Correction automatique** : L'IA génère une correction basée sur la soumission et les exercices définis. Les informations sont enregistrées dans la table `corrections`.
4. **Suivi de la performance** : Les performances des étudiants sont suivies dans la table `performances`, et les statistiques sont mises à jour à chaque nouvelle soumission ou correction.

---

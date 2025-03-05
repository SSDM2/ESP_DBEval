# Diagramme UML - Plateforme de notation

## Introduction

Ce document présente le **diagramme de classe UML** de la plateforme intelligente d'évaluation automatisée des exercices de bases de données.
L'objectif est de **modéliser les entités et leurs interactions** dans le cadre du projet.

## Diagramme de classe

Voici le **diagramme de classe UML** du projet :

![Diagramme UML](diagramme-classe-plateforme-notation.png)

## Explication des classes et relations

## 1. Utilisateurs

| Classe        | Description                                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| `Utilisateur` | Classe de base représentant un utilisateur de la plateforme (professeur ou étudiant).                                 |
| `Professeur`  | Hérite de `Utilisateur`, peut créer des comptes, publier des sujets, ajuster les notes et consulter les statistiques. |
| `Étudiant`    | Hérite de `Utilisateur`, peut soumettre des réponses, consulter ses corrections et suivre sa performance.             |
| `Classe`      | Groupe d'étudiants permettant une meilleure gestion des sujets et statistiques.                                       |

### Relations

- Un **professeur** peut gérer plusieurs **classes** `(1:N)`.
- Un **étudiant** appartient à une seule **classe** `(N:1)`.

---

## 2. Gestion des Sujets et Réponses

| Classe             | Description                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| `Sujet`            | Contient les exercices publiés par les professeurs. Peut être attribué à une ou plusieurs classes.  |
| `AttributionSujet` | Table d’association entre `Sujet` et `Classe`, permettant d’attribuer un sujet à plusieurs classes. |
| `Correction`       | Stocke la correction automatique générée par l'IA, avec une note maximale possible.                 |
| `Réponse`          | Soumission d'un étudiant sous forme de fichier PDF associée à un `Sujet`.                           |

### Relations

- Un **professeur** publie plusieurs **sujets** `(1:N)`.
- Un **sujet** est attribué à une ou plusieurs **classes** via `AttributionSujet` `(N:M)`.
- Une **réponse** est associée à un seul **sujet** `(N:1)`.
- Une **réponse** appartient à un seul **étudiant** `(N:1)`.

---

## 3. Évaluation et IA

| Classe          | Description                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `IA_Correction` | IA qui génère la correction automatique et assigne une note initiale.                                                   |
| `Évaluation`    | Résultat d'une réponse corrigée, contenant la note finale, les commentaires IA et l’ajustement potentiel du professeur. |

### Relations

- Une **réponse** est analysée par l’**IA_Correction** `(1:1)`.
- L’**IA_Correction** attribue une note initiale à l’**Évaluation** `(1:1)`.
- Un **professeur** peut ajuster la note d’une **Évaluation** `(1:N)`.
- Un **étudiant** peut consulter ses **Évaluations** `(1:N)`.

---

## 4. Statistiques et Suivi des Performances

| Classe               | Description                                                                       |
| -------------------- | --------------------------------------------------------------------------------- |
| `Statistique_Élève`  | Stocke l’évolution des notes d’un étudiant avec comparaison à sa classe.          |
| `Statistique_Classe` | Analyse les performances globales d’une classe (moyenne, distribution des notes). |

### Relations

- Une **Statistique_Élève** est liée à un seul **étudiant** `(1:1)`.
- Une **Statistique_Classe** est liée à une seule **classe** `(1:1)`.
- Un **professeur** consulte les **statistiques des élèves et des classes** `(1:N)`.

---

## 5. Sécurité et Authentification

| Classe             | Description                                                           |
| ------------------ | --------------------------------------------------------------------- |
| `Authentification` | Permet l’accès via mot de passe ou OAuth (Google, Microsoft, GitHub). |
| `Sécurité`         | Vérifie le plagiat et applique des pénalités en cas de triche.        |

### Relations

- Une **réponse** est vérifiée par le module **Sécurité** `(1:1)`.
- Un **utilisateur** passe par l’**Authentification** pour accéder à la plateforme `(1:1)`.

---

## Résumé du Diagramme UML

```markdown
Utilisateur (id, nom, email, motDePasse, role)
├── Professeur (publierSujet(), ajusterNote(), consulterStatistiques())
├── Étudiant (soumettreRéponse(), consulterCorrection(), suivrePerformance())
└── Classe (nom, annee)

Sujet (id, titre, description, fichierPDF, datePublication, typeSujet)
├── Correction (id, detailsCorrection, noteMaximale, genererCorrectionAutomatique())
└── AttributionSujet (sujet_id, classe_id)

Réponse (id, étudiant_id, sujet_id, fichierPDF, dateSoumission)
├── IA_Correction (id, analyserReponse(), genererCorrection(), attribuerNoteInitiale())
└── Évaluation (id, réponse_id, noteAttribuée, noteInitialeIA, commentaireIA, dateEvaluation)

Statistique_Élève (étudiant_id, moyenne, notes[], comparaisonMoyenneClasse, comparaisonMaxClasse)
Statistique_Classe (classe_id, moyenne, distributionNotes[])

Authentification (identifier(), authentifierOAuth())
Sécurité (appliquerPenalite(), verifierPlagiat())
```

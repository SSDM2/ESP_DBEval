### **Principes de design épuré :**

1. **Minimalisme** : Limitez le nombre de couleurs, d'éléments et de textes affichés à l'écran. Ne montrez que ce qui est nécessaire pour l'interaction de l'utilisateur.
2. **Blancs espacés** : Utilisez l'espace blanc pour améliorer la lisibilité et créer une sensation de calme. L'espace autour des éléments et des blocs est aussi important que l'élément lui-même.
3. **Typographie claire** : Choisissez une police simple, lisible et moderne. Utilisez des tailles de texte variées pour établir une hiérarchie d'information (titres, sous-titres, texte normal).
4. **Palette de couleurs neutres avec des accents** : Optez pour des couleurs sobres comme le blanc, le gris, et le bleu clair, puis utilisez des couleurs vives pour attirer l'attention sur les éléments importants (boutons d’action, liens).
5. **Cartes et ombres douces** : Utilisez des cartes pour les éléments d'interface (comme les exercices ou les résultats) et des ombres légères pour les distinguer sans ajouter de complexité.

### **Exemple de design épuré pour la plateforme**

---

#### **Page d'accueil**

- **Header (en-tête)** :
  - Logo minimaliste à gauche.
  - Boutons de connexion/disconnexion en haut à droite, avec une icône simple (connexion via Google, Microsoft, ou GitHub).
  - Un fond blanc ou très léger pour ne pas perturber l’attention de l’utilisateur.
  
- **Bannière centrale** :
  - Un message principal court et percutant qui explique le but de la plateforme, comme : "Évaluation automatique des exercices de bases de données".
  - Utilisation d’une grande image ou illustration épurée en fond (par exemple, une simple illustration d'un cerveau ou une base de données stylisée) pour renforcer l'identité du projet.
  - Un bouton d'appel à l'action visible, comme "Commencer maintenant" ou "Explorer les exercices", avec une couleur vive (bleu clair, vert).

- **Sections secondaires** :
  - **Carrousel d’illustrations** (ou une simple grille) expliquant les fonctionnalités principales de la plateforme (soumettre des exercices, obtenir des corrections automatiques, suivre ses performances).
  - Des **icônes simples** pour chaque fonctionnalité (par exemple, une icône d'un fichier pour "Soumettre un exercice", une icône de "graphique" pour "Suivi des performances", etc.).

---

#### **Page d'exercices**

- **Liste des exercices** :
  - Utilisez un design de **carte** pour chaque exercice, avec un titre simple, une brève description et un bouton d'action visible ("Voir plus" ou "Soumettre").
  - Les cartes doivent avoir une **ombre douce** et des bords arrondis, pour ajouter de la profondeur sans surcharge visuelle.
  - L'alignement des éléments doit être **centré** pour garantir l'équilibre visuel.

- **Filtre et tri** :
  - Des **icônes minimalistes** pour trier et filtrer les exercices (ex. : une icône de filtre, une icône de recherche en haut de la liste).

---

#### **Page de soumission d'exercice**

- **Formulaire de soumission** :
  - Un **espace blanc** important autour du formulaire.
  - Un **champ Drag-and-Drop** pour la soumission du fichier PDF, avec une icône simple de téléchargement ou une ligne pointillée.
  - **Instructions claires** mais minimales à côté du champ de soumission ("Glissez-déposez votre fichier PDF ici").
  - Un **bouton d'action clair** ("Soumettre"), avec un contraste marqué, sans trop de décoration.

---

#### **Page de correction et feedback**

- **Section de correction** :
  - **Feedback détaillé** sur le côté gauche de la page, sous forme de texte, avec une hiérarchie claire : erreurs, explications et suggestions d'amélioration.
  - **Graphiques interactifs** (utilisez Recharts ou Chart.js) à droite, affichant des données de performance de manière visuelle et épurée : une simple courbe de progression, un histogramme comparant les notes de l'étudiant à la moyenne, etc.
  - Les éléments doivent être espacés pour éviter la surcharge cognitive.

---

#### **Page de tableau de bord**

- **Vue globale de l’étudiant ou du professeur** :
  - **Graphiques propres** et **listes claires** qui montrent les performances des étudiants/professeurs.
  - Utilisez des **cartes avec des ombres légères** pour chaque section du tableau de bord (ex. : performance générale, soumissions récentes, etc.).
  - Les données statistiques doivent être visibles mais pas envahissantes, avec des **graphismes simples** et bien espacés.

---

#### **Palette de couleurs**

1. **Fond principal** : Blanc ou gris très clair (#F7F7F7).
2. **Couleurs d’accent** : Bleu clair (#4A90E2) pour les actions principales, vert menthe pour des succès ou bonnes performances (#7ED321), rouge doux pour les erreurs ou avertissements (#D0021B).
3. **Couleurs secondaires** : Gris clair (#E0E0E0) pour les lignes de séparation ou éléments secondaires.
4. **Typographie** : Une police sans-serif moderne et claire (par exemple, **Inter** ou **Roboto**), avec des tailles différentes pour créer une hiérarchie visuelle (titres, sous-titres, texte principal).

---

#### **Composants spécifiques à garder en tête :**

1. **Boutons d’action** :
   - Un **seul type de bouton** avec un fond coloré et des bords arrondis.
   - Évitez les effets d’ombre trop prononcés ou des boutons de taille variée.
   - Boutons principaux (ex. : Soumettre, Se connecter) avec un accent coloré, les autres boutons en **gris clair** ou **blanc** avec une bordure subtile.

2. **Navigation** :
   - **Barre de navigation fixée en haut**, simple et épurée : un logo à gauche, un menu clair avec des liens vers les pages principales de la plateforme (Exercices, Soumissions, Correction, Tableau de bord).
   - Lors de la connexion, des **icônes simples** ou un petit avatar de profil à droite.

3. **Animations** :
   - Des animations **légères** pour les interactions avec les boutons ou le survol d’un élément, mais rien de trop distrayant.
   - **Transitions douces** entre les pages, pour rendre l’expérience plus agréable.

---

### **Exemples d'outils et librairies pour réaliser ce design épuré :**
- **React.js** ou **Vue.js** pour la structure du frontend.
- **Tailwind CSS** pour un design rapide, réactif et minimaliste.
- **Material UI** ou **Ant Design** pour les composants de base (si vous souhaitez utiliser une bibliothèque UI).
- **Recharts** ou **Chart.js** pour l'affichage des graphiques de performance.


git config --global user.name "serignemodouthiam"
git config --global user.email "serignemodouthiam2@gmail.com"

Voici la version révisée de la **charte graphique** en utilisant **Tailwind CSS**, **Roboto** pour les polices, et **FontAwesome** pour les icônes.

---

## Charte Graphique de la Plateforme d'Évaluation Automatisée

### Objectif
L'objectif est de définir une identité visuelle cohérente pour la plateforme, qui soit moderne, facile à utiliser et esthétiquement agréable, tout en utilisant des outils standards comme **Tailwind CSS**, **Google Fonts** et **FontAwesome** pour garantir l'accessibilité, la performance et la flexibilité.

---

## 1. **Logo et Identité Visuelle**

- **Logo** : Minimaliste et moderne, l’accent doit être mis sur la **technologie** et l'**éducation**.
- **Placement** : Le logo doit être en haut à gauche, visible sur toutes les pages.
- **Couleurs du logo** : À définir en fonction de la palette de couleurs principales.

---

## 2. **Palette de Couleurs (avec Tailwind CSS)**

Nous allons utiliser la palette de couleurs de **Tailwind CSS** pour la cohérence et la flexibilité. Voici les couleurs principales et secondaires :

### 2.1 **Couleurs principales**
Les couleurs principales de la plateforme sont le bleu, qui représente la technologie et la confiance, et le vert, qui symbolise la progression.

- **Bleu principal** (`bg-blue-600`, `text-blue-600`)  
  - Code Hex : `#2563EB`  
  - Utilisé pour les boutons principaux, les liens, les titres, et l’en-tête.
  
- **Gris clair** (`bg-gray-100`, `text-gray-800`)  
  - Code Hex : `#F1F5F9`  
  - Utilisé pour les arrière-plans des pages et les éléments secondaires.
  
- **Vert** (`bg-green-600`, `text-green-600`)  
  - Code Hex : `#16A34A`  
  - Utilisé pour les indicateurs de succès, les boutons de confirmation et les notifications positives.

- **Rouge** (`bg-red-600`, `text-red-600`)  
  - Code Hex : `#EF4444`  
  - Utilisé pour les messages d'erreur ou alertes.

### 2.2 **Couleurs secondaires**
- **Orange** (`bg-orange-600`, `text-orange-600`)  
  - Code Hex : `#F97316`  
  - Utilisé pour les boutons secondaires et les éléments d’action secondaires.
  
- **Gris sombre** (`bg-gray-900`, `text-gray-100`)  
  - Code Hex : `#111827`  
  - Utilisé pour le texte principal et les éléments sombres.
  
- **Blanc** (`bg-white`, `text-white`)  
  - Code Hex : `#FFFFFF`  
  - Utilisé pour les zones de texte et les arrière-plans clairs.

---

## 3. **Typographie**

Nous allons utiliser **Roboto** de Google Fonts, qui est une police sans-serif claire et moderne, idéale pour une utilisation sur le web.

### 3.1 **Police principale**
- **Font** : [Roboto](https://fonts.google.com/specimen/Roboto)  
- **Poids principal** : Regular (400) pour le texte standard  
- **Poids pour titres** : Bold (700) pour les titres principaux et secondaires

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
```

### 3.2 **Tailles de police**
- **Titres principaux (H1)** : `text-4xl` (32px)
- **Titres secondaires (H2)** : `text-2xl` (24px)
- **Titres tertiaires (H3)** : `text-xl` (18px)
- **Texte principal** : `text-base` (14px - 16px)
- **Légendes et petites informations** : `text-sm` (12px)

### 3.3 **Hiérarchie typographique**
- **Les titres** doivent être mis en valeur avec des tailles et des poids différents pour créer une hiérarchie visuelle claire.  
- **Le texte principal** doit être lisible, avec une taille adéquate pour favoriser la lecture prolongée.

---

## 4. **Composants UI**

Nous utiliserons des composants simples mais efficaces avec **Tailwind CSS** pour créer une interface claire et moderne. Pour les icônes, nous utiliserons **FontAwesome**.

### 4.1 **Boutons**
Les boutons doivent être accessibles et clairs dans leur apparence.

- **Boutons primaires** : `bg-blue-600 text-white hover:bg-blue-700 rounded-lg p-3`
- **Boutons secondaires** : `bg-orange-600 text-white hover:bg-orange-700 rounded-lg p-3`

Exemple de code pour bouton primaire en Tailwind CSS :
```html
<button class="bg-blue-600 text-white hover:bg-blue-700 rounded-lg p-3">
  Bouton principal
</button>
```

### 4.2 **Formulaires**
Les champs de texte doivent être faciles à remplir et à lire. Les formulaires utilisent des couleurs et un espacement soigneusement choisis.

- **Champs de texte** : `bg-white text-gray-800 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-600`
- **Etiquettes** : `text-gray-700`

Exemple de code pour champ de formulaire :
```html
<input type="text" class="bg-white text-gray-800 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-600" placeholder="Entrez votre texte">
```

### 4.3 **Menus de navigation**
Les menus doivent être intuitifs et accessibles.

- **Menu principal** : `bg-blue-600 text-white hover:bg-blue-700 p-3`
- **Menu latéral** : `bg-gray-100 text-gray-800 hover:bg-gray-200 p-3`
- **Menu actif** : `bg-blue-700 text-white p-3`

Exemple de code pour menu principal :
```html
<nav class="bg-blue-600 text-white hover:bg-blue-700 p-3">
  Menu Principal
</nav>
```

### 4.4 **Cartes et Tableaux**
Les cartes et les tableaux doivent être simples et bien structurés.

- **Cartes** : `bg-white shadow-lg rounded-lg p-4`
- **Tableaux** : `table-auto border-separate border-spacing-2 p-4`

Exemple de code pour une carte :
```html
<div class="bg-white shadow-lg rounded-lg p-4">
  Carte de contenu
</div>
```

---

## 5. **Icônes et Illustrations**

### 5.1 **Icônes (FontAwesome)**
Utilisez des icônes de **FontAwesome** pour représenter visuellement les actions. Vous pouvez ajouter FontAwesome à votre projet avec le lien suivant :

```html
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
```

Exemples d’icônes à utiliser :
- **Icone de recherche** : `<i class="fas fa-search"></i>`
- **Icone de notification** : `<i class="fas fa-bell"></i>`
- **Icone de profil utilisateur** : `<i class="fas fa-user"></i>`

### 5.2 **Illustrations**
Les illustrations doivent être simples et illustrer les concepts d’apprentissage, de progrès, et de technologie. Utilisez des illustrations vectorielles modernes et légères, si possible, en SVG pour une meilleure performance.

---

## 6. **Accessibilité**

- **Contrastes** : Assurer un contraste suffisant entre le texte et le fond en utilisant les couleurs de la palette définie par Tailwind CSS pour garantir une bonne lisibilité pour tous les utilisateurs.
- **Navigation au clavier** : Assurer que toutes les interfaces sont entièrement navigables au clavier. Utilisez les classes de `focus:outline-none` pour enlever les bordures de focus, et `focus:ring-2` pour ajouter une bordure de focus visible.
  
### 6.1 **Exemple de focus pour bouton**
```html
<button class="bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 rounded-lg p-3">
  Bouton avec focus
</button>
```

---

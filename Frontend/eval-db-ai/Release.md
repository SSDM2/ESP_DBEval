
**Tag de la version** : `v1.0.1`  
**Nom de la release** : Release Frontend v1.0.1 - Interfaces de base

### Description de la release :

### Changelog :

#### **Nouvelles interfaces** :
- **Implémentation des interfaces de base** pour les pages suivantes :
  - **Exercice** : Interface permettant de visualiser les exercices proposés.
  - **Correction** : Interface affichant les corrections associées à chaque exercice.
  - **Note** : Interface pour afficher les notes des utilisateurs en fonction de leurs performances.
  - **Dashboard** : Interface principale affichant les résumés des activités de l'utilisateur (exercices, notes, etc.).
  - **Soumission** : Interface permettant à l'utilisateur de soumettre ses réponses pour les exercices.

#### **Progrès réalisés** :
- Toutes les interfaces sont maintenant créées avec leur structure de base.
- Les composants sont intégrés et prêts pour l'ajout de la logique frontend (comme la gestion des données, des interactions utilisateur, etc.).
- Les éléments UI ont été placés et sont visuellement cohérents entre les différentes pages du projet.

#### **Prochaines étapes** :
- Ajouter la logique frontend pour gérer les interactions utilisateur (soumissions, affichage des notes, gestion des exercices, etc.).
- Connecter ces interfaces à l'API backend pour récupérer et envoyer des données dynamiques.
  
### Instructions de mise à jour :

1. **Installation des dépendances** :
   Assurez-vous que toutes les dépendances front-end sont installées. Si ce n'est pas encore fait, utilisez la commande suivante :
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```

2. **Test** :
   - Vérifiez que les interfaces s'affichent correctement et que la mise en page est réactive (fonctionne bien sur mobile et desktop).
   - Assurez-vous qu'aucune erreur de rendu n'apparaît dans la console lors du chargement des pages.

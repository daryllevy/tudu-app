# TuDu App

## Description

TuDu App est une application de gestion de tâches minimaliste, inspirée de Todoist, développée en vanilla JavaScript moderne (ES6 modules). Elle permet de gérer vos tâches par projet, d'utiliser des filtres intelligents (Inbox, Aujourd'hui, Semaine, Mois), et de conserver vos données localement.

## Fonctionnalités

- **Gestion de projets** : Ajoutez, renommez, supprimez des projets.
- **Tâches** : Ajoutez, éditez, supprimez des tâches dans chaque projet.
- **Filtres dynamiques** :
  - Inbox : toutes les tâches non assignées à un projet.
  - Aujourd'hui, Cette semaine, Ce mois : filtrage automatique par date (via date-fns).
- **Suppression intuitive** : La poubelle s'affiche au survol d'un projet, cliquez pour supprimer.
- **Persistance** : Toutes les données sont sauvegardées dans le navigateur (localStorage).
- **UI moderne** : Interface claire, sans dépendance lourde.

## Installation & Lancement

1. **Cloner le repo**
   ```bash
   git clone https://github.com/daryllevy/tudu-app
   cd tudu-app
   ```
2. **Installer les dépendances**
   ```bash
   npm install
   ```
3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

## Structure du projet

- `src/` : Code source principal
  - `models/` : Modèles Project et ToDo
  - `services/` : Logique métier (projets, tâches)
  - `utils/` : Fonctions utilitaires (affichage, filtres)
  - `views/` : Gestion de l'affichage HTML
- `public/` : Fichiers statiques (icônes, screenshot)
- `index.html` : Entrée principale
- `style.css` : Styles globaux

## Technologies

- JavaScript (ES6 modules)
- Vite (dev/build)
- date-fns (gestion des dates)
- localStorage (persistance)

## Auteur

Projet réalisé dans le cadre de The Odin Project.

---

_Pour toute question ou suggestion, ouvrez une issue !_

# Quiz Géologie & Chimie Premium - PWA

Une application React de quiz sur la géologie et la chimie avec des versions gratuite et premium, utilisant Firebase pour l'authentification. **Maintenant disponible comme Progressive Web App (PWA) installable sur Android !**

## 🚀 Fonctionnalités

- **Version Gratuite**: Questions de base, 4 choix, chronomètre 15s, score final.
- **Version Premium**: Questions avancées, chronomètre 20s, corrections détaillées, accès via authentification.
- **Authentification**: Connexion/Inscription avec Firebase.
- **Design Moderne**: Interface responsive optimisée pour mobile.
- **PWA**: Installation sur Android, mode hors ligne, notifications push.

## 📱 Installation sur Android

### Méthode 1: Depuis le navigateur Chrome
1. Ouvrez l'application dans Chrome sur Android
2. Appuyez sur le menu (3 points) → "Ajouter à l'écran d'accueil"
3. Confirmez l'installation
4. L'app sera disponible comme une application native

### Méthode 2: Développement local
1. Installez Node.js si ce n'est pas déjà fait
2. Naviguez vers le dossier du projet
3. Exécutez `npm install` pour installer les dépendances
4. Configurez Firebase :
   - Créez un projet sur https://console.firebase.google.com/
   - Activez Authentication avec Email/Password
   - Copiez la config dans `src/firebase.js`
5. Lancez avec `npm start`
6. Ouvrez `http://localhost:3000` dans Chrome Android
7. Suivez la méthode 1 pour installer

## 🏗️ Structure du Projet

- `App.js`: Logique principale et gestion de l'authentification
- `Question.js`: Affichage des questions
- `Result.js`: Affichage des résultats
- `PremiumBanner.js`: Bannière pour accéder au premium
- `Login.js`: Composant de connexion/inscription
- `firebase.js`: Configuration Firebase
- `quizFreeData.js`: Questions gratuites
- `quizPremiumData.js`: Questions premium
- `App.css`: Styles modernes et responsives
- `manifest.json`: Configuration PWA
- `serviceWorkerRegistration.js`: Service worker pour le cache hors ligne

## 🎮 Utilisation

- Commencez par le quiz gratuit
- Cliquez sur "Se connecter pour accéder" pour le premium
- Inscrivez-vous ou connectez-vous avec un email
- Profitez des fonctionnalités premium une fois authentifié
- L'app fonctionne hors ligne une fois installée

## 🔧 Fonctionnalités PWA

- **Installation**: Ajoutable à l'écran d'accueil Android
- **Mode Hors Ligne**: Cache intelligent des ressources
- **Performance**: Chargement rapide et fluide
- **Responsive**: Optimisée pour tous les écrans mobiles
- **Sécurité**: HTTPS requis pour l'installation
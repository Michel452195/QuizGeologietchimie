# Guide d'Installation - Quiz Géologie & Chimie Premium

## 📱 Installation sur Android

### Prérequis
- Android 8.0 ou supérieur
- Chrome ou un navigateur compatible PWA
- Connexion internet

### Méthode 1: Installation depuis un serveur local (Développement)

1. **Démarrer l'application en local:**
   ```bash
   cd QuizGeoChimiePremium
   npm start
   ```

2. **Accéder depuis votre téléphone:**
   - Ouvrez Chrome sur Android
   - Allez à l'adresse: `http://[IP_DE_VOTRE_PC]:3000`
   - (Remplacez [IP_DE_VOTRE_PC] par l'adresse IP de votre ordinateur)

3. **Installer l'application:**
   - Appuyez sur le menu (3 points) ⋮
   - Sélectionnez "Ajouter à l'écran d'accueil"
   - Confirmez l'installation

### Méthode 2: Installation depuis un serveur en ligne (Production)

1. **Déployer l'application:**
   ```bash
   npm run build
   ```

2. **Héberger sur un service HTTPS:**
   - Vercel, Netlify, Firebase Hosting, etc.
   - L'application doit être accessible via HTTPS

3. **Installer depuis votre téléphone:**
   - Ouvrez l'URL de votre application dans Chrome
   - Menu ⋮ → "Ajouter à l'écran d'accueil"

## ✅ Fonctionnalités PWA

Une fois installée, votre application:
- ✅ Fonctionne hors ligne
- ✅ Se lance comme une app native
- ✅ Reçoit des mises à jour automatiquement
- ✅ A accès aux fonctionnalités natives

## 🔧 Dépannage

**Si l'option "Ajouter à l'écran d'accueil" n'apparaît pas:**
- Vérifiez que l'application est en HTTPS
- Actualisez la page
- Essayez un autre navigateur

**Si l'application ne se lance pas:**
- Vérifiez les permissions
- Redémarrez votre téléphone
- Réinstallez l'application

---

**Développé par:** Kachuva Lambya
**Contact:** 0826122119 | katchuvamichael@gmail.com
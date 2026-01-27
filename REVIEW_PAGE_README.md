# Page de collecte d'avis - Documentation

## 📍 URL de la page
- Français : `https://origin-studio.ch/fr/review`
- Anglais : `https://origin-studio.ch/en/review`
- Allemand : `https://origin-studio.ch/de/review`

## 🎯 Fonctionnalités

### Formulaire
La page de collecte d'avis demande les informations suivantes :
- ✅ **Prénom** (requis)
- ✅ **Nom** (requis)
- ⭕ **Entreprise** (optionnel)
- ✅ **Email** (requis)
- ✅ **Note** (1 à 5 étoiles, requis)
- ✅ **Texte de l'avis** (minimum 20 caractères, requis)
- ⭕ **Image** (optionnel, max 20 Mo)

### Pré-remplissage depuis URL
Vous pouvez envoyer des liens pré-remplis à vos clients :
```
https://origin-studio.ch/fr/review?firstName=Jean&lastName=Dupont&email=jean@exemple.ch&company=Ma%20Société
```

Paramètres disponibles :
- `firstName` : Prénom
- `lastName` : Nom
- `email` : Email
- `company` : Nom de l'entreprise

### Upload d'images
- **Taille maximale** : 20 Mo
- **Formats acceptés** : Tous les formats d'image
- **Stockage** : `/public/uploads/` avec UUID généré automatiquement
- **Exemple** : `a3f8b2c1-4d5e-6f7g-8h9i-0j1k2l3m4n5o.jpg`

### Sécurité anti-spam
Le système inclut plusieurs mesures de sécurité :
- ✅ **Honeypot** : Champ caché pour piéger les bots
- ✅ **Nonce** : Token unique avec signature HMAC
- ✅ **Rate limiting** : Maximum 3 soumissions par 15 minutes
- ✅ **Time gate** : Minimum 2 secondes pour remplir le formulaire
- ✅ **Validation serveur** : Toutes les données sont validées côté serveur

### Notifications

#### Email de confirmation au client
Envoyé automatiquement après la soumission de l'avis avec :
- Récapitulatif de l'avis (note, texte)
- Aperçu de l'image si fournie
- Message de remerciement

#### Webhook Discord
Un message embed est envoyé au webhook Discord (.env)

Le message contient :
- 👤 Nom complet + entreprise
- 📧 Email
- ⭐ Note avec étoiles
- 💬 Texte de l'avis
- 🖼️ Miniature de l'image (si fournie)
- 📅 Timestamp

## 📁 Fichiers créés

### Pages et composants
- `/src/app/[locales]/review/page.tsx` : Page principale
- `/src/components/ReviewForm.tsx` : Composant formulaire

### API
- `/src/app/api/review/nonce/route.ts` : Génération du token de sécurité
- `/src/app/api/review/submit/route.ts` : Soumission de l'avis

### Traductions
Ajouté dans les 3 langues (fr, en, de) :
- `/src/locales/fr/common.json`
- `/src/locales/en/common.json`
- `/src/locales/de/common.json`

### Types TypeScript
- `/src/types/translations.ts` : Type `ReviewTranslations`
- `/src/types/dictionary.ts` : Ajout de `review` dans `Dictionary`

### Configuration
- `/public/uploads/` : Dossier pour les images
- `/.gitignore` : Mis à jour pour ignorer les uploads

## 🔧 Configuration requise

### Variables d'environnement
Assurez-vous que ces variables sont définies dans votre `.env` :

```env
# SMTP Configuration (déjà configuré pour contact)
SMTP_HOST=mail.infomaniak.com
SMTP_PORT=587
SMTP_USER=votre-email@origine-studio.ch
SMTP_PASSWORD=votre-mot-de-passe
SMTP_FROM=noreply@origin-studio.ch
SMTP_FROM_NAME=Origin Studio

# Security
FORM_SECRET=votre-secret-tres-securise

# Site URL (pour les liens dans les emails et Discord)
NEXT_PUBLIC_SITE_URL=https://origin-studio.ch
```

## 🎨 Style
La page utilise exactement le même style que la page contact :
- Layout en 2 colonnes (formulaire + informations)
- Même palette de couleurs
- Même système de validation
- Même design des inputs et boutons

## 🔒 Confidentialité
- ✅ La page n'est PAS mentionnée dans le footer
- ✅ La page n'est PAS mentionnée dans la navigation
- ✅ C'est un lien privé à envoyer uniquement aux clients

## 📦 Dépendances ajoutées
```bash
pnpm add uuid
pnpm add -D @types/uuid
```

## 🚀 Utilisation

### Envoyer un lien à un client
1. Générez un lien avec pré-remplissage :
   ```
   https://origin-studio.ch/fr/review?firstName=Jean&lastName=Dupont&email=jean@exemple.ch
   ```

2. Envoyez-le par email/SMS au client

3. Le client remplit le formulaire

4. Vous recevez :
   - Une notification Discord avec embed
   - L'email de confirmation est envoyé au client

### Modération des images
Les images uploadées se trouvent dans `/public/uploads/`. 
Vous pouvez les retoucher manuellement si nécessaire.

## 🐛 Debugging

### Vérifier les logs
```bash
# Logs serveur
tail -f .next/server.log

# Logs Discord webhook
# Vérifiez les logs dans la console serveur
```

### Tester le webhook Discord
Vous pouvez tester manuellement avec curl :
```bash
curl -X POST "https://discord.com/api/webhooks/1465388648399900898/37Io_pskliWkSIKQqfq4zNW-v8XBfVjV2AUHnhhbpBzECkq77L69sxvdiYpZAg_8s5mh" \
  -H "Content-Type: application/json" \
  -d '{
    "embeds": [{
      "title": "Test",
      "description": "Ceci est un test"
    }]
  }'
```

## ✅ Checklist de déploiement
- [ ] Vérifier que le dossier `/public/uploads/` existe
- [ ] Vérifier les permissions d'écriture sur `/public/uploads/`
- [ ] Vérifier les variables d'environnement
- [ ] Tester le webhook Discord
- [ ] Tester l'envoi d'emails
- [ ] Vérifier que le `.gitignore` ignore bien `/public/uploads/*`

## 📝 Notes
- Les images ne sont pas automatiquement supprimées
- Pensez à mettre en place une politique de rétention si nécessaire
- Le rate limiting est en mémoire (considérez Redis en production)

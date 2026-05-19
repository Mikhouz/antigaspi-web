# CLAUDE.md — Site Web Sangachi

## Projet

- **Nom** : Sangachi — site de présentation
- **Description** : Landing page one-page présentant l'application mobile Sangachi, permettant de télécharger l'app et de souscrire aux offres premium directement depuis le web
- **Type** : Site statique one-page (landing page)
- **Langue** : Français uniquement
- **Stack** : HTML5 / CSS3 / JavaScript vanilla — aucun framework
- **Répertoire de travail** : `D:\Projets\01_Antigaspi\web\Antigaspi-web`

## Lien avec l'application mobile

- L'application mobile est développée en Flutter — répertoire : `D:\Projets\01_Antigaspi\mobile\app_antigaspi`
- Le site web est la vitrine publique de l'app : il doit en refléter l'identité visuelle exacte
- La charte graphique est partagée entre les deux projets (même palette, même typographie)

## Objectifs du site

1. **Présenter l'application** : fonctionnalités clés, captures d'écran, proposition de valeur
2. **Convertir en téléchargements** : CTA vers le Google Play Store (et App Store à terme)
3. **Vendre l'abonnement premium** : formulaire de souscription intégré avec Stripe
4. **Crédibilité** : donner confiance aux utilisateurs avant le téléchargement

## Structure de la page (sections)

1. **Hero** — accroche, sous-titre, bouton téléchargement Play Store + CTA premium
2. **Fonctionnalités** — présentation des fonctionnalités principales de l'app (icônes + textes)
3. **Captures d'écran** — mockups de l'app sur smartphone
4. **Offres / Tarifs** — comparatif gratuit vs premium, bouton d'achat Stripe
5. **FAQ** — questions fréquentes (optionnel)
6. **Footer** — liens légaux (CGU, politique de confidentialité), contact

## Monétisation web

- **Prestataire de paiement** : Stripe (Stripe Checkout ou Stripe Payment Links)
- **Offre premium** : abonnement mensuel — suppression des publicités + fonctionnalités avancées
- **Flux** : clic sur "S'abonner" → redirection vers Stripe Checkout → confirmation
- ⚠️ Les prix affichés sur le site doivent être cohérents avec ceux de l'app mobile
- ⚠️ Intégrer les mentions légales obligatoires liées à la vente en ligne (CGV)

## Hébergement & domaine

- **Hébergement** : Hostinger standard (suffisant — backend sur Supabase)
- **Nom de domaine** : `sangachi.fr` — réservé le 11/05/2026 pour 3 ans
- **Contrainte** : solution d'hébergement compatible avec les webhooks Stripe si nécessaire

## Calendrier

- **Deadline : fin mai 2026** — le site doit être en ligne avant ou en même temps que la publication Play Store
- Priorité : page fonctionnelle et convertissante avant tout polish visuel avancé

---

## Charte graphique (identique à l'application mobile)

> Source de vérité : design Google Stitch — https://stitch.withgoogle.com/projects/5605873435043161261

**Palette de couleurs**
| Rôle | Hex | Usage |
|------|-----|-------|
| Primary | `#2EB88A` | Couleur principale, boutons primaires, header, accents |
| Secondary | `#578E7C` | Éléments secondaires, accents, séparateurs |
| Tertiary | `#F7807B` | Badges, alertes, éléments d'urgence (ex. "offre limitée") |
| Neutral | `#727974` | Textes secondaires, icônes inactives, bordures |

**Typographie**
- Police unique : **Plus Jakarta Sans** — chargée via Google Fonts
- Aucune police système (pas d'Arial, pas de Roboto implicite)
- Déclaration dans le `<head>` : `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap`

**Composants UI**
- Bouton primaire : fond `#2EB88A`, texte blanc, border-radius 8px
- Bouton secondaire : fond blanc, texte `#2EB88A`, bordure `#2EB88A`
- Bouton destructif / urgence : fond `#F7807B`, texte blanc
- Badge / label : fond `#F7807B` ou `#2EB88A`, coins arrondis, texte blanc

**Règles impératives**
- Ne jamais utiliser de vert générique (`green`, `#00ff00`, etc.) — utiliser `#2EB88A`
- Ne jamais utiliser de rouge générique pour les actions — utiliser `#F7807B`
- Le gris des textes secondaires est toujours `#727974`
- Toute modification CSS doit vérifier la conformité des couleurs avec cette charte

---

## État actuel du projet

- `index.html` : landing page principale (logo, hero, features, screenshots, premium, support, footer)
- `confirm.html` : page de redirection deep link `com.app_antigaspi://login-callback` (fix email confirmation)
- `mentions-legales.html`, `politique-confidentialite.html`, `cgv.html` : pages légales
- `css/styles.css` : feuille de style principale
- `js/main.js` : scripts JavaScript
- `assets/icon_launcher.png` : icône officielle de l'app (logo navbar, footer, favicon)

## Ce qui a été fait (session 15 mai 2026)

- ✅ Logo navbar + footer : SVG inventé → `assets/icon_launcher.png` (vraie icône de l'app)
- ✅ Favicon : SVG feuille → `assets/icon_launcher.png`
- ✅ Renommage complet "Antigaspi'" → "Sangachi" (titre, meta OG, hero, footer, copyright, form subject)
- ✅ Tagline "Sans gâchis, plus malin !" intégrée (meta OG title, footer)
- ✅ Email contact : `appantigaspi.contact@gmail.com` (temporaire — à basculer vers `contact@sangachi.fr` quand le DNS est configuré)
- ✅ Page `confirm.html` créée : deep link `com.app_antigaspi://login-callback` + 4 états (loading, succès, erreur, fallback Play Store)

## Ce qui reste à faire

| Tâche | Bloqué par |
|-------|-----------|
| URL Play Store dans tous les CTA (`href="#"`) | App encore en test fermé — à remplir au passage en prod |
| Intégration Stripe (pricing table) | Besoin : `pricing-table-id` + `publishable-key` depuis le dashboard Stripe |
| Formulaire contact (Formspree) | Besoin : créer compte sur formspree.io → récupérer le form ID → remplacer `REPLACE_YOUR_FORMSPREE_ID` dans `index.html` |
| Pages légales (`mentions-legales.html`, `politique-confidentialite.html`, `cgv.html`) | Encore au nom "Antigaspi'" — à renommer en "Sangachi" |
| Email `contact@sangachi.fr` | DNS sangachi.fr pas encore configuré sur Hostinger — redirection email impossible pour l'instant |
| Déploiement sur Hostinger | DNS sangachi.fr à pointer vers Hostinger + upload des fichiers |

## Aide attendue de Claude

- Développement HTML/CSS/JS : structure, composants, animations légères
- Intégration Stripe : mise en place du flux de paiement
- Optimisation conversion : copywriting des sections, hiérarchie visuelle
- SEO de base : balises meta, OpenGraph, structure sémantique
- Responsive : le site doit être parfaitement lisible sur mobile (cible principale)

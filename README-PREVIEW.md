# Version aperçu — GitHub Pages

Identique au site principal, à une différence près : **tous les chemins internes sont
relatifs** (`assets/css/styles.css` au lieu de `/assets/css/styles.css`).
Elle fonctionne donc aussi bien à la racine d'un domaine que dans un sous-dossier
du type `https://compte.github.io/nom-du-repo/`.

## Mise en ligne en 4 étapes

1. Créer un dépôt GitHub (public) et y déposer le **contenu** de ce dossier
   (`index.html` doit se trouver à la racine du dépôt, pas dans un sous-dossier).
2. Settings → Pages → Source : `Deploy from a branch` → branche `main`, dossier `/ (root)`.
3. Attendre 1 à 2 minutes : l'URL `https://compte.github.io/nom-du-repo/` s'affiche.
4. Partager le lien au client pour validation.

## Ce qui fonctionne sur GitHub Pages

Tout : HTTPS automatique, images WebP, polices Google, carte Google Maps, modale de
rendez-vous, liens OneDoc et WhatsApp, appel téléphonique depuis un mobile.
Aucun serveur ni build n'est nécessaire, le site est 100 % statique.

## Points d'attention pour un simple aperçu

- Ne pas laisser cette version indexée durablement : le dépôt étant public, Google peut
  référencer `compte.github.io`, ce qui créerait du contenu dupliqué avec le vrai domaine.
  Pour un aperçu privé, remplacer le contenu de `robots.txt` par :
  ```
  User-agent: *
  Disallow: /
  ```
  puis remettre la version normale lors de la mise en ligne définitive.
- Les balises `canonical`, Open Graph, `sitemap.xml` et le JSON-LD contiennent encore
  `VOTRE-DOMAINE.ch` : sans importance pour un aperçu, à remplacer sur le domaine final.
- Pour la mise en production sur le vrai domaine, utiliser plutôt le dossier `physio2`
  (chemins absolus, plus robustes si des pages sont ajoutées dans des sous-dossiers).

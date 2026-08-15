# Site — Cabinet PhysiO2 · Kyriakos Petropoulakos, physiothérapeute à Belfaux

Site vitrine statique (HTML / CSS / JS, sans framework ni dépendance).
Il suffit de déposer le contenu du dossier à la racine de l'hébergement.

## Arborescence

```
index.html                      Page principale (one-page)
mentions-legales.html
politique-confidentialite.html
robots.txt · sitemap.xml
favicon.svg · favicon-32.png · apple-touch-icon.png · site.webmanifest
assets/
  css/styles.css                Feuille de styles unique et commentée
  js/main.js                    Menu mobile, modale RDV, header, apparitions, carte différée
  img/                          Photos réelles du cabinet converties en WebP (800 / 1400 px)
```

## À faire avant la mise en ligne

1. **Domaine** — remplacer `VOTRE-DOMAINE.ch` partout :
   ```bash
   grep -rl "VOTRE-DOMAINE.ch" . | xargs sed -i 's/VOTRE-DOMAINE.ch/www.exemple.ch/g'
   ```
   Concerne : `canonical`, Open Graph, JSON-LD, `robots.txt`, `sitemap.xml`.
2. **Portrait du physiothérapeute** — l'emplacement est prévu dans la section « À propos ».
   Déposer la photo dans `assets/img/portrait-kyriakos.webp` (format portrait 4:5),
   puis remplacer le contenu de `<div class="portrait-slot">` par :
   ```html
   <img src="/assets/img/portrait-kyriakos.webp" width="900" height="1125"
        alt="Kyriakos Petropoulakos, physiothérapeute au Cabinet PhysiO2 à Belfaux">
   ```
3. **Mentions légales / confidentialité** — compléter les blocs signalés en jaune
   (raison sociale, IDE, e-mail, hébergeur).
4. **Google Business Profile** — créer / revendiquer la fiche « Cabinet PhysiO2 » avec
   exactement la même adresse, le même téléphone et les mêmes horaires que le site (cohérence NAP).
5. **Search Console** — soumettre `sitemap.xml` après la mise en ligne.

## Sources du contenu

Tous les textes sont reformulés à partir de la fiche publique OneDoc du praticien
(expertises, motifs de consultation, tarifs massage / drainage / cryothérapie, horaires,
langues, parcours). **Aucune donnée n'a été inventée** : les séances de physiothérapie ne
sont pas tarifées sur la fiche, elles ne le sont donc pas non plus sur le site.

## Prise de rendez-vous

Aucun agenda propriétaire. Tous les CTA ouvrent la même modale (attribut `data-rdv` sur
n'importe quel bouton ou lien) proposant deux chemins :

- **OneDoc** → `https://www.onedoc.ch/fr/physiotherapeute/belfaux/pc3uq/kyriakos-petropoulakos`
- **WhatsApp** → `https://wa.me/41767836957` avec message pré-rempli

Pour ajouter un nouveau bouton de réservation n'importe où :
```html
<button type="button" class="btn btn--primary" data-rdv>Prendre rendez-vous</button>
```

## Performance

- Photos converties en WebP, `srcset` + `sizes`, dimensions explicites (anti-CLS).
- Image du hero préchargée, le reste en `loading="lazy"`.
- Carte Google chargée seulement à l'approche de la section (IntersectionObserver).
- CSS ≈ 20 Ko, JS ≈ 5 Ko, aucune librairie externe.
- Option pour aller plus loin : héberger les polices Manrope / Inter en local
  (`assets/fonts/`) pour supprimer la requête vers Google Fonts — cela améliore aussi
  la conformité LPD.

## Tests effectués

Testé dans Chromium (Playwright) aux largeurs 320 / 375 / 430 / 768 / 1440 px :
aucun débordement horizontal, menu mobile, modale (ouverture, Échap, croix, clic
extérieur), barre flottante, ancres, liens `tel:`, pages légales. Non mesuré :
Lighthouse et Core Web Vitals réels, ainsi que le rendu de la carte Google et des
polices Google (bloqués dans l'environnement de test, à revérifier une fois en ligne).

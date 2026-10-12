# 🧼 CleanOR v0.1.1 — HTML autonome et version datée

**Publication du 12 octobre 2026.** Cette version reprend la correction du chargement de sauvegarde externe et intègre les remarques de version et de date directement dans le fichier distribué.

## Contenu
- **Un seul fichier :** `CleanOR-v0.1.1.html`, à ouvrir directement dans Chrome ou un autre navigateur compatible, même hors ligne.
- **Aucun JavaScript extérieur à télécharger, aucun fichier annexe à fournir.** Le programme JavaScript est intégré dans la page HTML.
- Le commentaire de tête indique **v0.1.1 — 12/10/2026** et l'interface affiche v0.1.1.
- Conversion bidirectionnelle CRM ↔ outil opérateur réseau ; règles personnalisables, prise en charge UTF-8 / Windows-1252, gros boutons et aide.
- Export/import **JSON manuel** des règles ; mémorisation locale dans le navigateur si autorisée.

## Vérification
- Tests Node.js du noyau, des profils et de l'absence de dépendances externes exécutés avant publication (16 tests à cette étape).
- Les restrictions spécifiques d'un navigateur d'entreprise et les validations d'applications métiers doivent encore être testées en situation réelle. Le message console `file://` observé n'est pas déclaré résolu sans reproduction.

## Historique
La release `v0.1.0` reste disponible et inchangée. Licence MIT.

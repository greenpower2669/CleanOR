# 🧼 CleanOR v0.1.2 — séparateurs uniformisés pour la destination réseau

**Publication du 30 octobre 2026.** Fichier HTML autonome pour usage hors ligne : `CleanOR-v0.1.2.html`.

## Changements
- Dans la direction **CRM → outil opérateur réseau**, les retours CR/LF/CRLF, tabulations, espaces Unicode et séparateurs invisibles sont remplacés par **un espace standard ASCII U+0020**.
- Les groupes de séparateurs sont condensés sans fusionner les mots ; la sortie utilise une seule ligne, avec un compteur de normalisations.
- Les règles personnalisées sont suivies de la normalisation ; les accents et la typographie restent gérés par le profil de destination.
- La direction **outil opérateur réseau → CRM** préserve les retours à la ligne ordinaires.
- Aide à l'écran et tests automatisés de non-régression actualisés.

## Distribution et confidentialité
- Un seul fichier HTML, aucune dépendance réseau, aucune bibliothèque externe, aucun script voisin, aucun stockage de texte métier par CleanOR.
- Le fonctionnement du noyau et des paramètres est vérifié en CI ; **les validations réelles des formulaires externes ne sont pas garanties**. Tester un exemple anonymisé sur poste professionnel.
- Les releases `v0.1.0` et `v0.1.1` restent disponibles et inchangées.

Licence MIT.

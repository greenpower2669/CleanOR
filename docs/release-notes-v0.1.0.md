# CleanOR v0.1.0 — Première version publique

**Application de nettoyage de texte autonome** entre un CRM et un outil opérateur réseau.

## Fonctionnalités
- Un seul fichier HTML local, utilisable hors connexion et sans librairie externe.
- Deux zones de texte, bouton central ⇄ pour inverser le sens.
- Modes prudent / renforcé, nettoyage des caractères invisibles, substitution de ponctuations Unicode.
- Règles configurables, gros boutons, zoom, aide et import/export JSON.
- Import/export de fichiers texte avec prise en charge UTF-8 et Windows-1252.
- Paramètres mémorisés dans le navigateur lorsque le stockage local est autorisé.

## Correction intégrée
- Aucun chargement d'un fichier « CleanOR-sauvegarde.js » absent au démarrage ; aucune dépendance locale obligatoire.
- Un seul fichier HTML suffit : télécharger **CleanOR-v0.1.0.html** et l'ouvrir localement.

## Validation
- 15 tests automatiques Node.js contrôlent conversions, règles, démarrage sans stockage et absence de ressources externes.
- Reste à confirmer l'utilisation avec la politique Chrome et les applications métiers sur le poste professionnel. Les validations internes de celles-ci restent inconnues.

## Confidentialité
Aucun transfert vers un serveur, et aucun texte métier conservé par l'application. Seules les règles peuvent être enregistrées dans le navigateur.

Licence MIT.

# 🧼 CleanOR

CleanOR est un **convertisseur de texte HTML/JavaScript 100 % local**, sans serveur, réseau ou bibliothèque externe. Il facilite le transfert de texte entre un **CRM** et un **outil opérateur réseau**, sans afficher de nom de fournisseur.

## Utilisation

1. Télécharger le fichier **index.html** et l'ouvrir par double-clic dans un navigateur moderne, même hors ligne.
2. Coller un texte dans la zone de gauche, cliquer sur **Convertir**, puis sur **Copier le résultat**.
3. **⇄ Inverser** reprend le résultat comme nouvelle entrée et utilise l'autre profil de destination.
4. Dans **⚙️ Réglages**, ajouter les caractères refusés et les règles personnalisées, importer/exporter les règles JSON, choisir les encodages.
5. **❓ Aide**, **A+ / A−** et grandes zones de texte améliorent la lisibilité.

**Modes** : prudent (remplacer les caractères non représentables par un point d'interrogation) ou renforcé (supprimer ces caractères). Une conversion avec pertes n'est **pas réversible** : relire avant envoi.

## Encodage et limites

Un texte **collé** est déjà interprété en Unicode par le navigateur ; aucune option ne peut forcer son collage en ANSI. Les menus permettent de limiter les caractères de sortie à UTF-8, Windows-1252 ou ASCII, mais le presse-papiers reste Unicode.

En revanche, **les fichiers texte** sont réellement décodés (UTF-8, Windows-1252 ou ISO-8859-1 via l'alias Web Windows-1252) et exportés en octets UTF-8, Windows-1252 ou ASCII. Option de réparation explicite de l'erreur « UTF-8 lu comme ANSI ». La validation du logiciel destinataire reste inconnue et doit être testée.

## Confidentialité

Aucune transmission, aucune statistique ; les textes collés ne sont pas sauvegardés par CleanOR. Seuls les profils de règles peuvent être conservés dans le stockage local du navigateur. N'importez pas de données client dans des fichiers de règles et ne publiez pas de données de production sur GitHub.

## Tests et projet

Exécuter : **node --test tests/test-core.cjs** (Node 22 ; aucune dépendance). Les tests sont également lancés dans GitHub Actions. Architecture et suivi : brain.md, brainmap.md, debughistorical.md, todo.md et ordres-de-mission.md.

Licence MIT. V0.1 de travail sur **feature/cleanor-offline-v01**, sans fusion de main ni release sans validation de Fab.

## Sauvegarde chargée automatiquement — CLOR-MISSION-003

Une sauvegarde locale optionnelle est lue **sans intervention au démarrage** :

1. Dans **⚙️ Réglages**, sélectionner **💾 Sauvegarde auto (.js)**.
2. Enregistrer/déplacer **CleanOR-sauvegarde.js** dans le même dossier que **index.html** (orthographe exacte).
3. Aux ouvertures suivantes, CleanOR charge automatiquement ce fichier sans demander de cliquer sur Importer.

**Priorité :** sauvegarde du dossier valide > paramètres du navigateur > réglages d'origine. Si elle manque, les paramètres du navigateur restent utilisés. Le JSON traditionnel reste importable/exportable manuellement, mais les navigateurs n'autorisent généralement pas la lecture automatique d'un JSON voisin sous file://.

**Mise à jour :** après une modification des règles, réexporter le fichier et remplacer l'ancien. Un navigateur ne peut pas écraser silencieusement un fichier voisin ; seule la *lecture* est automatique. Une sauvegarde du dossier restée ancienne reprend le dessus au redémarrage : pensez à la remplacer si besoin.

**Sécurité :** ne placer dans le dossier que des sauvegardes de confiance, car le fichier JS est exécuté par le navigateur. Aucune donnée métier sensible dans les règles ni dans GitHub. Le fichier de sauvegarde local est ignoré par Git grâce à .gitignore.

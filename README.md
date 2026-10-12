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

Licence MIT. **v0.1.0** : première version autorisée à la publication par Fab ; procédure GitHub Release préparée depuis la Pull Request, à vérifier après fusion.

## Préférences et import/export

Au démarrage, CleanOR tente de restaurer automatiquement ses réglages depuis le stockage local du navigateur (localStorage). Si celui-ci est inaccessible ou vide, les paramètres d'origine sont utilisés. **Aucun fichier situé à côté de la page n'est recherché** : il n'y a plus de chargement automatique d'un script de sauvegarde ni de requête vers un fichier voisin.

Les boutons **Exporter les règles JSON** et **Importer les règles JSON** restent disponibles pour sauvegarder les profils dans un fichier ou les transférer sur un autre poste. Ces opérations nécessitent un clic explicite. Le fichier JSON ne contient pas de texte métier.

Une politique d'entreprise peut empêcher l'accès au stockage local du navigateur ouvert par file://. Dans ce cas, l'application fonctionne sans bloquer ; sauvegarder les règles par export JSON est recommandé.

## Tests

Commandes : `node --test tests/test-core.cjs tests/test-settings.cjs`. La CI contrôle l'absence de dépendance externe, le moteur de conversion, la persistance et le repli sans stockage.

## Historique

La fonctionnalité « charger un fichier JS voisin au démarrage » (CLOR-MISSION-003) a été **retirée à la demande de Fab (12/10/2026)**, suite à un message dans la console Chrome en l'absence du fichier. Référence : CLOR-MISSION-004.

## Publication v0.1.0

La version HTML autonome est distribuée sous le nom **CleanOR-v0.1.0.html** comme fichier téléchargeable de la GitHub Release `v0.1.0`, après exécution réussie du workflow de publication. La publication est déclenchée **une seule fois**, par le merge intitulé `Release CleanOR v0.1.0`, et revalide le code avant de créer le tag et l'asset. **Publication vérifiée le 12/10/2026** : [GitHub Release v0.1.0](https://github.com/greenpower2669/CleanOR/releases/tag/v0.1.0) et [téléchargement direct de CleanOR-v0.1.0.html](https://github.com/greenpower2669/CleanOR/releases/download/v0.1.0/CleanOR-v0.1.0.html).

Notes prévues : `docs/release-notes-v0.1.0.md` ; source de publication : `.github/workflows/release-v0.1.0.yml`.

**Traçabilité :** tag `v0.1.0` → commit de fusion `385ff61c2d0150a9afc849ca6e2a6fdbf36dffe1` ; [workflow de release réussi](https://github.com/greenpower2669/CleanOR/actions/runs/38219223243), 15 tests / 15 ; SHA-256 du fichier HTML : `4b17d9ef200c85f131055551eb0653f4ff2497682ac235818074c0810d3e7ce3`.

## Remarque source — version et date (12/10/2026)

La page `index.html` de `main` porte désormais en tête un **commentaire HTML** indiquant `v0.1.0`, la date `12/10/2026` et l'absence de fichier `.js` annexe requis. Cette modification documentaire ne change pas les mécanismes de nettoyage, les réglages ni le fichier de la **GitHub Release v0.1.0**, déjà publié et conservé inchangé. Aucune nouvelle release demandée dans cette intervention.

**Fusion vérifiée de la remarque (CLOR-MISSION-006) :** [Pull Request n° 2](https://github.com/greenpower2669/CleanOR/pull/2), commit `cca3cff6af3b1a2270725db6f52d17f7bb262ae9`, [tests `main` 16/16](https://github.com/greenpower2669/CleanOR/actions/runs/38224194263). Pour la remarque date/version ajoutée après la release, consulter directement le [fichier `index.html` sur `main`](https://github.com/greenpower2669/CleanOR/blob/main/index.html), non l'asset immuable de la release antérieure.

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

## Préférences et import/export

Au démarrage, CleanOR tente de restaurer automatiquement ses réglages depuis le stockage local du navigateur (localStorage). Si celui-ci est inaccessible ou vide, les paramètres d'origine sont utilisés. **Aucun fichier situé à côté de la page n'est recherché** : il n'y a plus de chargement automatique d'un script de sauvegarde ni de requête vers un fichier voisin.

Les boutons **Exporter les règles JSON** et **Importer les règles JSON** restent disponibles pour sauvegarder les profils dans un fichier ou les transférer sur un autre poste. Ces opérations nécessitent un clic explicite. Le fichier JSON ne contient pas de texte métier.

Une politique d'entreprise peut empêcher l'accès au stockage local du navigateur ouvert par file://. Dans ce cas, l'application fonctionne sans bloquer ; sauvegarder les règles par export JSON est recommandé.

## Tests

Commandes : `node --test tests/test-core.cjs tests/test-settings.cjs`. La CI contrôle l'absence de dépendance externe, le moteur de conversion, la persistance et le repli sans stockage.

## Historique

La fonctionnalité « charger un fichier JS voisin au démarrage » (CLOR-MISSION-003) a été **retirée à la demande de Fab (12/10/2026)**, suite à un message dans la console Chrome en l'absence du fichier. Référence : CLOR-MISSION-004.

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

## Publication v0.1.1 — 12/10/2026 (CLOR-MISSION-007)

Fab demande de finaliser la **fusion et la release** de la version HTML autonome avec sa date et sa version à jour. Le code de `index.html` et l'interface affichent désormais `v0.1.1` ; l'en-tête contient la remarque datée du **12/10/2026**. Le logiciel reste mono-fichier, sans script externe obligatoire.

La publication est préparée avec `.github/workflows/release-v0.1.1.yml` (merge intitulé `Release CleanOR v0.1.1`), un fichier direct `CleanOR-v0.1.1.html` et les notes `docs/release-notes-v0.1.1.md`. Le nouveau tag, la page de release et le fichier téléchargeable doivent être **vérifiés après fusion** ; l'ancienne release v0.1.0 ne doit pas être modifiée.

**Publication v0.1.1 vérifiée le 12/10/2026 :** PR #3 fusionnée dans `main` au commit `ae4cc469d7899b2b80badf29fc0666a3761b2857`. [Page de release](https://github.com/greenpower2669/CleanOR/releases/tag/v0.1.1) ; [asset HTML direct](https://github.com/greenpower2669/CleanOR/releases/download/v0.1.1/CleanOR-v0.1.1.html) (21 272 octets). [Workflow GitHub Actions réussi](https://github.com/greenpower2669/CleanOR/actions/runs/38225731067), 16 tests / 16. SHA-256 calculé à la publication : `ae4ea1730a5446f947a759c9b597c55ca832e4fba4ee3c6ed9cb92515cb40cbc`. La release v0.1.0 reste intacte.


## Version v0.1.2 — séparateurs vers l'outil réseau (30/10/2026)

Dans CleanOR v0.1.2, la destination « outil opérateur réseau » transforme les retours à la ligne, tabulations, séparateurs de paragraphe et espaces Unicode en **un seul espace classique U+0020** par groupe. Le résultat est une **ligne unique**, sans fusion accidentelle des mots séparés. Cette transformation est appliquée même après les règles personnalisées et signalée dans le bilan de conversion.

Le sens inverse vers le CRM conserve les retours à la ligne classiques. Le changement est une **hypothèse à tester** : l'acceptation par l'outil de destination n'est pas démontrée. La fusion et la release v0.1.2 ont été **demandées explicitement** par Fab le 30/10/2026. Les anciennes releases v0.1.0 et v0.1.1 restent intactes. Vérifier séparément la CI, la fusion et la publication effectives.


## Publication effective v0.1.2 — 30/10/2026

La [PR #4](https://github.com/greenpower2669/CleanOR/pull/4) a été fusionnée, tag `v0.1.2` au commit `c952124550ad34e2caa3b5301b7a00f169b85bd4`. [Release publiée](https://github.com/greenpower2669/CleanOR/releases/tag/v0.1.2), [fichier direct CleanOR-v0.1.2.html](https://github.com/greenpower2669/CleanOR/releases/download/v0.1.2/CleanOR-v0.1.2.html) (**22 631 octets**), [CI de publication réussie](https://github.com/greenpower2669/CleanOR/actions/runs/41030253202) (21 tests réussis / 21). SHA-256 : `254536eb81a2b678d853278470485febf7723ed4f6f453953a728806b1268b6a`. Cette mise à jour documentaire après publication ne modifie pas l'asset de release ni le tag. Validation sur poste professionnel encore à réaliser.

## v0.1.3 — Essai des sauts de ligne LF (30/10/2026)
- **Version de test non fusionnée :** `feature/cleanor-lf-classique-v013`.
- **Fichier autonome :** [CleanOR-v0.1.3-essai.html](https://github.com/greenpower2669/CleanOR/blob/feature/cleanor-lf-classique-v013/dist/CleanOR-v0.1.3-essai.html), à enregistrer puis ouvrir localement sans réseau.
- Vers l'outil opérateur réseau, les retours de ligne hétérogènes (CR, CRLF, LF, U+2028/U+2029, NEL et séparateurs de contrôle verticaux) deviennent un unique LF classique `U+000A`, avec nettoyage des marques invisibles parasites et conversion des espaces Unicode horizontaux en espaces ordinaires. Les espaces et la mise en paragraphes sont conservés autant que possible.
- La direction inverse CRM, les profils personnalisés et le fonctionnement entièrement local restent présents.
- Les tests automatiques ne garantissent pas l'acceptation d'un formulaire externe. Fab devra vérifier le collage réel ; **aucune release v0.1.3 ni fusion main** pour l'instant. La release v0.1.2 demeure disponible pour repli.

### Correctif complémentaire v0.1.3 — reconstruction des espaces invisibles
Après l'audit, les séparateurs invisibles `U+200B` (espace sans largeur) et `U+2063` (séparateur invisible) sont désormais **reconstruits en SPACE ordinaire `U+0020`**, au lieu d'être simplement supprimés et de coller des mots. Les autres caractères de format invisibles restent retirés. Les sauts de ligne sont toujours reconstruits en **LF `U+000A`**.
Les espaces simples déjà légitimes et les multiples espaces ASCII sont conservés. Le HTML d'essai `dist/CleanOR-v0.1.3-essai.html` reste identique au fichier source `index.html`. [CI : 31/31 tests validés](https://github.com/greenpower2669/CleanOR/actions/runs/41034638189).
Version toujours **non fusionnée / non publiée** : le dernier fichier disponible dans les releases reste la v0.1.2.

## Publication v0.1.3 autorisée — 30 octobre 2026
Fab a demandé de fusionner et publier la version v0.1.3 après correction des séparateurs invisibles. Le HTML définitif indique `v0.1.3 — hors ligne`. Le fichier `CleanOR-v0.1.3.html` est préparé pour publication par GitHub Actions à partir de `index.html`, avec tests et notes `docs/release-notes-v0.1.3.md`. La release est à confirmer après fusion et exécution du workflow ; cela ne démontre pas l'acceptation des LF reconstruits dans SGE.

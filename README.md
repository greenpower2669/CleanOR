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

## Publication effective CleanOR v0.1.3 — 30 octobre 2026
- [PR #5 fusionnée](https://github.com/greenpower2669/CleanOR/pull/5), commit `402415dc06761c4d5750efb98b00dac6cfbd8b61` ; tag `v0.1.3` sur le même commit.
- [GitHub Release v0.1.3](https://github.com/greenpower2669/CleanOR/releases/tag/v0.1.3) ; [téléchargement HTML direct](https://github.com/greenpower2669/CleanOR/releases/download/v0.1.3/CleanOR-v0.1.3.html) (**23 921 octets**) ; [workflow réussi](https://github.com/greenpower2669/CleanOR/actions/runs/41035835101) : **31/31 tests**. SHA-256 : `3c2f8e6e510ac2ae4f029ab231df0c5bc23156c577abd997bc803226e7db016c`.
- Le fichier est autonome et sans dépendances externes. Les releases v0.1.0, v0.1.1 et v0.1.2 ne sont pas modifiées. L'acceptation par le formulaire métier SGE reste à confirmer avec cette v0.1.3.

## CleanOR v0.1.4 — Visualiseur de codes invisibles (essai, 30/10/2026)
- La conversion en direction de l'outil opérateur réseau reprend **exactement le moteur de v0.1.2**, avec production d'une seule ligne en remplaçant les sauts/séparateurs par des espaces ordinaires. La sortie v0.1.3 avec LF reconstruit reste dans l'historique, mais ne s'applique plus sur cette branche.
- Cliquer sur **❓ Aide**, puis sur **🔎 Afficher les caractères invisibles** : un panneau **intégré à la page** affiche le texte original annoté avec des marqueurs Unicode et les espaces ordinaires figurés par `·`. Aucun nouvel onglet ou autorisation popup.
- Le bouton **📋 Copier le rapport technique** copie uniquement noms des caractères, points de code Unicode, positions et fréquences, sans aucun contenu du texte source. Les textes restent traités hors ligne, sans collecte, et le panneau est vidé à la fermeture.
- Le diagnostic affiche au maximum 12 000 points de code Unicode et 350 marques spéciales à la fois ; un avertissement signale une analyse partielle au-delà.
- HTML autonome d'essai : [CleanOR-v0.1.4-essai.html](https://github.com/greenpower2669/CleanOR/blob/feature/cleanor-diagnostic-invisibles-v014/dist/CleanOR-v0.1.4-essai.html).
- La validation sur poste professionnel reste nécessaire. **Pas de merge `main` ni de GitHub Release v0.1.4** sans demande ultérieure de Fab.

## Avenant SpanPersoOr pour la v0.1.4

Le mode SpanPersoOr ajoute un contrôle des catégories Unicode, un choix de champ et la normalisation par espace ou suppression. Limites vérifiées dans le JS fourni : commentaires génériques 2047 unités UTF-16 et référence demandeur 150 unités. Aucun dépassement n'est tronqué automatiquement. Le panneau d'aide affiche toujours les codes invisibles, et l'ancienne conversion reste disponible en désactivant SpanPersoOr. Les tests locaux ne démontrent pas l'acceptation serveur SGE.

## Publication officielle v0.1.4 — 30 octobre 2026
- [PR #6 fusionnée](https://github.com/greenpower2669/CleanOR/pull/6) : commit `58506d3f48666afe7996c113aef18b6b099b6913`, tag `v0.1.4` au même SHA.
- [GitHub Release v0.1.4](https://github.com/greenpower2669/CleanOR/releases/tag/v0.1.4) ; [HTML autonome direct](https://github.com/greenpower2669/CleanOR/releases/download/v0.1.4/CleanOR-v0.1.4.html) (40 102 octets) ; [workflow réussi](https://github.com/greenpower2669/CleanOR/actions/runs/41048703313) avec **45 tests réussis / 45**.
- SHA-256 : `9ab013354c71488fc3c028c767971c8e620c122be032816d859c5440e8ce1b70`. Anciennes versions conservées. Contrôle SpanPersoOr JS et diagnostic Unicode disponibles ; la validation réelle par SGE reste à tester.


## CleanOR v0.1.5 — renommage SpanPersoOr (essai)
Toutes les mentions et les identifiants techniques de l'ancien libellé sont renommés **SpanPersoOr** dans l'application, les tests et la documentation active. Le comportement de contrôle Unicode et de nettoyage est inchangé. Branche `feature/cleanor-spanpersoor-v015`, sans merge ni nouvelle release avant accord explicite.

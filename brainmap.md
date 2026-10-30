# 🗺️ CleanOR — carte technique exhaustive V0.1

## 1 — Fichiers et dépendances
- **index.html** : unique application autonome ; balisage HTML sémantique, CSS interne responsive, JavaScript embarqué. Pas de chargements CDN, de serveur ni de package.
- **tests/test-core.cjs** : tests Node natifs ; extraction du bloc noyau entre marqueurs CORE_START/CORE_END, exécution via vm isolé et assertions.
- **.github/workflows/check.yml** : CI Node 22 sur branches de développement et PR, sans npm install.
- **README.md** : guide utilisateur, précautions liées aux encodages.
- **ordres-de-mission.md** : demandes de Fab (CLOR-MISSION-001, 002).
- **todo.md** : avancement technique, validations humaines, blocages.
- **brain.md** : comportement cible contractuel.
- **brainmap.md** : présente carte technique.
- **debughistorical.md** : diagnostics, hypothèses, statut de certitude.
- **LICENSE** : licence MIT héritée du dépôt.
- Aucun module externe, aucune API réseau ; APIs navigateur intégrées seulement.

## 2 — Interface DOM
- header : titre CleanOR, boutons **zoomOut**, **zoomIn**, **helpBtn**, **settingsBtn**.
- colonne source : **sourceLabel**, **sourceText**, **pasteBtn**, **importTextBtn**, **inputTextFile**, **clearBtn**.
- centre : **swapBtn** qui inverse la destination et utilise l'ancien résultat comme nouvelle source.
- colonne résultat : **targetLabel**, **resultText** readonly, **copyBtn**, **downloadBtn**.
- dessous : **convertBtn**, **mode** prudent/renforce, **report** (aria-live).
- section settings masquée : **inputEncoding** (fichier importé uniquement), **outputEncoding** (répertoire + fichier exporté), **repairUtf8**, **deniedChars**, **replacements**, **saveSettings**, **resetRules**, **exportRules**, **importRules**, **inputRulesFile**, **settingsStatus**.
- section help masquée : explication, limites de validation et conversion destructive.
- Interface grand format puis empilée sous 940px ; boutons 52px minimum, focus visible, zoom police 16 à 32px.

## 3 — Noyau global CleanORCore
Dans index.html, le bloc CORE_START/CORE_END est autonome et exposé à globalThis.CleanORCore pour pouvoir être testé sans DOM.

- **cp1252Special**, **reverse** : table de caractères imprimables Windows-1252 entre 0x80 et 0x9F.
- **defaults** : profils « crm » et « reseau », ce dernier ayant des remplacements typographiques initialisés.
- **cleanConfig(obj)** : sélectionne et borne les règles/chaînes importées ; limite 200 remplacements/profil, 32 caractères en source et 256 en sortie, 2000 caractères interdits.
- **defaultConfig()** : restitue une copie des profils initiaux.
- **byteFor(ch)** : résout l'octet Windows-1252 imprimable ou null.
- **canEncode(ch,encoding)** : vérifie qu'un caractère entre dans utf-8, windows-1252 ou ascii.
- **transliterate(t)** : ligatures et Unicode NFD pour ASCII (perte potentielle).
- **encodeText(t,encoding)** : TextEncoder pour UTF-8 ; octets manuels pour Windows-1252 et ASCII.
- **repairMojibake(t)** : interprète une chaîne comme caractères Windows-1252 puis décode les octets obtenus comme UTF-8 fatal ; conserve l'entrée en cas d'échec.
- **convert(input,options)** : sélectionne profil/mode/encodage, répare si demandé ; NFC, CRLF/CR vers LF, espaces non sécables vers espaces ; retire contrôles et caractères de format invisibles ; applique règles ordonnées par destination ; retire caractères refusés ; translittère si ASCII ; remplace « ? » ou retire les caractères incompatibles selon mode ; retourne {text,changes,removed,unsupported,target,encoding}.

## 4 — Module d'interface IIFE et flux
- Sélecteur **$** : getElementById.
- État **dir** (destination reseau/crm), **config** (profils), **fontSize** (zoom).
- **status(msg,warn)** : message lisible, warning textuel.
- **profileName**, **setLabels**, **renderSettings** : vues dépendantes de la direction.
- **parseRules** : une ligne « source => cible », rejette règle mal formée, plus de 200 règles ou tailles anormales.
- **saveSettings** : met à jour profil cible, écrit éventuellement localStorage (clé cleanor-settings-v1) ; n'enregistre jamais le texte.
- **process** : sourceText + options + config → CleanORCore.convert → resultText et report.
- **copyResult** : navigator.clipboard.writeText puis repli document.execCommand et Ctrl+C.
- **download** : Blob → URL locale → téléchargement, révocation URL temporaire.
- **toggle** : panneau d'aide/réglages + aria-expanded.
- Listeners : saisie, mode, encodage de sortie, réparation → process. Inversion → nouvelle destination + résultat antérieur comme source → process. Fichier source → File.arrayBuffer + TextDecoder avec encodage d'entrée. Export → encodeText + Blob. Import profil → JSON.parse + cleanConfig ; export profil → JSON + TextEncoder.

## 5 — Dépendances logiques et sécurité
- **Texte collé** → sourceText Unicode → process → noyau convert → résultat Unicode → clipboard Unicode.
- **Fichier .txt** → décodage TextDecoder configurable → même noyau → sortie → encodeText + Blob selon encodage choisi.
- **Direction inversée** → profil de l'autre destination → transformation ; **pas de reconstitution de caractères perdus**.
- **Config importée** → validate/cleanConfig → profils → règles de conversion ; rendu uniquement via textContent/value pour éviter injection DOM.
- **localStorage** contient profils uniquement ; fichiers de texte jusqu'à 5 Mio, JSON règles jusqu'à 200 Kio.
- **CLOR-OBS-001/002 :** règles métier et cause de points d'interrogation après sauvegarde inconnues, à tester.
- **CLOR-TEST-001 :** tests unitaires Node et CI ne valident pas politique clipboard, intranet ni acceptation de formulaire.

## 6 — CLOR-MISSION-004 : suppression du chargement externe

- **index.html :** un unique script interne incluant CORE_START/CORE_END + le module IIFE de l'interface. Aucune balise script avec src, aucune requête fetch ni chargement de fichier adjacent.
- **Démarrage de l'interface :** `core=globalThis.CleanORCore`, `config=core.defaultConfig()`; tentative localStorage.getItem("cleanor-settings-v1"), validation avec `cleanConfig(saved)`. En cas de stockage inaccessible, conserver les valeurs d'origine.
- **saveSettings :** écrit les règles configurées en localStorage si autorisé, avec message non bloquant en cas d'échec ; `resetRules` restaure les valeurs d'origine et tente removeItem.
- **exportRules :** sérialise {format:"CleanOR-rules-v1",profiles:config} en JSON avec Blob ; importRules lit un fichier JSON sélectionné manuellement, applique `cleanConfig` et tente d'enregistrer les règles.
- **Supprimés :** exportAutoload, configOrigin, invalidDiskBackup, globalThis.CleanORBackup, script src CleanOR-sauvegarde.js, traitements et messages afférents.
- **tests/test-settings.cjs :** VM Node simulant DOM et localStorage : présence d'un seul script intégré, fallback si stockage indisponible, paramètres d'origine, restauration depuis localStorage, boutons JSON.
- **tests/test-core.cjs :** assert qu'aucune balise script externe, aucune feuille de style externe, aucun CDN n'est chargé ; conserve les tests de conversion d'encodage.
- **.github/workflows/check.yml :** exécute les deux suites : test-core.cjs et test-settings.cjs.
- **tests/test-autoload.cjs :** ancien test supprimé avec la fonctionnalité ; son ancien rôle reste conservé dans le journal historique. `.gitignore` conserve les motifs de fichiers potentiellement sensibles pour prévenir une publication accidentelle de vieilles sauvegardes privées.

## 7 — Livraison GitHub v0.1.0 (CLOR-MISSION-005)

- **.github/workflows/release-v0.1.0.yml** : workflow de publication ponctuel `push` sur `main`, condition strictement liée au titre du commit de fusion `Release CleanOR v0.1.0`. D'autres pushes sur main ne doivent pas déclencher de nouvelle publication.
- **Séquence du job release :** checkout du commit fusionné → Node.js 22 → tests unitaires test-core + test-settings → contrôle du seul HTML sans scripts/feuilles externes → copie de index.html vers dist/CleanOR-v0.1.0.html → SHA-256 du fichier → commande `gh release create` créant le tag v0.1.0 pointant vers le SHA fusionné, avec asset HTML et notes.
- **Permissions :** `contents: read` au niveau du workflow ; `contents: write` uniquement sur le job de release, via GITHUB_TOKEN. Pas de secret métier.
- **Idempotence :** si la release v0.1.0 existe déjà, la publication est ignorée. Le workflow ne doit pas republier automatiquement de futures versions.
- **docs/release-notes-v0.1.0.md** : notes intégrées à la page GitHub Release ; aucun nom d'outil professionnel ni donnée client.
- **Distinction :** CI verte ≠ publication ; sans release/tag/asset vérifiés, conserver CLOR-MISSION-005 ouverte. Tester file:// sur poste réel demeure séparé du packaging.

### Références effectives de production de v0.1.0 (12/10/2026)

- PR #1 fusionnée : https://github.com/greenpower2669/CleanOR/pull/1
- Commit/tag v0.1.0 : `385ff61c2d0150a9afc849ca6e2a6fdbf36dffe1` ; code HTML distribué = copie de `index.html` de ce commit.
- Workflow effectif : https://github.com/greenpower2669/CleanOR/actions/runs/38219223243 (success) ; Node : 15/15 tests ; génération de `dist/CleanOR-v0.1.0.html`, SHA-256 vérifié.
- Release publique : https://github.com/greenpower2669/CleanOR/releases/tag/v0.1.0 ; asset direct : https://github.com/greenpower2669/CleanOR/releases/download/v0.1.0/CleanOR-v0.1.0.html.
- Cette mise à jour documentaire post-publication ne change ni le tag ni les octets du programme livré.

## 8 — CLOR-MISSION-006 : traçabilité date/version sans changement d'exécution
- `index.html` → commentaire HTML dans `<head>` : version v0.1.0, date de révision 12/10/2026, distribution autonome sans `.js` annexe ; aucun nouveau module ni script chargé.
- `tests/test-core.cjs` → vérifie la présence de la remarque et l'absence des balises de dépendance externe, en plus des vérifications de conversion existantes.
- `README.md`, `todo.md`, `brain.md`, `ordres-de-mission.md` → documentation synchronisée au changement de source ; `debughistorical.md` consulté, inchangé car aucune nouvelle preuve de cause ni correction de bug.
- GitHub Release v0.1.0 reste immuable ; `main` peut contenir des améliorations documentaires sans que l'asset tagué ait changé.

## 9 — CLOR-MISSION-007 : release datée v0.1.1

- `index.html` : remarque HTML `v0.1.1`, date `12/10/2026` ; badge visible `v0.1.1 — hors ligne`. Module de conversion inchangé.
- `tests/test-core.cjs` : assertions de synchronisation remarque, date, badge et absence de balise script/style externe ; `tests/test-settings.cjs` : tests du fallback stockage.
- `.github/workflows/release-v0.1.1.yml` : déclenché uniquement par un push main dont le message de commit commence par `Release CleanOR v0.1.1`. Exécute les deux suites de tests ; copie `index.html` en `dist/CleanOR-v0.1.1.html`, calcule SHA-256, puis crée le tag et GitHub Release avec asset téléchargeable. Ne modifie pas la release historique v0.1.0.
- `docs/release-notes-v0.1.1.md` : notes de publication et limites de validation ; aucune nouvelle bibliothèque.
- `ordres-de-mission.md`, `todo.md`, `brain.md`, `brainmap.md`, `debughistorical.md` : mémoires synchronisées avec le code et preuves à compléter sur main après publication.

### Preuves de distribution de v0.1.1 (12/10/2026)

- PR #3 fusionnée : https://github.com/greenpower2669/CleanOR/pull/3 ; merge/tag `v0.1.1` : `ae4cc469d7899b2b80badf29fc0666a3761b2857`.
- Publication par GitHub Actions : https://github.com/greenpower2669/CleanOR/actions/runs/38225731067 — 16 tests réussis, asset produit depuis `index.html` du commit fusionné.
- Asset HTML (21 272 octets) : https://github.com/greenpower2669/CleanOR/releases/download/v0.1.1/CleanOR-v0.1.1.html, SHA-256 généré lors de la construction : `ae4ea1730a5446f947a759c9b597c55ca832e4fba4ee3c6ed9cb92515cb40cbc`.
- Release publique : https://github.com/greenpower2669/CleanOR/releases/tag/v0.1.1. `v0.1.0` reste disponible ; les modifications documentaires postérieures ne réécrivent ni les tags ni leurs fichiers HTML.


## 10 — CLOR-MISSION-008 : normalisation des séparateurs vers le réseau (30/10/2026)
- `CleanORCore.convert` dans `index.html` : en cible `reseau`, remplacer les **séquences** CR, LF, CRLF, TAB, NEL, séparateurs Unicode U+2028/U+2029/U+200B, espaces Unicode et séparateurs de contrôle par un espace U+0020 ; retirer les espaces au bord, compter les groupes convertis dans `separatorsNormalized`.
- Faire cette normalisation après les `p.rules` personnalisées, avant la boucle d'encodage ; préserver le profil `crm` multiligne. Les invisibles non séparateurs restent retirés.
- `tests/test-core.cjs` : couverture exhaustive des familles de séparateurs, séries répétées, règles personnalisées, sortie ASCII/Windows-1252 et non-régression CRM.
- `index.html` : aide et compte rendu adaptés. État : préparation **v0.1.2** depuis la branche `feature/cleanor-separateurs-ascii-v012` ; fusion et release explicitement demandées par Fab le 30/10/2026. `release-v0.1.2.yml` publie une fois après un commit de merge `Release CleanOR v0.1.2`, avec asset HTML versionné et SHA-256 ; ne déclarer la publication qu'après contrôle GitHub. Tests métier sur poste externe à réaliser.


## 11 — Vérifications de fusion et publication CLOR-MISSION-008
- [PR #4](https://github.com/greenpower2669/CleanOR/pull/4) fusionnée, SHA `c952124550ad34e2caa3b5301b7a00f169b85bd4`, `main` et tag `v0.1.2` au moment de la publication.
- [GitHub Release](https://github.com/greenpower2669/CleanOR/releases/tag/v0.1.2) et [HTML direct](https://github.com/greenpower2669/CleanOR/releases/download/v0.1.2/CleanOR-v0.1.2.html) (22 631 octets) ; [workflow](https://github.com/greenpower2669/CleanOR/actions/runs/41030253202) réussi, 21/21 tests.
- Empreinte SHA-256 du fichier produit : `254536eb81a2b678d853278470485febf7723ed4f6f453953a728806b1268b6a`.
- Mise à jour documentaire post-release uniquement ; fichier publié conservé. Confirmation métier extérieure toujours en attente.

## 12 — CLOR-MISSION-009 : normalisation des retours en LF (30/10/2026)
- `index.html`, noyau `CleanORCore.convert` : profil `reseau` → retirer les marques invisibles/contrôles non structurants, puis remplacer toute série de fins de ligne CRLF, CR, LF, VT, FF, NEL, séparateurs U+001C–U+001E, U+2028/U+2029, et espaces horizontaux adjacents, par **un unique U+000A** ; convertir séparément les espaces horizontaux inhabituels en U+0020. Les retours LF simples restent inchangés.
- L'ordre garantit qu'une règle utilisateur ne réintroduit ni fin de ligne exotique ni caractère invisible. Le profil `crm` historique reste distinct. `separatorsNormalized` compte les groupes de fins de lignes modifiés et le compte rendu parle de LF, non d'espaces.
- `tests/test-core.cjs` : fins de lignes et encodages, invisibles autour des frontières, suppression de contrôles, espaces visibles, caractères accentués, idempotence et profil CRM ; `tests/test-settings.cjs` inchangé.
- Fichier autonome d'essai `dist/CleanOR-v0.1.3-essai.html`, identique au `index.html` de la branche `feature/cleanor-lf-classique-v013` ; pas de fusion `main` ni release sans validation. Les anciennes releases restent intouchées.

### CLOR-MISSION-009 — Correctif des espaces invisibles (30/10/2026)
- Dans `index.html`, cible `reseau`, **exclure `U+200B` et `U+2063` du nettoyage des marques de format** pour les traiter comme des espaces horizontaux. Inclure ces deux codes dans les séparateurs adjacents aux fins de ligne, pour conserver un unique LF sans blanc.
- Puis remplacer les suites mixtes espaces normaux + espaces horizontaux Unicode/invisibles par un unique SPACE `U+0020`; ne pas modifier les suites composées uniquement d'espaces `U+0020`. Les autres marques de format sont retirées.
- `dist/CleanOR-v0.1.3-essai.html` est synchronisé à `index.html` ; test de stricte identité dans `tests/test-core.cjs`. La branche de test reste `feature/cleanor-lf-classique-v013`, PR #5 brouillon, aucun merge/release.
- [CI du correctif 31/31](https://github.com/greenpower2669/CleanOR/actions/runs/41034638189), ensuite validation réelle dans l'outil métier.

## 13 — Release v0.1.3 autorisée par Fab (30/10/2026)
- Autorisation explicite après PR #5 et correction des séparateurs invisibles : fusion `feature/cleanor-lf-classique-v013` → `main`, puis publication v0.1.3.
- `.github/workflows/release-v0.1.3.yml` déclenché sur `main` par le titre `Release CleanOR v0.1.3`, tests Node.js et contrôle d'autonomie, asset `CleanOR-v0.1.3.html` construit depuis `index.html`, release GitHub.
- Notes dans `docs/release-notes-v0.1.3.md`. Ne déclarer publication qu'après vérification tag, asset et CI, et poursuivre validation réelle sur SGE.

## 14 — CLOR-DEL-006 : livraison v0.1.3 validée sur GitHub
- [PR #5](https://github.com/greenpower2669/CleanOR/pull/5) fusionnée, commit `402415dc06761c4d5750efb98b00dac6cfbd8b61` ; tag `v0.1.3` au même SHA.
- [Release v0.1.3](https://github.com/greenpower2669/CleanOR/releases/tag/v0.1.3), [asset direct](https://github.com/greenpower2669/CleanOR/releases/download/v0.1.3/CleanOR-v0.1.3.html) (**23 921 octets**) ; [CI release](https://github.com/greenpower2669/CleanOR/actions/runs/41035835101) avec **31 tests réussis / 31**, 0 échec, SHA-256 `3c2f8e6e510ac2ae4f029ab231df0c5bc23156c577abd997bc803226e7db016c`.
- Mise à jour documentaire post-release uniquement. Validation d'acceptation réelle du LF reconstruit par SGE ouverte. Anciennes versions conservées.

## 15 — CLOR-MISSION-010 : diagnostic de caractères invisibles (30/10/2026)
- `index.html` `CleanORCore.convert` **restauré directement depuis le tag v0.1.2**, avec CR/LF/Unicode spéciaux remplacés par SPACE U+0020 en destination réseau. Ne pas relancer l'essai LF de v0.1.3 sans demande.
- `CleanORCore.inspectInvisible` : analyse Unicode non destructive du texte source brut, retourne fragments sûrs pour DOM, marqueurs [type + code U+XXXX], indices 1-based en points de code, fréquences et `truncated`. `diagnosticReport` n'émet que les codes et statistiques ; pas de contenu métier. Limites 12 000 caractères analysés / 350 codes invisibles affichés par défaut.
- Aide ❓ : contrôle `diagnosticToggle`, panneau interne `diagnosticPanel`, `diagnosticView` alimenté par nœuds texte/DOM, rapport copiable `diagnosticReport`, boutons Copier/Fermer ; nettoyage à la fermeture. Aucun appel externe.
- Tests `tests/test-core.cjs` et `tests/test-settings.cjs` : non-régression v0.1.2, inspection Unicode, positions emoji, rapport sans secrets, limites, rendu HTML sans injection, cycle de vie. Distribution `dist/CleanOR-v0.1.4-essai.html` strictement égale au HTML source.
- Développement `feature/cleanor-diagnostic-invisibles-v014` ; `main` reste v0.1.3 tant qu'aucun merge/release n'est demandé.

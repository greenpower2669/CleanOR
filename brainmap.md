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

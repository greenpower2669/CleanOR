# 🧠 CleanOR — contrat fonctionnel vivant

Version candidate v0.1.0, fusion/release autorisées le 12/10/2026 (CLOR-MISSION-005) · Missions : CLOR-MISSION-001 à 005.

## Comportement attendu et implémenté

- Exécution intégralement locale à partir d'un **unique index.html**, sans réseau ni bibliothèque externe.
- Interface avec zone source, zone résultat en lecture seule, bouton central ⇄ (reprend le résultat comme nouvelle entrée en inversant la destination), bouton convertir, copier, coller, effacer, import et export texte.
- Noms génériques uniquement : **CRM** et **outil opérateur réseau**.
- Mode prudent : caractères incompatibles remplacés visiblement par **?** ; mode renforcé : caractères incompatibles supprimés ; conserver au mieux les accents.
- Normalisation NFC et des fins de lignes, espaces insécables ordinaires convertis en espaces, contrôles et marques Unicode invisibles supprimés.
- Profil spécifique à chaque destination ; profil opérateur par défaut avec substitutions courantes (tirets, guillemets courbes, ellipses, puces) ; profil CRM initial conservateur.
- Règles par destination : liste de caractères interdits, remplacements personnalisés au format « source => remplacement », maximum 200, import/export des deux profils via JSON.
- Réglages conservés dans localStorage si autorisé ; **jamais les textes professionnels**. Aucun serveur ou tracking.
- Encodage d'un fichier d'entrée : UTF-8, Windows-1252 ou ISO-8859-1 (alias Windows-1252 dans les navigateurs). Un collage est déjà Unicode et ne peut pas être recodé au niveau des octets.
- Sortie : répertoire compatible UTF-8, Windows-1252 ou ASCII, avec export binaire véritable en fichier .txt ; presse-papiers toujours Unicode.
- Option explicite de réparation de l'erreur « UTF-8 lu comme Windows-1252 » (ne jamais présumer qu'elle est souhaitable).
- Accessibilité : grands boutons, police agrandissable, focus visible, retours textuels et aides. Les permissions de presse-papiers peuvent imposer Ctrl+C / Ctrl+V.

## Limites contractuelles

- **CLOR-OBS-001 :** aucune liste officielle de caractères refusés par l'outil métier n'a été fournie. Les résultats constituent un prétraitement configurable, pas une garantie d'acceptation.
- **CLOR-OBS-002 :** les points d'interrogation observés après enregistrement côté application externe ne prouvent pas la cause (encodage, serveur, stockage ou lecture).
- **CLOR-TEST-001 :** essai sur le poste professionnel et validation après enregistrement restent à réaliser.
- La suppression et certaines translittérations sont irréversibles : **vérifier le texte avant émission**.

## CLOR-MISSION-004 — Pas de lecture du répertoire local au démarrage

- Fab a retiré l'ancien besoin CLOR-MISSION-003 : aucune tentative de charger un fichier optionnel à côté de index.html, même absent. L'application demeure **un seul fichier HTML autonome**, sans chargement de script externe, réseau ou fichier local voisin.
- Au démarrage : profils par défaut, puis tentative d'obtenir les profils de règles dans localStorage (uniquement les règles, pas les textes collés). Si indisponible ou invalide : réglages par défaut, sans bloquer l'application.
- Les boutons d'import/export **JSON manuels** restent fonctionnels. Suppression du bouton d'export de sauvegarde automatique en .js et de son chargeur. Le système ne crée aucun fichier automatique.
- En environnement d'entreprise, tester avec le protocole file:// ; aucune erreur « fichier JS voisin absent » ne doit plus être émise par CleanOR.
- CLOR-MISSION-003 est historique, explicitement abandonnée sur demande du 12/10/2026 ; conserver la trace dans ordres-de-mission.md et debughistorical.md.

## CLOR-MISSION-005 — Contrat de livraison v0.1.0

- Fab autorise désormais explicitement la fusion de la branche CleanOR et une GitHub Release v0.1.0.
- La distribution est le **fichier HTML autonome versionné CleanOR-v0.1.0.html**, identique au contenu de index.html sur le commit fusionné ; pas de dépendance externe, pas d'APK ni AAB (application HTML locale).
- La release comporte une page GitHub et un asset direct, produits par workflow ponctuel seulement après 15 tests automatiques réussis et vérification d'absence de scripts/liens externes.
- La mise à jour de la branche main, la création du tag et la présence de l'asset sont des **étapes à vérifier** et non des faits accomplis tant que les outils ne le confirment pas.
- Test d'intégration Chrome sur poste intranet toujours à faire par Fab, sans affirmation de validation métier.

### CLOR-MISSION-005 — Publication vérifiée (12/10/2026)

- **main et tag v0.1.0** pointent sur le commit de fusion `385ff61c2d0150a9afc849ca6e2a6fdbf36dffe1` au moment de la release.
- GitHub Release publique : https://github.com/greenpower2669/CleanOR/releases/tag/v0.1.0
- Asset HTML : https://github.com/greenpower2669/CleanOR/releases/download/v0.1.0/CleanOR-v0.1.0.html (21015 octets, SHA-256 `4b17d9ef200c85f131055551eb0653f4ff2497682ac235818074c0810d3e7ce3`).
- Publication contrôlée par CI : https://github.com/greenpower2669/CleanOR/actions/runs/38219223243 (15 tests réussis, 0 échec). Usage Chrome sur poste professionnel non validé par ces seuls tests.

## CLOR-MISSION-006 — Remarque de version dans la source (12/10/2026)
- Le HTML autonome de `main` contient un commentaire d'en-tête lisible en code source : version de référence `v0.1.0` et date de révision documentaire `12/10/2026`.
- L'unique application reste `index.html`, sans fichier `.js` ni autre pièce annexe au démarrage ; la sauvegarde JSON reste importable/exportable manuellement.
- La GitHub Release `v0.1.0` reste attachée au commit historique et son asset est conservé ; la mise à jour d'une remarque sur `main` ne modifie ni le tag ni le binaire HTML déjà publié.

## CLOR-MISSION-007 — Version de distribution v0.1.1 (12/10/2026)

- Le contenu distribuable reste **un seul fichier HTML**, contenant CSS et JavaScript intégrés, sans ressource externe.
- Le commentaire HTML mentionne **v0.1.1** et **12/10/2026** ; le libellé de l'application affiche **v0.1.1 — hors ligne**.
- La release v0.1.1 est autorisée par Fab ; une publication distincte de v0.1.0, à produire et vérifier avec un asset direct `CleanOR-v0.1.1.html`. Ne pas remplacer rétroactivement v0.1.0.
- Aucune modification du moteur de conversion. Les essais sur le navigateur professionnel restent une exigence de validation indépendante.

### CLOR-MISSION-007 — Publication v0.1.1 confirmée

- [GitHub Release v0.1.1](https://github.com/greenpower2669/CleanOR/releases/tag/v0.1.1) et [fichier HTML `CleanOR-v0.1.1.html`](https://github.com/greenpower2669/CleanOR/releases/download/v0.1.1/CleanOR-v0.1.1.html) effectivement présents (21 272 octets).
- Tag `v0.1.1` sur le commit fusionné `ae4cc469d7899b2b80badf29fc0666a3761b2857`. GitHub Actions [run 38225731067](https://github.com/greenpower2669/CleanOR/actions/runs/38225731067) : **success**, 16 tests réussis, 0 échec, SHA-256 `ae4ea1730a5446f947a759c9b597c55ca832e4fba4ee3c6ed9cb92515cb40cbc`.
- Fonctionnement vérifié automatiquement ; Chrome en environnement professionnel et rejet de champs des outils métiers toujours à valider par Fab.


## CLOR-MISSION-008 — Profil réseau, sortie sur une ligne (30/10/2026)
- Le profil **réseau** convertit tous les retours à la ligne et séparateurs d'espacement reconnus (dont CR, LF, CRLF, TAB, NEL U+0085, U+2028, U+2029, U+200B, espaces Unicode) en **un espace ASCII U+0020**, en fusionnant les suites et retirant les espaces périphériques. Ne jamais concaténer deux mots en supprimant un séparateur.
- Cette règle s'applique **après les remplacements personnalisés** afin qu'ils ne réintroduisent pas de retours à la ligne, quel que soit le mode prudent/renforcé et l'encodage choisi.
- Le profil de destination **CRM** conserve le traitement historique des fins de lignes (CRLF/CR vers LF), sans imposer de texte monoligne.
- Le compte rendu présente le nombre de groupes de séparateurs normalisés, sans stocker les textes. La normalisation ne prouve pas la compatibilité avec les validations métiers : essai sur poste réel requis.
- Version préparée : **v0.1.2** ; Fab a explicitement autorisé **merge et release** le 30/10/2026. La publication doit être vérifiée après CI, fusion et exécution du workflow dédié.

## CLOR-DEL-005 — Publication effective de CleanOR v0.1.2 (30/10/2026)
- **Autorisation :** Fab a demandé la fusion et la release.
- **Fusion :** PR #4, commit `c952124550ad34e2caa3b5301b7a00f169b85bd4`, branche `main` ; tag `v0.1.2` sur le même commit.
- **GitHub Actions :** [publication v0.1.2](https://github.com/greenpower2669/CleanOR/actions/runs/41030253202) : succès, **21/21 tests**, aucun échec.
- **Release :** [v0.1.2](https://github.com/greenpower2669/CleanOR/releases/tag/v0.1.2) ; [HTML autonome direct](https://github.com/greenpower2669/CleanOR/releases/download/v0.1.2/CleanOR-v0.1.2.html) (**22 631 octets**).
- **SHA-256 de construction :** `254536eb81a2b678d853278470485febf7723ed4f6f453953a728806b1268b6a`.
- **Réserve métier :** l'acceptation des saisies dans l'outil opérateur réseau n'a pas été testée ; ne pas l'affirmer. Releases v0.1.0/v0.1.1 inchangées.

## CLOR-MISSION-009 — LF classique en sortie réseau, v0.1.3 essai (30/10/2026)
- Retour de Fab : v0.1.2 est accepté par le système de destination ; un saut de ligne ajouté directement dans ce système est aussi accepté. L'origine exacte du rejet initial reste **inconnue** et n'a pas besoin d'être prouvée avant l'essai.
- Pour la destination réseau uniquement, les séparateurs verticaux deviennent **un seul LF U+000A** par groupe ; les marques de format invisibles et contrôles parasites sont retirés ; tabulations et espaces Unicode horizontaux deviennent des espaces simples. Les espaces ordinaires entre mots et les lignes existantes sont conservés autant que possible.
- Les règles personnalisées s'appliquent avant la normalisation ; le sens inverse CRM conserve le traitement précédent. Le presse-papiers copie toujours du texte Unicode, sans changement d'encodage binaire.
- Distribution autonome : `dist/CleanOR-v0.1.3-essai.html` sur la branche `feature/cleanor-lf-classique-v013`. Aucun serveur, dépendance externe ou sauvegarde des textes.
- **Statut :** essai technique hors `main` et sans nouvelle release ; compatibilité métier du LF reconstruit à valider par Fab.

### CLOR-MISSION-009 — Précision sur les caractères invisibles horizontaux
- `U+200B` (zero-width space) et `U+2063` (invisible separator) sont **des séparateurs**, non des marques à effacer : restituer **SPACE U+0020** en sortie réseau. Les espaces Unicode horizontaux et les tabulations passent aussi à SPACE.
- Les marques invisibles non séparatrices `U+200C`, `U+200D`, `U+2060`, etc. sont retirées sans introduire d'espace. Les fins de ligne hétérogènes restent normalisées en **LF U+000A** ; absorber les espaces invisibles adjacents aux lignes pour éviter d'ajouter un blanc parasite.
- Préserver les espaces ASCII multiples déjà valides. Corriger après les règles configurées, de manière à empêcher leur réintroduction.
- Tests CI du correctif : [31/31, aucun échec](https://github.com/greenpower2669/CleanOR/actions/runs/41034638189). Version d'essai `v0.1.3` sur `feature/cleanor-lf-classique-v013`, PR #5 brouillon ; sans merge ni release.

## CLOR-MISSION-009 — Autorisation de fusion et release v0.1.3 (30/10/2026)
- Fab a explicitement demandé « Merge release » après livraison et contrôle du correctif U+200B/U+2063. Fusion de la PR #5 et publication v0.1.3 autorisées, sous condition de vérifier la CI, la fusion et la release effectives.
- Version finalisée affichée : `v0.1.3 — hors ligne`. `index.html` et la copie d'essai `dist/CleanOR-v0.1.3-essai.html` sont synchronisés ; asset public prévu : `CleanOR-v0.1.3.html` produit directement depuis `index.html`.
- Publication via `.github/workflows/release-v0.1.3.yml`, au commit de fusion dont le titre commence par `Release CleanOR v0.1.3`. Les releases précédentes doivent être conservées, et le test métier de la v0.1.3 demeure ouvert.

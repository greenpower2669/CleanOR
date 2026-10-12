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

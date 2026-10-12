# 🔎 CleanOR — historique des observations et diagnostics

## CLOR-OBS-001 — Refus de caractères spéciaux
- **Signalement :** Fab, 9 octobre 2026 : certains textes collés depuis le CRM sont rejetés par l'outil opérateur réseau au motif de « caractères spéciaux ». Les symboles responsables peuvent être invisibles ou difficiles à identifier, et le nettoyage manuel prend un temps important.
- **Établi :** message de refus rapporté, mais ni exemple brut minimal ni liste officielle de caractères interdits communiqués.
- **Hypothèses non démontrées :** caractères invisibles, espaces non sécables, ponctuation Unicode ou validation de champ côté serveur. Ce sont des hypothèses, non une preuve de cause.
- **Prétraitement prévu :** NFC, contrôles et formatage invisible, ponctuation configurable, liste manuelle de rejets.
- **Prochaine vérification :** échantillon anonymisé rejeté, comparaison exacte du code point et du champ en échec. Aucun nom ou donnée client à consigner dans Git.
- **Statut :** problème métier signalé ; cause précise ouverte.

## CLOR-OBS-002 — Texte devenu '?' après enregistrement
- **Signalement :** ponctuation ou lettres parfois rendues comme « ? » lors de la relecture dans une application externe, alors que la saisie semblait visuellement bonne.
- **Hypothèses non démontrées :** conversion d'encodage, stockage, transformation serveur, limitation de police ou de rendu. Impossible d'en déduire à distance l'origine.
- **Mesures :** distinguer Unicode du presse-papiers et encodages de fichiers, ajouter export Windows-1252 réel, rapporter les caractères non représentables.
- **Prochaine vérification :** essai aller-retour anonyme avant/après validation de formulaire avec accents, guillemets et signes inconnus.
- **Statut :** observations utilisateur ; cause indéterminée.

## CLOR-TEST-001 — Qualité technique
- **Tests implémentés :** fichiers HTML autonomes et labels génériques, accents, Unicode invisible, profils, règles, sorties UTF-8/Windows-1252/ASCII, traitement des emojis, réparation volontaire et filtrage de JSON.
- **À contrôler :** résultat de GitHub Actions et test du fonctionnement des boutons dans un navigateur réel hors ligne, conformément aux règles du poste intranet ; import/export de fichiers.
- **Limite :** succès de tests unitaires ne signifie pas compatibilité avec les règles propriétaires de validation.

## CLOR-TEST-002 — Chargement automatique sans clic

- **Besoin Fab :** restaurer automatiquement les règles d'une sauvegarde présente dans le même dossier que la page.
- **Contrainte technique :** fetch d'un JSON voisin sous file:// généralement interdit par la politique d'origine des navigateurs ; balise script facultative de données JS pour l'amorçage.
- **Prévention des régressions :** conserver l'import/export JSON manuel, les réglages localStorage et les défauts en repli ; afficher priorité et provenance.
- **Tests automatisés ajoutés :** tests/test-autoload.cjs (chargement synchrone simulé, priorité, absence, invalidité, présence du bouton), tests/test-core.cjs (une seule ressource locale autorisée, aucun CDN).
- **À valider sur machine :** ouverture locale, mise en place CleanOR-sauvegarde.js, redémarrage, sauvegarde absente, remplacement par version actualisée. CI Node ne démontre pas les permissions file:// sur poste professionnel.
- **Sécurité :** ne jamais déposer de JavaScript de provenance inconnue à côté du HTML.

- **CLOR-TEST-002 — couverture CI :** premier workflow CI après ajout des tests de restauration a réussi mais n'exécutait que tests/test-core.cjs (10/10) ; omission du nouveau test-autoload.cjs identifiée. Correction : appeler explicitement les deux scripts de tests. Recontrôler 15 tests avant de qualifier la CI complète.

- **Vérification CI complète :** run 37926758153, 15 tests passés sur 15, aucun échec (commit 9d41f0233ad4c8a33715bfc608436e766edccbd3). Les essais file:// sur poste utilisateur restent à faire.

## CLOR-OBS-003 — Message console Chrome lors du lancement sans sauvegarde (12/10/2026)

- **Observation :** Fab fournit une capture de DevTools et confirme qu'aucun fichier de sauvegarde n'est présent à côté du fichier HTML. Le texte complet de l'erreur n'est pas visible sur la photo.
- **Cause de conception vérifiée :** le HTML incluait une balise script src pointant systématiquement vers un fichier JS optionnel, même lorsqu'absent. Ce chemin suffit à déclencher une tentative de lecture et peut générer un message de console sur file:// ; son lien précis avec l'erreur photographiée reste probable, faute de message complet.
- **Décision de Fab :** ne pas utiliser cette méthode ; retirer la lecture du fichier voisin, le bouton d'export associé et tout code de restauration de cette source (CLOR-MISSION-004). L'objectif initial CLOR-MISSION-003 est explicitement retiré, sans effacer son historique.
- **Correctif :** une seule page HTML contenant les scripts en ligne, réglages localStorage et import/export JSON manuel préservés ; assertions de non-chargement externe et cas de repli dans tests/test-settings.cjs.
- **Vérification :** CI puis essai sur poste Chrome de Fab. Ne pas déclarer disparues d'autres erreurs éventuelles en l'absence d'un test utilisateur.

## CLOR-DEL-001 — Prévention des annonces de release non vérifiées (12/10/2026)

- Demande Fab CLOR-MISSION-005 : fusion et GitHub Release de la version corrigée.
- Préparation du workflow de publication conditionnel à un commit de fusion nommé `Release CleanOR v0.1.0` ; tests automatiques et contrôle de l'autonomie avant mise en ligne. La publication et le tag sont **non prouvés avant résultat du job**.
- Suivre séparément SHA fusionné, succès du workflow, page release et asset direct ; un build vert sur branche seule ne constitue pas une release.
- Ne pas confondre correction du chargement du fichier absent (testée en CI) et disparition de toute erreur sur le poste de Fab (non démontrée).

## CLOR-DEL-002 — Résultat vérifié de la publication (12/10/2026)

- **Constats GitHub** : PR #1 fusionnée en `385ff61c2d0150a9afc849ca6e2a6fdbf36dffe1` ; tag v0.1.0 identique à ce commit ; workflow release 38219223243 réussi, 15 tests passés et 0 échec.
- **Asset public constaté** : CleanOR-v0.1.0.html (21015 octets) ; SHA-256 `4b17d9ef200c85f131055551eb0653f4ff2497682ac235818074c0810d3e7ce3` ; page GitHub https://github.com/greenpower2669/CleanOR/releases/tag/v0.1.0.
- **Réserve** : la publication n'établit pas que la console Chrome du poste professionnel est exempte de tous messages ni que les restrictions du CRM et de l'outil réseau sont résolues. Tests réels requis.

## CLOR-DEL-003 — Publication v0.1.1, contrôle de cohérence (12/10/2026)

- **Observation :** v0.1.0 a été publiée avant l'ajout à `main` de la remarque date/version ; un merge ultérieur a donc rendu le source plus récent que l'asset du tag v0.1.0. Il ne s'agit pas d'un échec GitHub, mais de deux références différentes.
- **Décision Fab :** publier une version **v0.1.1** contenant la remarque et le badge correspondants, tout en préservant v0.1.0 immuable.
- **Prévention :** tests assurant la concordance HTML visible / commentaire ; workflow de release créant un asset du commit fusionné et enregistrant SHA-256.
- **Certitude :** décalage tag/main confirmé avant publication ; statut de v0.1.1 à vérifier après workflow. Le problème Chrome `file://` reste distinct et non expliqué par cette modification de version.

## CLOR-DEL-004 — Vérification effective de la release v0.1.1 (12/10/2026)

- **Prouvé :** PR #3 fusionnée, commit/tag `ae4cc469d7899b2b80badf29fc0666a3761b2857`, workflow de release [38225731067](https://github.com/greenpower2669/CleanOR/actions/runs/38225731067) conclu `success` (16 tests réussis, 0 échec).
- **Asset confirmé :** `CleanOR-v0.1.1.html`, 21 272 octets, SHA-256 de construction `ae4ea1730a5446f947a759c9b597c55ca832e4fba4ee3c6ed9cb92515cb40cbc`, page [release](https://github.com/greenpower2669/CleanOR/releases/tag/v0.1.1), [fichier direct](https://github.com/greenpower2669/CleanOR/releases/download/v0.1.1/CleanOR-v0.1.1.html).
- **Limite :** cette publication ne démontre pas la disparition du message Chrome `file://` en environnement professionnel ni l'acceptation métier de tous les textes transformés.

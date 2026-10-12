# ✅ CleanOR — plan technique et état réel

## CLOR-MISSION-001 / CLOR-MISSION-002 — V0.1

- [x] Lire le protocole FAB Copilot et constater le dépôt public MIT.
- [x] Préserver main et créer la branche feature/cleanor-offline-v01.
- [x] Développer l'application HTML unique hors ligne avec interface agrandie, aide et inversion centrale.
- [x] Ajouter nettoyage Unicode, deux modes, règles personnalisées, profils et JSON import/export.
- [x] Ajouter décodage de fichiers d'entrée, sortie en octets UTF-8/Windows-1252/ASCII et réparation volontaire des mojibakes.
- [x] Ajouter des tests natifs Node et le workflow CI.
- [x] Créer ordres-de-mission.md et quatre mémoires du projet dans le même ensemble de modifications.

## Vérifications restantes
- [x] Commit initial fonctionnel : aaed0f5761425a672c5d7d77897255b132388074 ; CI GitHub run 37911209788 réussi, 10 tests passés, 0 échec.
- [ ] Tester sur un navigateur moderne : menus, inversion, copie et repli Ctrl+C/Ctrl+V, import/export de fichiers et règles.
- [ ] Fab : vérifier sur le poste intranet avec un extrait anonymisé, puis ajuster les règles aux rejets réellement observés.
- [ ] Fab : valider les résultats réouverts dans les outils métiers, notamment accents et « ? » après enregistrement.
- [x] Fab autorise explicitement la fusion et la release le 12/10/2026, CLOR-MISSION-005. Les tests métier sur le poste restent à réaliser.

## Risques et prochaines améliorations
- **CLOR-OBS-001 :** liste exacte des caractères rejetés inconnue.
- **CLOR-OBS-002 :** transformation en « ? » côté logiciel tiers non diagnostiquée.
- **[AGENT, non commandé] :** envisager un tableau affichant les codes Unicode U+XXXX pour les caractères invisibles.
- **Livraison :** publication de v0.1.0 désormais autorisée ; ne pas annoncer de test sur machine de Fab sans retour réel.

## CLOR-MISSION-003 — Historique

- [x] Version expérimentale de restauration par script externe réalisée le 09/10/2026.
- [x] **Fonctionnalité retirée explicitement sur demande de Fab (12/10/2026)** ; ne pas réintroduire ce mécanisme. Les détails historiques et tests passés sont tracés dans debughistorical.md.

## CLOR-MISSION-004 — Retrait du chargement local externe

- [x] Retirer la balise script src de CleanOR-sauvegarde.js et toute référence au fichier dans le code d'exécution.
- [x] Retirer l'export .js et les messages/écrans devenus inutiles.
- [x] Préserver les réglages localStorage et l'import/export JSON manuel.
- [x] Modifier les tests pour interdire les chargements externes et vérifier localStorage + fallback.
- [x] Modifier le workflow CI et les cinq mémoires, avec historique conservé.
- [x] CI GitHub du correctif confirmée verte (38218180999, 15/15) ; publication v0.1.0 revalidée avec 15/15 tests sur commit fusionné.
- [ ] Fab : remplacer son fichier HTML local par le nouvel index.html ou retirer manuellement la balise script de sa copie existante ; Chrome doit être rechargé.
- [ ] Fab : vérifier sur son poste qu'il n'y a plus de message de fichier absent et que les conversions fonctionnent.
- [x] Fab a donné sa validation pour merger et publier **cette version** (12/10/2026).

## CLOR-MISSION-005 — Fusion et release v0.1.0 (12/10/2026)

- [x] Vérifier PR #1 fusionnable, HEAD de branche, statut CI vert et absence de release préexistante.
- [x] Préparer le workflow ponctuel de release v0.1.0 avec tests avant publication et asset HTML direct.
- [x] Préparer les notes de release et les mémoires vivantes dans la même modification de branche.
- [x] CI du commit de préparation `cfa3b648` verte (runs 38219150902 et 38219154756).
- [x] PR #1 passée en revue puis fusionnée avec historique ; commit de fusion sur main `385ff61c2d0150a9afc849ca6e2a6fdbf36dffe1`.
- [x] Workflow [release v0.1.0](https://github.com/greenpower2669/CleanOR/actions/runs/38219223243) **success**, 15/15 tests ; [tag et GitHub Release](https://github.com/greenpower2669/CleanOR/releases/tag/v0.1.0) publics et asset [CleanOR-v0.1.0.html](https://github.com/greenpower2669/CleanOR/releases/download/v0.1.0/CleanOR-v0.1.0.html) vérifié (21015 octets).
- [x] Preuves finales intégrées aux mémoires sans changer index.html ni la release déjà publiée.
- [ ] **À valider en usage réel :** comportement de Chrome local et conformité des messages métier ; CI ne couvre pas ces vérifications externes.

**CLOR-MISSION-005 — livré et publié le 12/10/2026.** SHA-256 HTML de la release : `4b17d9ef200c85f131055551eb0653f4ff2497682ac235818074c0810d3e7ce3`. Les tests métier sur poste professionnel (CLOR-TEST-001/002) restent ouverts.

## CLOR-MISSION-006 — Remarque date/version, HTML autonome (12/10/2026)
- [x] Contrôler la version v0.1.0 déjà publiée et confirmer `index.html` sur `main` sans chargement de script annexe.
- [x] Ajouter la remarque HTML de version et date à la source, sans changer le comportement ni le fichier publié.
- [x] Ajouter un test de présence de cette remarque et de non-dépendance externe.
- [x] Adapter les mémoires vivantes pertinentes et le registre des missions dans le même changement.
- [x] CI PR #2 réussie (run 38224121153, **16/16 tests**) puis fusion dans main au commit `cca3cff6af3b1a2270725db6f52d17f7bb262ae9`.
- [x] Fusion et SHA confirmés ; CI main réussie (run 38224194263). Le tag v0.1.0 et son asset restent inchangés. Mémoires documentaires synchronisées.
- [ ] Le message de console Chrome observé chez Fab reste à diagnostiquer séparément ; un commentaire HTML ne prétend pas le corriger.

## CLOR-MISSION-007 — Publication finale v0.1.1 (12/10/2026)

- [x] Vérifier que `main` contient la correction sans fichier JS externe et que la release v0.1.0 est conservée.
- [x] Mettre à jour le commentaire et la version affichée vers v0.1.1 (date 12/10/2026), sans changer la logique métier.
- [x] Renforcer le test de version et préserver les contrôles d'autonomie HTML.
- [x] Créer le workflow de release ponctuel et les notes v0.1.1.
- [x] Mettre à jour les mémoires FAB-Copilot et ce registre dans le même commit de préparation.
- [x] CI de branche verte : run 38225622515, 16 tests / 16 ; PR #3 créée et fusionnée.
- [x] PR #3 fusionnée sur `main` : `ae4cc469d7899b2b80badf29fc0666a3761b2857`; CI `main` run 38225731101 réussie.
- [x] Workflow de publication [38225731067](https://github.com/greenpower2669/CleanOR/actions/runs/38225731067) réussi ; **16/16 tests**, tag `v0.1.1` = commit de fusion `ae4cc469d7899b2b80badf29fc0666a3761b2857` ; [release](https://github.com/greenpower2669/CleanOR/releases/tag/v0.1.1) et [asset `CleanOR-v0.1.1.html`](https://github.com/greenpower2669/CleanOR/releases/download/v0.1.1/CleanOR-v0.1.1.html) vérifiés, 21 272 octets, SHA-256 `ae4ea1730a5446f947a759c9b597c55ca832e4fba4ee3c6ed9cb92515cb40cbc`.
- [x] Preuves de publication vérifiées ajoutées aux mémoires dans un commit documentaire post-release ; tag et fichier publié inchangés.
- [ ] Test Chrome professionnel et règles métier restent ouverts, indépendamment de la publication.

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
- [ ] Vérifier la CI GitHub sur le dernier SHA et les tests mis à jour.
- [ ] Fab : remplacer son fichier HTML local par le nouvel index.html ou retirer manuellement la balise script de sa copie existante ; Chrome doit être rechargé.
- [ ] Fab : vérifier sur son poste qu'il n'y a plus de message de fichier absent et que les conversions fonctionnent.
- [x] Fab a donné sa validation pour merger et publier **cette version** (12/10/2026).

## CLOR-MISSION-005 — Fusion et release v0.1.0 (12/10/2026)

- [x] Vérifier PR #1 fusionnable, HEAD de branche, statut CI vert et absence de release préexistante.
- [x] Préparer le workflow ponctuel de release v0.1.0 avec tests avant publication et asset HTML direct.
- [x] Préparer les notes de release et les mémoires vivantes dans la même modification de branche.
- [ ] Vérifier la CI du commit de préparation avant merge.
- [ ] Passer la PR de brouillon à prête, fusionner dans main en gardant l'historique ; vérifier le SHA final.
- [ ] Vérifier le workflow GitHub de publication sur main, la release v0.1.0, le tag et l'asset **CleanOR-v0.1.0.html** ; ne marquer livré qu'après preuve.
- [ ] Ajouter les preuves finales aux mémoires après vérification, sans toucher au code publié.
- [ ] **À valider en usage réel :** comportement de Chrome local et conformité des messages métier ; CI ne couvre pas ces vérifications externes.

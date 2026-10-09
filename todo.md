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
- [ ] Confirmer le SHA du commit de branche et le statut réel de GitHub Actions.
- [ ] Tester sur un navigateur moderne : menus, inversion, copie et repli Ctrl+C/Ctrl+V, import/export de fichiers et règles.
- [ ] Fab : vérifier sur le poste intranet avec un extrait anonymisé, puis ajuster les règles aux rejets réellement observés.
- [ ] Fab : valider les résultats réouverts dans les outils métiers, notamment accents et « ? » après enregistrement.
- [ ] Fab : valider explicitement avant toute fusion main ou release.

## Risques et prochaines améliorations
- **CLOR-OBS-001 :** liste exacte des caractères rejetés inconnue.
- **CLOR-OBS-002 :** transformation en « ? » côté logiciel tiers non diagnostiquée.
- **[AGENT, non commandé] :** envisager un tableau affichant les codes Unicode U+XXXX pour les caractères invisibles.
- **Livraison :** branche feature/cleanor-offline-v01, sans fusion ni release. Ne pas annoncer de test sur machine de Fab sans retour réel.

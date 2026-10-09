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
- [ ] Fab : valider explicitement avant toute fusion main ou release.

## Risques et prochaines améliorations
- **CLOR-OBS-001 :** liste exacte des caractères rejetés inconnue.
- **CLOR-OBS-002 :** transformation en « ? » côté logiciel tiers non diagnostiquée.
- **[AGENT, non commandé] :** envisager un tableau affichant les codes Unicode U+XXXX pour les caractères invisibles.
- **Livraison :** branche feature/cleanor-offline-v01, sans fusion ni release. Ne pas annoncer de test sur machine de Fab sans retour réel.

## CLOR-MISSION-003 — Restauration automatique de la sauvegarde

- [x] Choisir un amorçage compatible file:// : script de données optionnel CleanOR-sauvegarde.js.
- [x] Charger le fichier valide sans clic, avec priorité fichier > navigateur > défauts.
- [x] Ajouter le bouton de génération d'une sauvegarde auto et conserver import/export JSON.
- [x] Afficher la provenance de la sauvegarde et avertir d'un fichier disque prioritaire.
- [x] Ajouter tests Node du démarrage sans clic, fallback et priorité.
- [ ] Confirmer CI et SHA après le commit.
- [ ] Fab : tester sous navigateur professionnel, sauvegarde à côté du HTML, fermeture puis réouverture, absence et rechargement d'un nouvel export.
- [ ] Ne pas merger main ni publier de release sans la validation de Fab.

- [x] Étendre le workflow CI aux tests de chargement automatique (le premier passage CI vert ne couvrait que le noyau). Recontrôler le nombre de tests avant de déclarer succès.

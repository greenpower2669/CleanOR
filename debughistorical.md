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

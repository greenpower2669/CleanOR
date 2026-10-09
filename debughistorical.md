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

# 🧼 CleanOR v0.1.4 — diagnostic Unicode et contrôle client ADC5

**Publication du 30 octobre 2026.** Application en un seul fichier autonome `CleanOR-v0.1.4.html`, sans installation, bibliothèque ni transfert réseau du texte métier.

## Évolutions principales

- **Contrôle Unicode local ADC5** issu de l'audit du fichier JavaScript fourni : lettres, nombres, ponctuation, séparateurs, symboles et marques autorisés par le motif générique ; contrôles et caractères de format non autorisés.
- **Nettoyage configurable** : remplacer les caractères problématiques et retours à la ligne par des espaces classiques `U+0020`, ou les supprimer. Évite de réintroduire les LF de la v0.1.3 qui avaient échoué lors d'un essai SGE.
- **Profils de champs observés** : commentaires génériques limités à **2 047 unités UTF-16** ; référence du demandeur limitée à **150 unités UTF-16** avec signes exclus. Pour les autres champs, aucune limite non vérifiée n'est supposée. Dépassements signalés sans tronquer silencieusement le texte.
- **Préservation** des lettres accentuées, chiffres, ponctuation et symboles admis, en mode UTF-8 et sous réserve des règles personnalisées.
- **Visualiseur Unicode inline** : dans le bouton ❓ Aide, affichage du texte brut annoté avec les codes invisibles `U+XXXX`, sans ouvrir de nouvelle fenêtre. Rapport copiable limité aux codes, positions et fréquences, sans phrases ou données métier.
- **Compatibilité** : conversion historique v0.1.2 toujours accessible en désactivant le contrôle ADC5 ; gestion CRM, règles personnalisées, imports et exports conservés.

## Validation et limites

- Tests de non-régression sur les conversions, les profils, les limites UTF-16, le diagnostic, la confidentialité et l'HTML autonome exécutés lors de la publication.
- **Important : le motif et les validations JavaScript ADC5 ne garantissent pas l'acceptation du résultat par le serveur SGE.** Tester la version sur le poste professionnel.
- Les releases v0.1.2 et v0.1.3 restent conservées, ainsi que leur historique.

Licence MIT.

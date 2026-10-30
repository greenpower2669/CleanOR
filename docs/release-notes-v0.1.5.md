# 🧼 CleanOR v0.1.5 — terminologie SpanPersoOr

**Version officielle du 30 octobre 2026**, application HTML autonome : `CleanOR-v0.1.5.html`. Fonctionnement local, sans dépendance externe.

## Évolution par rapport à la v0.1.4

Le nom **SpanPersoOr** remplace l'ancienne dénomination dans l'application, les contrôles d'interface, les fonctions JavaScript, les paramètres, les tests et la documentation active du projet. Ce changement concerne l'identification du validateur et du nettoyage, **sans modification fonctionnelle volontaire des règles de compatibilité**.

Les fonctionnalités suivantes sont préservées :
- Contrôle Unicode local et normalisation configurable par espace classique U+0020 ou suppression.
- Profils de champs étudiés : commentaires génériques, limite de 2 047 unités UTF-16 ; référence demandeur, limite de 150 unités UTF-16 et signes spécifiques.
- Préservation des accents, nombres, ponctuation et symboles autorisés.
- Affichage des caractères invisibles dans le panneau interne de ❓ Aide, avec code Unicode, et copie d'un rapport technique sans texte métier.
- Conversion historique, profils CRM et réseau, règles personnalisées et import/export.

## Validation

Tests automatisés du noyau, des paramètres, du visualiseur, de l'absence de l'ancien nom et de l'autonomie du fichier, exécutés avant publication.

Le contrôle JavaScript **SpanPersoOr n'établit pas à lui seul l'acceptation définitive par le serveur SGE** ; vérifier les collages sur le poste professionnel. Les versions antérieures et leur historique demeurent disponibles.

Licence MIT.

# 🧼 CleanOR v0.1.3 — retours LF et espaces invisibles normalisés

**Publication du 30 octobre 2026.** Fichier HTML autonome : `CleanOR-v0.1.3.html`, fonctionnant localement, sans dépendance réseau.

## Évolutions par rapport à v0.1.2
- Les retours de ligne de différentes origines (CR/LF/CRLF, séparateurs Unicode U+2028/U+2029, NEL et contrôles verticaux) sont reconstruits en **LF classique U+000A**. Les blocs de texte restent sur des lignes distinctes au lieu d'être aplatis.
- Les séparateurs horizontaux inhabituels, notamment les espaces Unicode, tabulations, `U+200B` (espace sans largeur) et `U+2063` (séparateur invisible), deviennent **SPACE U+0020**.
- Les autres marques de format invisibles non séparatrices sont supprimées sans coller ni espacer artificiellement les mots.
- Les LF classiques, les espaces normaux et la direction inverse vers le CRM sont préservés autant que possible.
- Les règles personnalisées sont suivies de la normalisation, pour éviter de réintroduire des caractères suspects.

## Validation
- Tests Node.js du noyau, des paramètres, de l'absence de dépendances externes et de l'identité des fichiers HTML, vérifiés avant publication.
- La version v0.1.2 était confirmée fonctionnelle par Fab avec son outil métier. **L'acceptation des retours LF reconstruits de v0.1.3 n'est pas encore confirmée** en situation réelle : cette version nécessite un essai sur poste professionnel.
- Les releases v0.1.0, v0.1.1 et v0.1.2 restent disponibles et inchangées.

Licence MIT.

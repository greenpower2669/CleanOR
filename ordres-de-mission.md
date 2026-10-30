# Ordres de mission — CleanOR

> Registre canonique des demandes explicites de Fab. Seul Fab peut annuler, modifier ou reprioriser ces missions. Les tâches d'exécution vivent séparément dans todo.md.

## CLOR-MISSION-001 — Convertisseur autonome et bidirectionnel
- **Demandeur / source :** Fab, discussion du 9 octobre 2026.
- **Objectif :** construire un HTML local (JavaScript intégré, sans librairie), utilisable sur intranet sans réseau, pour assainir les textes copiés d'un **CRM** vers un **outil opérateur réseau** et inversement.
- **Contraintes :** aucun nom de marque ni d'opérateur dans le programme ; deux zones comme un traducteur et gros bouton central ⇄ pour échanger le sens et reprendre le résultat.
- **Fonctionnalités explicites :** nettoyage de caractères spéciaux/invisibles, aide ?, engrenage de paramètres, gestion manuelle des caractères que la destination refuse, options de format/encodage d'entrée et de sortie dont UTF-8 et ANSI, import/export de listes de règles ; permettre le traitement retour vers le CRM.
- **Contexte :** des points d'interrogation surgissent parfois après enregistrement dans une application ; comprendre autant que possible les limitations sans prétendre pouvoir réparer toutes les pertes.
- **Statut :** Implémenté dans la branche de travail, **à tester et valider par Fab**.
- **Preuves attendues :** index.html, tests/test-core.cjs, commit de branche, résultats CI et essais en poste réel.

## CLOR-MISSION-002 — Mémoires vivantes FAB Copilot
- **Demandeur :** Fab, 9 octobre 2026 : « Ok, code ^^ et met à jour avec méthode fab copilote les mémoires vivantes aussi ».
- **Objectif :** accompagner les modifications du code dans le même commit avec les 4 fichiers vivants et le registre des ordres de mission, sans confondre les mémoires d'un autre projet.
- **Statut :** Produit sur branche de travail, validation finale de Fab attendue.
- **Preuves attendues :** brain.md, brainmap.md, debughistorical.md, todo.md et présent fichier sur la branche.

## Interdictions et inconnues
**La fusion et la release de cette version sont autorisées explicitement par Fab le 12/10/2026 (CLOR-MISSION-005).** Les spécifications exactes des rejets de caractères restent inconnues.

## CLOR-MISSION-003 — Restauration automatique si sauvegarde adjacente
- **Demandeur :** Fab, le 9 octobre 2026 : « Si la sauvegarde est dans le même répertoire alors la charger + Sans action de l'utilisateur ».
- **Attendu :** sauvegarde de règles présente à côté de la page → restauration sans clic au démarrage ; sauvegarde absente → démarrage normal.
- **Solution :** CleanOR-sauvegarde.js généré par nouveau bouton et lu par script relatif (lecture directe d'un fichier JSON voisin bloquée sous file:// dans les navigateurs courants).
- **Priorité :** fichier valide > localStorage > défauts.
- **Statut :** **retirée à la demande de Fab le 12/10/2026**. La fonctionnalité avait été implémentée, mais son chargement d’un script facultatif absent générait un message gênant dans la console Chrome. Voir CLOR-MISSION-004 ; ne pas réintroduire sans nouvel accord.
- **Preuves :** index.html, tests/test-autoload.cjs, README.md, CI après commit.

## CLOR-MISSION-004 — Supprimer la lecture automatique du fichier voisin
- **Demandeur / date :** Fab, 12 octobre 2026, après une capture de la console Chrome et confirmation : « La sauvegarde n'existe pas, on retire cette partie ».
- **Commande :** supprimer la partie nécessitant CleanOR-sauvegarde.js, et ne plus chercher un fichier de sauvegarde adjacent sans action.
- **À conserver :** fonctionnement hors ligne dans un HTML unique, nettoyage bidirectionnel, profils configurables, persistance locale du navigateur et import/export JSON à la demande.
- **Résultat attendu :** le lancement sans sauvegarde n'essaie aucun script voisin ; pas de message console induit par cette fonctionnalité.
- **Statut :** **implémenté sur branche de travail, à valider dans Chrome sur le poste de Fab**.
- **Preuves :** index.html ; tests/test-core.cjs, tests/test-settings.cjs ; CI à vérifier.

## CLOR-MISSION-005 — Fusionner et publier cette version
- **Demandeur :** Fab, 12 octobre 2026 : « Merge release cette version ».
- **Portée :** fusionner la correction CLOR-MISSION-004 et la V0.1 en main, publier **CleanOR v0.1.0** en GitHub Release avec asset HTML autonome directement téléchargeable.
- **Conditions de preuve :** CI de branche réussie, fusion main vérifiée, publication GitHub Release v0.1.0 et fichier CleanOR-v0.1.0.html effectivement présents, liens vers page et asset.
- **Statut :** **livré, release publiée et vérifiée le 12/10/2026**. Fusion PR #1 SHA `385ff61c2d0150a9afc849ca6e2a6fdbf36dffe1` ; [GitHub Release](https://github.com/greenpower2669/CleanOR/releases/tag/v0.1.0) ; [asset HTML direct](https://github.com/greenpower2669/CleanOR/releases/download/v0.1.0/CleanOR-v0.1.0.html) ; [CI release 15/15](https://github.com/greenpower2669/CleanOR/actions/runs/38219223243). L'essai sur poste métier reste à valider par Fab.

## CLOR-MISSION-006 — Fusion de la version autonome avec remarque date/version
- **Demandeur / date :** Fab, 12/10/2026 : « Merge la version sans fichier et met en remarque la date et la version stp ».
- **Attendu :** confirmer que CleanOR fonctionne avec son unique fichier HTML (sans JavaScript de sauvegarde externe), placer un commentaire non affiché portant la date et la version, puis fusionner cette révision dans `main`.
- **Version de référence :** `v0.1.0`, publiée le 12/10/2026 ; commentaire ajouté à la source de `main` sans réécrire le tag ni le fichier de la release déjà publiée.
- **Statut :** **livré et fusionné** le 12/10/2026 — PR #2 : https://github.com/greenpower2669/CleanOR/pull/2 ; merge `cca3cff6af3b1a2270725db6f52d17f7bb262ae9` ; [CI main, 16/16 tests](https://github.com/greenpower2669/CleanOR/actions/runs/38224194263).
- **Preuves :** `index.html`, `tests/test-core.cjs`, CI et merge GitHub.

## CLOR-MISSION-007 — Finaliser la fusion et la release v0.1.1
- **Demandeur / date :** Fab, 12 octobre 2026 : « Ok finaliste la merge release, ma.biloute ^^, bisous » ; fait suite à son accord de créer la release v0.1.1 après la fusion de la remarque datée.
- **Attendu :** version `v0.1.1` dans le commentaire HTML et sur l'interface, date `12/10/2026`, aucun fichier JS séparé ; fusion sur `main` et release GitHub **v0.1.1** avec asset direct `CleanOR-v0.1.1.html`.
- **Sauvegarde :** préserver l'import/export JSON manuel et la configuration locale du navigateur ; ne pas réintroduire la tentative de lecture du fichier absent `CleanOR-sauvegarde.js`.
- **Non-régression :** conserver la release v0.1.0 historique, ne pas déclarer test métier sur poste effectué.
- **Statut : livré et publié le 12/10/2026**, PR #3 fusionnée au commit `ae4cc469d7899b2b80badf29fc0666a3761b2857` ; [release v0.1.1](https://github.com/greenpower2669/CleanOR/releases/tag/v0.1.1) ; [fichier HTML direct](https://github.com/greenpower2669/CleanOR/releases/download/v0.1.1/CleanOR-v0.1.1.html) ; [tests de publication 16/16](https://github.com/greenpower2669/CleanOR/actions/runs/38225731067). Test en environnement professionnel toujours à valider.


## CLOR-MISSION-008 — Remplacer tous les retours et séparateurs vers le réseau (30/10/2026)
- **Demandeur :** Fab : après audit des caractères invisibles dans les textes transférés d'un CRM vers un outil opérateur réseau, demande de **remplacer tous les retours à la ligne et séparateurs** plutôt que de les supprimer ; « On remplace tout et on verra si ça passe ».
- **Décision d'implémentation :** le profil de destination réseau produit une seule ligne, en remplaçant les suites d'espaces, retours CR/LF/CRLF, tabulations, séparateurs de contrôle et séparateurs Unicode par **un espace ASCII U+0020** ; espaces de bord retirés. La direction CRM conserve les retours ordinaires ; les marques de contrôle invisibles non séparatrices sont éliminées.
- **Statut :** codé sur `feature/cleanor-separateurs-ascii-v012`, tests de régression ajoutés. **Fab a confirmé « Merge release » le 30/10/2026** : fusion de la PR #4 puis publication v0.1.2 autorisées, sous réserve des tests automatisés et contrôles GitHub.
- **Validation attendue :** CI verte, fusion PR #4 et GitHub Release v0.1.2 vérifiées ; puis essai réel sur un contenu professionnel anonymisé. L'acceptation par le logiciel cible n'est pas démontrée.


### CLOR-MISSION-008 — Livraison et publication vérifiées (30/10/2026)
- PR #4 **fusionnée** dans `main` : `c952124550ad34e2caa3b5301b7a00f169b85bd4` ; tag `v0.1.2` sur ce même commit.
- [Release v0.1.2](https://github.com/greenpower2669/CleanOR/releases/tag/v0.1.2), [asset HTML autonome direct](https://github.com/greenpower2669/CleanOR/releases/download/v0.1.2/CleanOR-v0.1.2.html) (**22 631 octets**), [workflow de publication réussi](https://github.com/greenpower2669/CleanOR/actions/runs/41030253202) (**21 tests, 0 échec**).
- SHA-256 du HTML publié : `254536eb81a2b678d853278470485febf7723ed4f6f453953a728806b1268b6a`.
- L'essai en situation réelle sur poste professionnel et l'acceptation des champs métier restent à valider.

## CLOR-MISSION-009 — Retours LF classiques au lieu d'une ligne unique (30/10/2026)
- **Demandeur / retour d'essai :** Fab confirme que la version v0.1.2 fonctionne dans l'outil réseau, et qu'un retour à la ligne créé directement dans l'outil y est accepté.
- **Nouvel objectif :** sans chercher à prouver la cause du rejet initial, remplacer les séparateurs de ligne de Salesforce par un unique **LF U+000A** et supprimer les marques invisibles parasites qui les accompagnent ; conserver les lignes lisibles plutôt qu'aplatir tout le texte en une seule ligne.
- **Implémentation :** sur le profil réseau, après les remplacements personnalisés : retirer les marques de format invisibles et contrôles non structurants, convertir CRLF/CR/LF/VT/FF/NEL/U+001C–U+001E/U+2028/U+2029 (et leurs répétitions entourées d'espaces invisibles) en LF ; convertir les espaces horizontaux Unicode en espaces ordinaires sans détruire les espaces visibles ; conserver le profil CRM inchangé.
- **Distribution d'essai :** `dist/CleanOR-v0.1.3-essai.html`, copié depuis le HTML autonome versionné, sur `feature/cleanor-lf-classique-v013`.
- **Limite :** test d'acceptation SGE réel en attente ; **aucune autorisation de merge dans main ni de publication release** donnée pour cette nouvelle mission.

### CLOR-MISSION-009 — Avenant : reconstruire également les espaces invisibles (30/10/2026)
- **Demande explicite de Fab :** corriger l'audit constatant que `U+200B` était supprimé et pouvait coller deux mots.
- **Règle finale du profil réseau :** détruire les représentations irrégulières, puis reconstruire le bon séparateur : retour vertical → LF `U+000A` ; espace ou séparateur invisible horizontal (`U+200B` et `U+2063`) → SPACE `U+0020` ; marque de formatage non séparatrice (`U+200C`, `U+200D`, `U+2060`, etc.) → suppression.
- **Précision :** ne pas modifier les suites composées exclusivement d'espaces ASCII ordinaires et ne pas ajouter d'espace parasite autour des LF.
- **Contrôle :** GitHub Actions [41034638189](https://github.com/greenpower2669/CleanOR/actions/runs/41034638189) : 31 tests sur 31 réussis pour le code correctif ; HTML autonome d'essai synchronisé. Continuer sur la branche et PR #5 brouillon, sans fusion ni release.

## CLOR-MISSION-009 — Avenant de livraison autorisé (30/10/2026)
- **Décision de Fab :** « Merge release » : autorisation explicite de fusion de PR #5 dans `main` et publication `v0.1.3`, après la correction des espaces invisibles et des retours LF.
- **Package :** fichier autonome `CleanOR-v0.1.3.html` dans GitHub Releases, produit exactement depuis `index.html` ; badge HTML sans mention d'essai, notes de version et tests.
- **Contrôles :** vérifier 31 tests/31 à la CI, release v0.1.3 et tag sur commit fusionné ; préserver v0.1.2 et les versions antérieures.
- **Réserve métier :** ne pas annoncer la validation SGE tant que Fab ne l'a pas essayée.

### CLOR-MISSION-009 — Publication confirmée v0.1.3
- Autorisation Fab exécutée : [PR #5](https://github.com/greenpower2669/CleanOR/pull/5) fusionnée dans `main` ; commit / tag `v0.1.3` = `402415dc06761c4d5750efb98b00dac6cfbd8b61`.
- [Release](https://github.com/greenpower2669/CleanOR/releases/tag/v0.1.3), [fichier direct `CleanOR-v0.1.3.html`](https://github.com/greenpower2669/CleanOR/releases/download/v0.1.3/CleanOR-v0.1.3.html) (**23 921 octets**), [workflow de publication](https://github.com/greenpower2669/CleanOR/actions/runs/41035835101) **success**, 31/31 tests.
- SHA-256 : `3c2f8e6e510ac2ae4f029ab231df0c5bc23156c577abd997bc803226e7db016c`. Aucune ancienne release remplacée. Tester l'acceptation du texte multiligne dans SGE avant de déclarer la compatibilité métier démontrée.

## CLOR-MISSION-010 — Restaurer la conversion réseau v0.1.2 et afficher les invisibles (30/10/2026)
- **Ordre de Fab :** corriger après échec de la reconstruction LF de v0.1.3 dans SGE. Ne plus tenter de déterminer la cause à l'aveugle : donner un accès lisible aux codes invisibles.
- Restaurer `CleanORCore.convert` du tag `v0.1.2` ; pour SGE produire une ligne unique dont les fins de ligne/séparateurs sont remplacés par espaces classiques.
- Dans ❓ Aide, proposer explicitement d'afficher les caractères invisibles ; afficher une **pseudo-popup interne**, sans nouvelle fenêtre, avec étiquettes Unicode sur le texte original. Prévoir fermer, accessibilité au clavier, lisibilité, copie d'un rapport limité aux codes/positions/fréquences, confidentialité.
- Aucune transmission réseau ni ajout de script externe ; préserver le HTML autonome, les réglages, les sens de conversion, encodages et exports existants.
- Brancher les tests de non-régression et sûreté du DOM ; produire une v0.1.4 d'essai, ne pas merger ni publier de release sans accord distinct.

## CLOR-MISSION-011 — Mise en conformité locale SGE / ADC5 (30/10/2026)
- **Ordre utilisateur :** partir du bundle ADC5 fourni localement (`adc5js.txt`) et adapter les comportements existants : repérer/refuser contrôles et marques invisibles, normaliser CR/LF/CRLF/espaces Unicode, choix remplacer par SPACE U+0020 ou supprimer, préserver lettres accentuées/symboles/ponctuation autorisés, garder le panneau de diagnostic ❓, respecter la longueur propre au champ et afficher toutes les anomalies.
- **Validation prouvée par bundle ADC5 :** `ee.utf8Regex=/^[\p{L}\p{N}\p{P}\p{Z}\p{S}\p{M}]*$/u` ; `generic-textarea` possède `MAX_LENGTH=2047` relié à `maxlength`, comptage JavaScript `.length` en unités UTF-16 ; `refDemandeur` possède `MAX_LENGTH_REF_DEMANDEUR=150` et une regex qui exclut `'%&€"{}|` (backtick), `$;\`.
- **Implémentation :** mode ADC5 activé pour la destination réseau, choix `commentaire`, `referenceDemandeur` ou `autre` (sans inventer de limite) ; choix remplacement ou suppression ; journal de codes Unicode, mesure avant/après, alerte de dépassement **sans troncature silencieuse** ; diagnostic inline existant enrichi avec mention « catégorie admise/refusée par le motif ADC5 ».
- **Attention :** le motif ADC5 autorise `\p{Z}` dont U+2028/U+2029, mais CleanOR les normalise par précaution au collage. Les remplacements typographiques historiques automatiques sont neutralisés seulement dans le mode ADC5 pour préserver la ponctuation admise ; règles personnalisées supplémentaires conservées. Mode historique v0.1.2 accessible en désactivant l'option.
- **Aucune validation d'acceptation serveur SGE :** l'audit provient du JavaScript client. N'introduire ni le bundle propriétaire ni données métier dans GitHub.
- **Travail :** mise à jour de la branche existante `feature/cleanor-diagnostic-invisibles-v014`, PR #6, sans autorisation de fusion ni release.

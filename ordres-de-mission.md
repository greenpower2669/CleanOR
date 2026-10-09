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
Aucune demande de fusion main ou de release sans validation explicite ; aucune spécification technique officielle connue des rejets de caractères.

# 🧠 CleanOR — contrat fonctionnel vivant

Version de travail : V0.1 · Missions : CLOR-MISSION-001 et CLOR-MISSION-002.

## Comportement attendu et implémenté

- Exécution intégralement locale à partir d'un **unique index.html**, sans réseau ni bibliothèque externe.
- Interface avec zone source, zone résultat en lecture seule, bouton central ⇄ (reprend le résultat comme nouvelle entrée en inversant la destination), bouton convertir, copier, coller, effacer, import et export texte.
- Noms génériques uniquement : **CRM** et **outil opérateur réseau**.
- Mode prudent : caractères incompatibles remplacés visiblement par **?** ; mode renforcé : caractères incompatibles supprimés ; conserver au mieux les accents.
- Normalisation NFC et des fins de lignes, espaces insécables ordinaires convertis en espaces, contrôles et marques Unicode invisibles supprimés.
- Profil spécifique à chaque destination ; profil opérateur par défaut avec substitutions courantes (tirets, guillemets courbes, ellipses, puces) ; profil CRM initial conservateur.
- Règles par destination : liste de caractères interdits, remplacements personnalisés au format « source => remplacement », maximum 200, import/export des deux profils via JSON.
- Réglages conservés dans localStorage si autorisé ; **jamais les textes professionnels**. Aucun serveur ou tracking.
- Encodage d'un fichier d'entrée : UTF-8, Windows-1252 ou ISO-8859-1 (alias Windows-1252 dans les navigateurs). Un collage est déjà Unicode et ne peut pas être recodé au niveau des octets.
- Sortie : répertoire compatible UTF-8, Windows-1252 ou ASCII, avec export binaire véritable en fichier .txt ; presse-papiers toujours Unicode.
- Option explicite de réparation de l'erreur « UTF-8 lu comme Windows-1252 » (ne jamais présumer qu'elle est souhaitable).
- Accessibilité : grands boutons, police agrandissable, focus visible, retours textuels et aides. Les permissions de presse-papiers peuvent imposer Ctrl+C / Ctrl+V.

## Limites contractuelles

- **CLOR-OBS-001 :** aucune liste officielle de caractères refusés par l'outil métier n'a été fournie. Les résultats constituent un prétraitement configurable, pas une garantie d'acceptation.
- **CLOR-OBS-002 :** les points d'interrogation observés après enregistrement côté application externe ne prouvent pas la cause (encodage, serveur, stockage ou lecture).
- **CLOR-TEST-001 :** essai sur le poste professionnel et validation après enregistrement restent à réaliser.
- La suppression et certaines translittérations sont irréversibles : **vérifier le texte avant émission**.

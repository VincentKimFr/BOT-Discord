# Bot-Discord

Ce bot de développement est programmé avec en javascript avec Node.js et la bibliothèque discord.js pour interragir avec l’API de l’application Discord.
Il me permet d’apprendre à programmer un bot da’avnt d’implémenter au fur et à mesure des fonctionalités qui pourront être utilisables.

Il gère le déploiement (ainsi que les permissions) et l’execution des slash commands (commandes que l’on peut intégrer à discord) dynamiquement.

Todo :
- Tickets de modération
- Auto-attribution de roles
- Historique de modération et autres
- Commande de votes

Évènements :
- Vérifie si un message d’un salon à une réaction sinon l’ajoute (future gestion de tickets)
- Si un message sur un serveur contient ping, le bot réponds pong.

Commandes :
- Off : Déconnecte le client du bot et l’éteint
- Redémarrer : Déconnecte et reconnecte le client
- Clear : Efface les messages de moins de 14 jours dans un salon
  - Avec message de confirmation de 15 secondes maximum avant annulation
  - Validation ou refus par deux émojis réactions mises par le bot sous le message de confirmation
  - (Prends en compte si besoin puis) supprime les réactions ajoutées après les siennes
  - Ne prends en compte que les réactions de l’utilisateur de la commande pour continuer le process
  - Passe à la phase suivante dès réaction valide de celui-ci
  - En cas d’annulation édite le message de demande de confirmation par une confirmation de l’annulation de maximum 5 secondes
  - Supprime ce message si une des deux réactions est de nouveaux entrée par l’utilisateur 

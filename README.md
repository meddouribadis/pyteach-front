# PyTeach Front

## Installation

Clone this repo and open a terminal inside the folder, then type :

`npm install`

`npm start`

## Redux Actions

Main store is created in the file `./_helpers/store.js` that use the variable rootReducer who combines all stores created within the `./_reducers/` folder.

Liste store disponible : 

- **authentification** : Récupère l'action de connexion, puis enregistre l'utilisateur qui se connecte avec succès.

- **registration** : TO DO : doc this
- **users** : Récupère tous les utilisateurs (actions : `USERS_GETALL_REQUEST` et `USERS_GETALL_SUCCESS`)
- **alert** : Enregistre les alertes à afficher sur le front.

 


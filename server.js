"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const DATA_URL = "https://alivebyacadomia.github.io/headtohead.json"; 

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.route("/players").get((req, res) => {
    
    fetch(DATA_URL)
    .then(response => response.json())
    .then(data => {
        const sortedPlayersById = data.players.sort((actualPlayer, nextPlayer) => actualPlayer.id - nextPlayer.id);
        res.json(sortedPlayersById);
    })
    .catch(error => console.error(error))
});

app.route("/players/:id").get((req, res) => {
    var id = req.params.id;

    fetch(DATA_URL)
    .then(response => response.json())
    .then(data => {
        const playerById = data.players.find((player) => {
            return player.id == id;
        });

        if (!playerById) {
            res.send(404);
        }
        res.json(playerById);
    })
    .catch(error => 
       console.log(error));
});

app.listen(3001, () => {
    console.log("Listening on port 3001");
});


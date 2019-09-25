const Discord = require('discord.js');
const express = require("express");

const client = new Discord.Client();
const app = express();

app.use(express.json());

app.post("/PostMessage", (req, res, next) => {
    let user = client.users.find(user => user.id == req.body.userId);
    
    user.send({embed: req.body.embeds});
    
    res.setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify({ result: 'success' }));
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_BOT_TOKEN);

app.listen(process.env.DISCORD_BOT_HTTP_PORT, () => {
    console.log("API server running on " + process.env.DISCORD_BOT_HTTP_PORT);
});
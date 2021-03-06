const Discord = require("discord.js");
const { bot } = require("../happy.js");
const db= require("quick.db")
const ayarlar = require("../ayarlar.json");

bot.on("message", async message => {
   if(message.author.bot || message.content.startsWith(ayarlar.prefix)) return;

    db.add(`mesaj.${message.guild.id}.${message.author.id}.channels.${message.channel.id}`, 1);
    db.set(`mesaj.${message.guild.id}.${message.author.id}.activity`, Date.now());
});

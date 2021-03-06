const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
const moment = require("moment");

exports.run = (happy, message, args) => {
  message.channel
    .send(" **Tüm Verilerin Silinmesini Onaylıyor Musun ?**")
    .then(() => {
      message.channel
        .awaitMessages(response => response.content.toLowerCase() === "evet", {
          max: 1,
          time: 30000,
          errors: ["time"]
        })
        .then(collected => {
          message.channel.send("  **Tüm bilgileri siliyorum...**   ")
          db.set(`mesaj.${message.guild.id}.${message.author.id}`, {})
        });
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""]
};

exports.help = {
  name: "reset"
};

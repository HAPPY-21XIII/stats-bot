const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
const moment = require("moment");
exports.run = async (happy, message, args) => {
  const mesajVeri = db.get(`mesaj.${message.guild.id}`) || undefined;

  let mesajListe = "Sonuç çıkmadı";
  if (mesajVeri) {
    mesajListe = Object.keys(mesajVeri || {})
      .map(mv => {
        return {
          Id: mv,
          Total: Object.values(mesajVeri[mv].channels || {}).reduce(
            (a, b) => a + b,
            0
          )
        };
      })
      .sort((a, b) => b.Total - a.Total)
      .splice(0, 10)
      .map(
        (user, index) =>
          `\`${index + 1}.\` <@${user.Id}> \`${user.Total} mesaj\``
      )
      .join("\n");
  }

  let sesliListe = "Sonuç çıkmadı";
  let embed = new Discord.MessageEmbed()
    .setAuthor(ayarlar.author, message.author.avatarURL({dynamic: true}))
    .setFooter(ayarlar.footer, happy.user.avatarURL({ dynamic: true }))
    .setThumbnail(message.author.avatarURL({dynamic: true}))
    .addField("Mesaj | Rankı", `** **\n${mesajListe}`)
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: []
};
exports.help = {
  name: "top"
};

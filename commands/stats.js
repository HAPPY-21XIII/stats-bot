const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
const moment = require("moment");
exports.run = async (happy, message, args) => {
    let mesajVeri = db.get(`mesaj.${message.guild.id}.${message.author.id}`) || {messages: 0, channels: {}};

    let mesajList = Object.keys(mesajVeri.channels).map(mv => {
        return {
            Id: mv,
            Total: mesajVeri.channels[mv]
        };
    }).sort((a, b) => b.Total - a.Total);

    mesajList = mesajList.length > 10 ? mesajList.splice(0, 10) : mesajList;
    mesajList = mesajList.map((mv, index)=> `\`${index + 1}.\` ${happy.channels.cache.has(mv.Id) ? happy.channels.cache.get(mv.Id).toString() : "#deleted-channel"}: \`${mv.Total} mesaj\``).join("\n");
    let embed = new Discord.MessageEmbed()
    .setAuthor(ayarlar.author, message.author.avatarURL({dynamic: true}))
    .setFooter(ayarlar.footer, happy.user.avatarURL({ dynamic: true }))
    .setThumbnail(message.author.avatarURL({dynamic: true}))
    .addField("Kullanıcı Bilgilendirme",` 
    \`ID:\` ${message.author.id}
    \`Kullanıcı:\` ${message.author}
    `)
    .addField("Mesaj Aktivitesi", `
    Geçmiş Aktivite: ${new Date(mesajVeri.activity).toLocaleDateString()}
    ** **${mesajList}
    `)
    message.channel.send(embed);
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: []
}
exports.help = {
  name: "stats"
}

const Discord = require("discord.js");
const fs = require("fs");
const Ayarlar = require("./ayarlar.json");
const Client = new Discord.Client();
const bot = new Discord.Client({ disableEveryone: true });
require("moment-duration-format");
require('./reader.js')(bot);

const newUsers = new Discord.Collection();
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

module.exports = {
  reader: "felicibus illud",
  bot: bot,
  Discord: Discord
};

bot.on("ready", () => {
  console.log(`│ [SİSTEM] Komutların hepsi tarandı!`)
  console.log("│ [SİSTEM] Bot kullanıma açıldı!");
  console.log("│ [SİSTEM] Coded by HAPPY")
  console.log("└──────────────────────────────────────────────────────────────");
  bot.user.setActivity(`CODED BY HAPPY`, { type: "WATCHING", status: "dnd" });
});

bot.login(Ayarlar.token);

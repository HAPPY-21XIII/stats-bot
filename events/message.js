const Discord = require("discord.js");
const { bot } = require("../happy.js");
const ayarlar = require("../ayarlar.json");

bot.on("message", async message => {
  if (message.content === "Ping!") return message.channel.send("deneem")
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  let prefix = ayarlar.prefix;
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);
});

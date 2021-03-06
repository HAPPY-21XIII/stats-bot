const Discord = require("discord.js");
const moment = require("moment");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
require("moment-duration-format");
exports.run = async (happy, message, args) => {
  message.channel.send(`Pong! ${happy.ws.ping}ms`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""]
};

exports.help = {
  name: "ping",
  description: "pong",
  usage: "ping"
};

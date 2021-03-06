const fs = require("fs");

module.exports = bot => {
  fs.readdir("./events/", (err, files) => {
    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) return console.log("Herhangi bir event dosyası bulunamadı!");
    console.log(`• ${jsfiles.length} adet event yükleniyor...`);
    jsfiles.forEach((f, i) => {
      require(`./events/${f}`);
      console.log(`${f} dosyası yüklendi!`);
    });
  });
  fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.lenght <= 0)return console.log("Herhangi bir komut dosyası bulunamadı!");
    console.log(`• ${jsfile.length} adet komut yükleniyor...`);
    jsfile.forEach((f, i) => {
      let props = require(`./commands/${f}`);
      console.log(`${f} dosyası yüklendi!`);
      bot.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
      });
    });
  });
};

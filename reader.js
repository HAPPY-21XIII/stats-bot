const fs = require("fs");

module.exports = bot => {
  console.log("┌──────────────────────────────────────────────────────────────┐")
  fs.readdir("./events/", (err, files) => {
    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) return console.log("│ [SİSTEM] Herhangi bir event dosyası bulunamadı!");
    console.log(`│ [SİSTEM] ${jsfiles.length} ADET EVENT TARANIYOR...`);
    jsfiles.forEach((f, i) => {
      require(`./events/${f}`);
      console.log(`│ [EVENTS] Taranan Dosya: ${f}`);
    });
  });
  fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.lenght <= 0)return console.log("│ [SİSTEM] Herhangi bir komut dosyası bulunamadı!");
    console.log(`│ [SİSTEM]  ${jsfile.length} ADET KOMUT TARANIYOR...`);
    jsfile.forEach((f, i) => {
      let props = require(`./commands/${f}`);
      console.log(`│ [KOMUT] Taranan dosya: ${f}`);
      bot.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
      });
    });
  });
};

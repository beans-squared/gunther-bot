const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  switch(message.content) {
    case "shane":
      message.reply("what you want hoe");
      break;
    case "ur mom":
      message.reply("gottem");
      break;
    case "uis":
      message.reply("gay");
      break;
    case "is hard":
      message.reply("me too");
      break;
    case "are hard":
      message.reply("me too");
      break;
    case "deep cock":
      message.reply("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
      break;
    case "cs?":
      message.reply("cs dis dick in ur ass");
      break;
    case "no u":
      message.reply("fuck");
      break;
    case "union":
      message.reply("it's called the onion you illiterate fuck");
      break;
    case "brad":
      message.reply("fuck you Brad");
      break;
  }
});

client.login(token);

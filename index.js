const fs = require("node:fs");
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async interaction => {
  if(!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interation.reply({ content: "There was an error while executing this command.", ephemeral: true });
  }
});

client.on("messageCreate", message => {
  switch(message.content) {
    case "shane":
      message.channel.send("what you want hoe");
      break;
    case "ur mom":
      message.channel.send("gottem");
      break;
    case "uis":
      message.channel.send("gay");
      break;
    case "is hard":
      message.channel.send("me too");
      break;
    case "are hard":
      message.channel.send("me too");
      break;
    case "deep cock":
      message.channel.send("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
      break;
    case "cs?":
      message.channel.send("cs dis dick in ur ass");
      break;
    case "no u":
      message.channel.send("fuck");
      break;
    case "union":
      message.channel.send("it's called the onion you illiterate fuck");
      break;
    case "brad":
      message.channel.send("fuck you Brad");
      break;
  }
});

client.login(token);

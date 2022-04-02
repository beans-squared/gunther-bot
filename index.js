const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async interaction => {
  if(!interaction.isCommand()) return;

  const { commandName } = interaction;

  switch(commandName) {
    case "ping":
      await interaction.reply("Pong!");
      break;
    case "server":
      await interaction.reply(`**Server name:** ${interaction.guild.name}\n**Number of members:** ${interaction.guild.memberCount} out of ${interaction.guild.maximumMembers} possible members\n**Server creation date:** ${interaction.guild.createdAt}\n**Server description:** ${interaction.guild.description}\n**Server partner status:** ${interaction.guild.partnered}\n**Server verification status:** ${interaction.guild.verified}`);
      break;
    case "user":
      await interaction.reply(`**User name:** ${interaction.user.username}\n**User tag:** ${interaction.user.tag}\n**Account creation date:**  ${interaction.user.createdAt}`);
      break;
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

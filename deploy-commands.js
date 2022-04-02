const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token } = require("./config.json");

const commands = [
  new SlashCommandBuilder().setName("ping").setDescription("Replies with 'Pong'"),
  new SlashCommandBuilder().setName("server").setDescription("Replies with server information"),
  new SlashCommandBuilder().setName("user").setDescription("Replies with user information"),
]
  .map(command => command.toJSON());

const rest = new REST({ version: "9"}).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);

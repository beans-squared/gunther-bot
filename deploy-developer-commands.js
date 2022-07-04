const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const logger = require('./logger');

const commands = [];
const commandFiles = fs.readdirSync('./commands/dev').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/dev/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		logger.info('Started registering application developer slash commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		logger.info('Successfully registered application developer slash commands.');
	} catch (error) {
		logger.error(error);
	}
})();
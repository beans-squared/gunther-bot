const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, token } = require('./config.json');
const logger = require('./logger');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		logger.info('Started globally reloading application slash commands.');

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		logger.info('Successfully globally reloaded application slash commands.');
	} catch (error) {
		logger.error(error);
	}
})();
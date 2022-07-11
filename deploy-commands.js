const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const logger = require('./logger');

const commands = [];
const user_commands = [];
const message_commands = [];

const directories = fs.readdirSync('./commands', { withFileTypes: true }).filter(dirent => dirent.isDirectory());
for (const dir of directories) {
	const commandFiles = fs.readdirSync(`./commands/${dir.name}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${dir.name}/${file}`);
		commands.push(command.data.toJSON());
	}
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}


const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		logger.info('Registering application commands...');

		if (process.argv.includes('--global') || process.argv.includes('-g')) {
			logger.info('Command scope: GLOBAL');
			await rest.put(
				Routes.applicationCommands(clientId),
				{ body: commands },
			);
		} else {
			logger.info('Command scope: GUILD');
			await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{ body: commands },
			);
		}

		logger.info(`Registration of application commands complete. Total commands registered:\nCHAT_INPUT: ${commands.length}\nUSER: ${user_commands.length}\nMESSAGE: ${message_commands.length}`);
	} catch (error) {
		logger.warn('An error has occured while registering application commands.');
		logger.error(error);
	}
})();
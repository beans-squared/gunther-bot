const logger = require('./../logger');
const ms = require('ms');
const { cacheMembersFromDatabase, saveMembersToDatabase } = require('../suites/leveling');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		logger.info('Initializing initialization of initial initials...');

		// Sync of GuildMembers
		cacheMembersFromDatabase();

		// Start saving cached members to database loop
		setInterval(saveMembersToDatabase, ms('20m'));

		logger.info(`Bot online, logged in as ${client.user.tag}`);

		// Gunther's presence update cycle
		decideActivity();
		setInterval(decideActivity, ms('30m'));

		function decideActivity() {
			const activityChoice = Math.floor(Math.random() * 3);
			logger.debug('Setting new activity status...');

			switch (activityChoice) {
			case 0: {
				const games = [
					'Besiege',
					'Deep Rock Galactic',
					'Dyson Sphere Program',
					'Factorio',
					'Minecraft',
					'Hydroneer',
					'RimWorld',
					'Satisfactory',
					'Stardew Valley',
					'Subnautica',
					'Teardown',
					'Terraria',
					'The Forest',
				];
				const gameChoice = Math.floor(Math.random() * games.length);
				logger.debug(`'Playing a game' chosen as activity. Game choice: ${games[gameChoice]}`);
				client.user.setPresence({
					activities: [{
						type: 'PLAYING',
						name: `${games[gameChoice]}`,
					}],
					status: 'online',
				});
				break;
			}
			case 1:
				logger.debug('\'Listening to Spotify\' chosen as activity.');
				client.user.setPresence({
					activities: [{
						type: 'LISTENING',
						name: 'Spotify',
					}],
					status: 'online',
				});
				break;
			case 2:
				logger.debug('\'Watching YouTube\' chosen as activity.');
				client.user.setPresence({
					activities: [{
						type: 'WATCHING',
						name: 'YouTube',
					}],
					status: 'online',
				});
				break;
			}
		}
	},
};

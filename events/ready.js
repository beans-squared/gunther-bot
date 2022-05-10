const logger = require('./../logger');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		logger.info(`Bot online, logged in as ${client.user.tag}`);

		// Gunther's presence update cycle
		// 1800000ms = 30m
		decideActivity();
		setInterval(decideActivity, 1800000);

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

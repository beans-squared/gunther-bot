module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		// Gunther's presence update cycle
		decideActivity();
		setInterval(decideActivity, 1800000);

		function decideActivity() {
			const activityChoice = Math.floor(Math.random() * 3);
			console.log('Setting new activity status...');

			switch (activityChoice) {
			case 0: {
				console.log('Playin a game was chosen');
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
				console.log('Listening to Spotify was chosen');
				client.user.setPresence({
					activities: [{
						type: 'LISTENING',
						name: 'Spotify',
					}],
					status: 'online',
				});
				break;
			case 2:
				console.log('Watching YouTube was chosen');
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

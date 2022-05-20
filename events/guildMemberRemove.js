const logging = require('./../suites/logging');

module.exports = {
	name: 'guildMemberRemove',
	async execute(member) {
		logging.logGuildMemberRemove(member);
	},
};
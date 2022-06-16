const logger = require('./../logger');
const dayjs = require('dayjs');
const ms = require('ms');
const { GuildMembers } = require('../dbObjects');

const guildMembers = new Array;
let isCooldownActive = false;

class GuildMember {
	constructor(userId, guildId, experience) {
		this.user_id = userId;
		this.guild_id = guildId;
		this.xp = experience;
	}
}

module.exports = {
	async cacheMembersFromDatabase() {
		logger.info('Caching guild members from the database...');
		try {
			const data = await GuildMembers.findAll();
			data.forEach(element => guildMembers.push(new GuildMember(element.user_id, element.guild_id, element.xp)));

			logger.info('Caching of guild members from database completed.');
		} catch (error) {
			logger.error(error);
		}
	},
	async saveMembersToDatabase() {
		logger.info('Saving guild members to the database...');
		try {
			if (guildMembers.length === 0) return logger.info('There were no guild members to save to the database. How strange!');

			for (let i = 0; i < guildMembers.length; i++) {
				const guildMember = guildMembers.at(i);
				const affectedRows = await GuildMembers.update({ xp: guildMember.xp }, {
					where: {
						user_id: guildMember.user_id,
						guild_id: guildMember.guild_id,
					},
				});

				if (affectedRows > 0) continue;

				await GuildMembers.create({ user_id: guildMember.user_id, guild_id: guildMember.guild_id, xp: guildMember.xp });
			}

			logger.info('Saving of guild members to database completed.');
		} catch (error) {
			logger.error(error);
		}
	},
	calculateXp(member) {
		const today = dayjs();
		const daysInGuild = Math.floor((today.diff(dayjs(member.joinedAt)) / 86400000));

		const finalXp = Math.floor((Math.sqrt((daysInGuild / 30) * (0.5) + 1)) * 100);
		logger.debug(`${member.displayName} joined the guild at ${member.joinedAt}`);
		logger.debug(`and has spent ${daysInGuild} days in this guild`);
		logger.debug(`and has earned ${finalXp} for this message`);

		return finalXp;
	},
	async recordXpGainToMemory(member, xp) {
		const index = guildMembers.findIndex(element => element.user_id === member.id && element.guild_id === member.guild.id);
		if (index === -1) {
			guildMembers.push(new GuildMember(member.id, member.guild.id, xp));
		} else {
			const existingXp = guildMembers.at(index).xp;
			guildMembers.splice(index, 1, new GuildMember(member.id, member.guild.id, xp += existingXp));
		}
	},
	activateCooldown() {
		isCooldownActive = true;
		setTimeout(() => isCooldownActive = false, ms('10s'));
	},
	isCooldownActive() {
		return isCooldownActive;
	},
};
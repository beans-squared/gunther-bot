const { MessageEmbed } = require('discord.js');
const { Logging } = require('./../database-objects');
const { inlineCode } = require('@discordjs/builders');

const logger = require('../logger');

module.exports = {
	// Helper functions
	async createLogWithIcon(channel, color, message, type, icon) {
		const log = new MessageEmbed()
			.setColor(color)
			.setDescription(message)
			.setFooter({ text: type, iconURL: icon })
			.setTimestamp();
		await channel.send({ embeds: [ log ] });
	},
	async createLog(channel, color, message, type) {
		const log = new MessageEmbed()
			.setColor(color)
			.setDescription(message)
			.setFooter({ text: type })
			.setTimestamp();
		await channel.send({ embeds: [ log ] });
	},
	async isLoggingEnabled(guild) {
		const state = await Logging.findOne({ where: { guild_id: guild.id } });
		return state.enabled;
	},
	async isLoggingChannelDefined(guild) {
		const query = await Logging.findOne({ where: { guild_id: guild.id } });
		if (query) {
			const channel = guild.channels.cache.find(element => element.id === query.logChannel);
			if (channel) {
				return channel;
			}
		}
		this.logNoDefinedLogChannelWarning(guild);
		return null;
	},
	async logNoDefinedLogChannelWarning(guild) {
		const log = new MessageEmbed()
			.setColor('DARK_RED')
			.setDescription(`⚠️WARNING: Gunther attempted to post a log message, but your server has no log channel defined.\nYou can define a log channel using the ${inlineCode('/logging channel')} command.`)
			.setFooter({ text: 'NoDefinedLogChannelWarning' })
			.setTimestamp();
		guild.channels.cache.first().send({ embeds: [ log ] });
	},
	async logMissingDefinedLogChannelWarning(guild) {
		const log = new MessageEmbed()
			.setColor('DARK_RED')
			.setDescription('⚠️WARNING: Gunther attempted to post a log message, but your defined log channel no longer appears to exist. Maybe it was deleted by accident?')
			.setFooter({ text: 'MissingDefinedLogChannelWarning' })
			.setTimestamp();
		guild.channels.cache.first().send({ embeds: [ log ] });
	},

	// Events
	async logChannelCreate(channel) {
		if (channel.type !== 'GUILD_TEXT' && channel.type !== 'GUILD_VOICE' && channel.type !== 'GUILD_NEWS' && channel.type !== 'GUILD_STAGE_VOICE') return;

		if (!await this.isLoggingEnabled(channel.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(channel.guild);
		if (logChannel) {
			let channelType = channel.type;
			switch (channelType) {
			case 'GUILD_TEXT':
				channelType = 'Text';
				break;
			case 'GUILD_VOICE':
				channelType = 'Voice';
				break;
			case 'GUILD_NEWS':
				channelType = 'News';
				break;
			case 'GUILD_STAGE_VOICE':
				channelType = 'Stage';
				break;
			default:
				channelType = 'wack ass channel type that u ain\'t supposed to be able to get';
				break;
			}

			if (channel.parent) return this.createLog(logChannel, 'AQUA', `✨ ${channelType} channel ${channel} was created under category ${channel.parent}`, 'Channel Creation');
			return this.createLog(logChannel, 'AQUA', `✨ ${channelType} channel ${channel} was created.`, 'Channel Creation');
		}

		return this.logMissingDefinedLogChannelWarning(channel.guild);
	},

	async logChannelDelete(channel) {
		if (channel.type === 'DM') return;

		if (!await this.isLoggingEnabled(channel.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(channel.guild);
		if (logChannel) {
			if (channel.parent) return this.createLog(logChannel, 'DARK_AQUA', `🗑️ Channel #${channel.name} was deleted from category ${channel.parent}`, 'Channel Deletion');
			return this.createLog(logChannel, 'DARK_AQUA', `🗑️ Channel #${channel.name} was deleted.`, 'Channel Deletion');
		}

		return this.logMissingDefinedLogChannelWarning(channel.guild);
	},

	async logChannelPinsUpdate(channel, time) {
		return channel, time;
	},

	async logChannelUpdate(oldChannel, newChannel) {
		if (newChannel.type === 'DM') return;

		if (!await this.isLoggingEnabled(newChannel.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(newChannel.guild);
		if (logChannel) {
			if (newChannel.parent) {
				if (newChannel.name !== oldChannel.name) return this.createLog(logChannel, 'AQUA', `💫 Channel #${oldChannel.name} had its name changed to ${newChannel} in category ${newChannel.parent}`, 'Channel Update');
				return this.createLog(logChannel, 'AQUA', `💫 ${newChannel} was updated in category ${newChannel.parent}`, 'Channel Update');
			}
			if (newChannel.name !== oldChannel.name) return this.createLog(logChannel, 'AQUA', `💫 Channel #${oldChannel.name} had its name changed to ${newChannel}`, 'Channel Update');
			return this.createLog(logChannel, 'AQUA', `💫 ${newChannel} was updated.`, 'Channel Update');
		}

		return this.logMissingDefinedLogChannelWarning(newChannel.guild);
	},

	async logEmojiCreate(emoji) {
		return emoji;
	},

	async logEmojiDelete(emoji) {
		return emoji;
	},

	async logEmojiUpdate(oldEmoji, newEmoji) {
		return oldEmoji, newEmoji;
	},

	async logError(error) {
		logger.error(error);
	},

	async logGuildBanAdd(ban) {
		return ban;
	},

	async logGuildBadRemove(ban) {
		return ban;
	},

	async logGuildCreate(guild) {
		return guild;
	},

	async logGuildDelete(guild) {
		return guild;
	},

	async logGuildIntegrationsUpdate(guild) {
		return guild;
	},

	async logGuildMemberAdd(member) {
		if (!await this.isLoggingEnabled(member.guild)) return;

		logger.debug(`User: ${member.user.tag} (${member.user.id}) has joined guild: ${member.guild} (${member.guild.id})`);

		const logChannel = await Logging.findOne({ where: { guild_id: member.guild.id } });
		if (logChannel) {
			const channel = await member.guild.channels.cache.find(element => element.id === logChannel.logChannel);
			if (channel) {
				return this.createLogWithIcon(channel, 'DARK_GREEN', `📥 ${member} has joined the server.`, 'User Join', `${member.user.avatarURL()}`);
			}

			return this.createLog(member.guild.channels.cache.first(), 'RED', '⚠️WARNING: Gunther attempted to post a log message, but your defined log channel no longer appears to exist. Maybe it was deleted by accident?', 'System Warning');
		}

		const channel = await member.guild.channels.cache.first();
		return this.createLog(channel, 'RED', `⚠️WARNING: Gunther attempted to post a log message, but your server has no log channel defined.\nYou can define a log channel using the ${inlineCode('/logging channel')} command.`, 'System Warning');
	},

	async logGuildMemberAvailable(member) {
		return member;
	},

	async logGuildMemberRemove(member) {
		if (!await this.isLoggingEnabled(member.guild)) return;

		logger.debug(`User: ${member.user.tag} (${member.user.id}) has left guild: ${member.guild} (${member.guild.id})`);

		const logChannel = await Logging.findOne({ where: { guild_id: member.guild.id } });
		if (logChannel) {
			const channel = member.guild.channels.cache.find(element => element.id === logChannel.logChannel);
			if (channel) {
				return this.createLog(channel, 'ORANGE', `📤 ${member} has left the server.`, 'User Leave');
			}

			return this.createLog(member.guild.channels.cache.first(), 'RED', '⚠️WARNING: Gunther attempted to post a log message, but your defined log channel no longer appears to exist. Maybe it was deleted by accident?', 'System Warning');
		}

		return this.createLog(member.guild.channels.cache.first(), 'RED', `⚠️WARNING: Gunther attempted to post a log message, but your server has no log channel defined.\nYou can define a log channel using the ${inlineCode('/logging channel')} command.`, 'System Warning');
	},

	async logGuildMembersChunk(members, guild, chunk) {
		return members, guild, chunk;
	},

	async logGuildMemberUpdate(oldMember, newMember) {
		return oldMember, newMember;
	},

	async logGuildScheduledEventCreate(guildScheduledEvent) {
		return guildScheduledEvent;
	},

	async logGuildScheduledEventDelete(guildScheduledEvent) {
		return guildScheduledEvent;
	},

	async logGuildScheduledEventUpdate(guildScheduledEvent) {
		return guildScheduledEvent;
	},

	async logGuildScheduledEventUserAdd(guildScheduledEvent, user) {
		return guildScheduledEvent, user;
	},

	async logGuildScheduledEventUserRemove(guildScheduledEvent, user) {
		return guildScheduledEvent, user;
	},

	async logGuildUnavailable(guild) {
		return guild;
	},

	async logGuildUpdate(oldGuild, newGuild) {
		return oldGuild, newGuild;
	},

	async logInteractionCreate(interaction) {
		return interaction;
	},

	async logInviteCreate(invite) {
		return invite;
	},

	async logInviteDelete(invite) {
		return invite;
	},

	async logMessageCreate(message) {
		return message;
	},

	async logMessageDelete(message) {
		return message;
	},

	async logMessageDelteBulk(messages) {
		return messages;
	},

	async logMessageReactionAdd(messageReaction, user) {
		return messageReaction, user;
	},

	async logMessageReactionRemove(messageReaction, user) {
		return messageReaction, user;
	},

	async logMessageReactionRemoveAll(message, reactions) {
		return message, reactions;
	},

	async logMessageReactionRemoveEmoji(reaction) {
		return reaction;
	},

	async logMessageUpdate(oldMessage, newMessage) {
		return oldMessage, newMessage;
	},

	async logPresenceUpdate(oldPresence, newPresence) {
		return oldPresence, newPresence;
	},

	async logRateLimit(rateLimitData) {
		return rateLimitData;
	},

	async logRoleCreate(role) {
		return role;
	},

	async logRoleDelete(role) {
		return role;
	},

	async logRoleUpdate(oldRole, newRole) {
		return oldRole, newRole;
	},

	async logStageInstanceCreate(stageInstance) {
		return stageInstance;
	},

	async logStageInstanceDelete(stageInstance) {
		return stageInstance;
	},

	async logStageInstanceUpdate(oldStageInstance, newStageInstance) {
		return oldStageInstance, newStageInstance;
	},

	async logStickerCreate(sticker) {
		return sticker;
	},

	async logStickerDelete(sticker) {
		return sticker;
	},

	async logStickerUpdate(oldSticker, newSticker) {
		return oldSticker, newSticker;
	},

	async logThreadCreate(thread, newlyCreated) {
		return thread, newlyCreated;
	},

	async logDelete(thread) {
		return thread;
	},

	async logThreadListSync(threads) {
		return threads;
	},

	async logThreadMembersUpdate(oldMembers, newMembers) {
		return oldMembers, newMembers;
	},

	async logThreadMemberUpdate(oldMember, newMember) {
		return oldMember, newMember;
	},

	async logThreadUpdate(oldThread, newThread) {
		return oldThread, newThread;
	},

	async logTypingStart(typing) {
		return typing;
	},

	async logUserUpdate(oldUser, newUser) {
		return oldUser, newUser;
	},

	async logVoiceStateUpdate(oldState, newState) {
		return oldState, newState;
	},

	async logWarn(warn) {
		logger.warn(warn);
	},

	async logWebhookUpdate(channel) {
		return channel;
	},
};
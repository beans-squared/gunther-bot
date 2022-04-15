const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('Ask the magic 8-ball a question, and recieve an answer')
		.addStringOption(option =>
			option
				.setName('question')
				.setDescription('Enter your question for the magic 8-ball')
				.setRequired(true),
		),
	async execute(interaction) {
		const quipChoice = Math.floor(Math.random() * 4);
		const response = Math.floor(Math.random() * 20);
		const question = interaction.options.getString('question');
		let quip = '';

		switch (quipChoice) {
		case 0:
			quip = `Good question, I was also wondering: **${question}?** Let's see what the 8-ball has to say...`;
			await interaction.reply(quip);
			break;
		case 1:
			quip = `**${question}?** I'd certainly like to know! Let's find out...`;
			await interaction.reply(quip);
			break;
		case 2:
			quip = `Hmm, **${question}?** I'm honestly not too sure, so let's give this over to the 8-ball...`;
			await interaction.reply(quip);
			break;
		case 3:
			quip = `I'd be willing to bet that the 8-ball has something to say about that: **${question}?** Let's see...`;
			await interaction.reply(quip);
			break;
		default:
			quip = 'ERROR: quip out of bounds';
			await interaction.reply(quip);
			break;
		}

		await wait(5000);

		switch (response) {
		case 0:
			await interaction.editReply(quip + '\n\nSays **"It is certain."** How very, well, certain!');
			break;
		case 1:
			await interaction.editReply(quip + '\n\nThe 8-ball says **"It is decidedly so."** It seems pretty certain of that, I\'d say!');
			break;
		case 2:
			await interaction.editReply(quip + '\n\n**"Without a doubt."** Well, there you go! It\'s decided.');
			break;
		case 3:
			await interaction.editReply(quip + '\n\nIt says **"Yes - definitely."** I hope that\'s the answer you were looking for!');
			break;
		case 4:
			await interaction.editReply(quip + '\n\n**"You may rely on it."** Well, you can feel free to, but I\'ll let you be the one to take your chances with that.');
			break;
		case 5:
			await interaction.editReply(quip + '\n\n**"As I see it, yes."** Well, the 8-ball\'s words, not mine.');
			break;
		case 6:
			await interaction.editReply(quip + '\n\nI\'ve got a reply! It states: **"Most likely."** Seems like a fairly decent chance of it being true.');
			break;
		case 7:
			await interaction.editReply(quip + '\n\nThe 8-ball states **"Outlook good."** Fantastic! Hopefully, anyway.');
			break;
		case 8:
			await interaction.editReply(quip + '\n\n**"Yes."** Huh. Simple and to the point. I like it.');
			break;
		case 9:
			await interaction.editReply(quip + '\n\nIt says **"Signs point to yes."** Not sure what signs they\'re talking about, but it at least seems confident.');
			break;
		case 10:
			await interaction.editReply(quip + '\n\nHrm, says **"Reply hazy, try again."** How thoroughly unhelpful.');
			break;
		case 11:
			await interaction.editReply(quip + '\n\n**"Ask again later."** What? Why not answer now, you stupid piece of junk?');
			break;
		case 12:
			await interaction.editReply(quip + '\n\n**"Better not tell you now."** Well, I\'d say that doesn\'t extactly inspire confidence.');
			break;
		case 13:
			await interaction.editReply(quip + '\n\nWonderful, now it says **"Cannot predict now."** Why not, huh? Too tired to give us a simple answer?');
			break;
		case 14:
			await interaction.editReply(quip + '\n\n**"Concentrate and ask again."** Huh. Guess whatever voodoo magic it uses couldn\'t read your mind. Not sure if that\'s a good thing or a bad thing.');
			break;
		case 15:
			await interaction.editReply(quip + '\n\nThe 8-ball proclaims: **"Don\'t count on it."** Very well, then. Hope you weren\'t pinning your hopes on that.');
			break;
		case 16:
			await interaction.editReply(quip + '\n\nIt just says **"My reply is no."** Hope that\'s what you wanted to hear.');
			break;
		case 17:
			await interaction.editReply(quip + '\n\n**"My sources say no."** What on earth? Since when does an 8-ball have sources?');
			break;
		case 18:
			await interaction.editReply(quip + '\n\n**"Outlook not so good."** Well that\'s a shame. Or perhaps what you were looking for?');
			break;
		case 19:
			await interaction.editReply(quip + '\n\nI\'ve got a reply! It says **"Very doubtful."** Was that what you were hoping for?');
			break;
		default:
			await interaction.editReply(quip + '\n\nERROR: response out of bounds');
			break;
		}
	},
};
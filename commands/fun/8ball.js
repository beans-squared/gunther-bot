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
		const question = interaction.options.getString('question');

		const quips = [
			`Good question, I was also wondering: **${question}?** Let's see what the 8-ball has to say...`,
			`**${question}?** I'd certainly like to know! Let's find out...`,
			`Hmm, **${question}?** I'm honestly not too sure, so let's give this over to the 8-ball...`,
			`I'd be willing to bet that the 8-ball has something to say about that: **${question}?** Let's see...`,
		];
		const quipChoice = Math.floor(Math.random() * quips.length);

		await interaction.reply(quips[quipChoice]);

		await wait(5000);

		const responses = [
			'Says **"It is certain."** How very, well, certain!',
			'The 8-ball says **"It is decidedly so."** It seems pretty certain of that, I\'d say!',
			'**"Without a doubt."** Well, there you go! It\'s decided.',
			'It says **"Yes - definitely."** I hope that\'s the answer you were looking for!',
			'**"You may rely on it."** Well, you can feel free to, but I\'ll let you be the one to take your chances with that.',
			'**"As I see it, yes."** Well, the 8-ball\'s words, not mine.',
			'I\'ve got a reply! It states: **"Most likely."** Seems like a fairly decent chance of it being true.',
			'The 8-ball states **"Outlook good."** Fantastic! Hopefully, anyway.',
			'**"Yes."** Huh. Simple and to the point. I like it.',
			'It says **"Signs point to yes."** Not sure what signs they\'re talking about, but it at least seems confident.',
			'Hrm, says **"Reply hazy, try again."** How thoroughly unhelpful.',
			'**"Ask again later."** What? Why not answer now, you stupid piece of junk?',
			'**"Better not tell you now."** Well, I\'d say that doesn\'t extactly inspire confidence.',
			'Wonderful, now it says **"Cannot predict now."** Why not, huh? Too tired to give us a simple answer?',
			'**"Concentrate and ask again."** Huh. Guess whatever voodoo magic it uses couldn\'t read your mind. Not sure if that\'s a good thing or a bad thing.',
			'The 8-ball proclaims: **"Don\'t count on it."** Very well, then. Hope you weren\'t pinning your hopes on that.',
			'It just says **"My reply is no."** Hope that\'s what you wanted to hear.',
			'**"My sources say no."** What on earth? Since when does an 8-ball have sources?',
			'**"Outlook not so good."** Well that\'s a shame. Or perhaps what you were looking for?',
			'I\'ve got a reply! It says **"Very doubtful."** Was that what you were hoping for?',
		];
		const botResponse = Math.floor(Math.random() * responses.length);

		await interaction.editReply(quips[quipChoice] + '\n\n' + responses[botResponse]);
	},
};
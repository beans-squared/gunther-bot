module.exports = {
  name: "messageCreate",
  execute(message) {
    if(message.author.id === "959478879137980416") return;

    // Information message for when the bot is sent a DM
    if(message.channel.type === "DM"){
        console.log(`Received a DM from ${message.author.tag}`);
        message.author.send(`Hey there, ${message.author.username}!\n\nMy name is Gunther, and I am a work in progress, custom-built discord bot. If you'd like to know more about me, check back later and I may have more information for you!\n\nHave a nice day!`);
    // When the message is sent in a guild text channel
    } else if(message.channel.type === "GUILD_TEXT"){
      if(message.content.includes("Gunther!")){
        message.channel.send("Hey!");
      }

      // Fuck Brad
      if(message.author.id === "173532194676015105"){
        message.channel.send("Fuck you, Brad!");
      }
    }
  }
}

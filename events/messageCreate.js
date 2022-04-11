module.exports = {
  name: "messageCreate",
  execute(message) {
    if(message.content.includes("Gunther!")){
      message.channel.send("Hey!");
    }

    if(message.author.id === "173532194676015105"){
      message.channel.send("Fuck you, Brad!");
    }
  }
}

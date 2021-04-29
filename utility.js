const Discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

function genEmbed(channel, title, next) {
    const embed = new Discord.MessageEmbed()
        .setColor(process.env.EMBED_COLOR)
        .setTitle(title);
    next(embed);
    channel.send({ embed: embed });
}

module.exports = {
    genEmbed: genEmbed,
};

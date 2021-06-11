const Discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

const EMBED_COLOR = "#00CB09";

function genEmbed(channel, title, next) {
    const embed = new Discord.MessageEmbed()
        .setColor(EMBED_COLOR)
        .setTitle(title);
    next(embed);
    channel.send({ embed: embed });
}

module.exports = {
    genEmbed: genEmbed,
};

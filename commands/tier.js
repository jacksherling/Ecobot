const { genEmbed } = require("../utility");
const { command, Server } = require("./command");

const tier = new command(
    "tier",
    "Retrieves the tier of a user",
    "tier [user/(DEFAULT YOU)]",
    async (msg, author, server, words) => {
        const mentioned =
            msg.mentions.users.first() != null
                ? msg.mentions.users.first()
                : msg.author;
        let member = server.members.find((v) => v.id == mentioned);
        genEmbed(msg.channel, `${member.name}'s Tier`, (embed) => {
            embed.setDescription(`Tier ${member.tier}`);
        });
    },
    false
);

module.exports = tier;

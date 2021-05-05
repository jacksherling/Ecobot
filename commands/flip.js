const { genEmbed } = require("../utility");
const { command, Server } = require("./command");

const flip = new command(
    "flip",
    "Double your money or lose all of it.",
    "flip",
    async (msg, author, server, words) => {
        const flip = Math.random() < 0.5;
        const member = server.members.find((v) => v.id == author.id);
        member.balance = flip ? member.balance * 2 : 0;

        server.markModified("members");
        await server.save();

        genEmbed(msg.channel, "Flip Complete", (embed) => {
            embed.setDescription(`You ${flip ? "won" : "lost"}!`);
        });
    },
    false
);

module.exports = flip;

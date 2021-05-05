const { genEmbed } = require("../utility");
const { command, Server } = require("./command");

const pay = new command(
    "pay",
    "Gives specified user money from sender's wallet.",
    "pay [$] [user]",
    async (msg, author, server, words) => {
        const money = +words[0];
        const mentioned = msg.mentions.users.first();

        if (isNaN(money)) {
            genEmbed(msg.channel, "Input Error", (embed) => {
                embed.setDescription(`Money must be a number.`);
            });
            return;
        }

        if (money < 0) {
            genEmbed(msg.channel, "Money Allocation Error", (embed) => {
                embed.setDescription(`Allocated funds must be positive.`);
            });
            return;
        }

        if (server.members.find((v) => v.id == author.id).balance < money) {
            genEmbed(msg.channel, "Money Allocation Error", (embed) => {
                embed.setDescription(`You do not have sufficient funds.`);
            });
            return;
        }

        server.members.find((v) => v.id == author.id).balance -= money;
        server.members.find((v) => v.id == mentioned).balance += money;

        server.markModified("members");
        await server.save();

        genEmbed(msg.channel, "Money Payed", (embed) => {
            embed.setDescription(
                `You successfully payed ${mentioned} $${money}`
            );
        });
        return;
    },
    false
);

module.exports = pay;

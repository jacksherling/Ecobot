const { genEmbed } = require("../utility");
const { command, Server } = require("./command");

const gen = new command(
    "gen",
    "Gives user a certain amount of money.",
    "gen [$] [user/(DEFAULT ALL USERS)]",
    async (msg, author, server, words) => {
        const money = +words[0];
        const mentioned = msg.mentions.users.first();

        if (money < 0) {
            genEmbed(msg.channel, "Money Allocation Error", (embed) => {
                embed.setDescription(`Allocated funds must be positive.`);
            });
            return;
        }

        if (mentioned == null) {
            server.members = server.members.map((m) => {
                m.balance += money;
                return m;
            });

            server.markModified("members");
            await server.save();

            genEmbed(msg.channel, "Money Generated", (embed) => {
                embed.setDescription(
                    `$${money} has been successfully allocated to all server members.`
                );
            });
            return;
        } else {
            const changeMember = server.members.find((v) => v.id == mentioned);
            changeMember.balance += money;
            server.markModified("members");
            await server.save();

            genEmbed(msg.channel, "Money Generated", (embed) => {
                embed.setDescription(
                    `$${money} has been successfully allocated to ${changeMember.name}.`
                );
            });
            return;
        }
    },
    true
);

module.exports = gen;

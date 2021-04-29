const { genEmbed } = require("../utility");
const { command, Member, Server } = require("./command");

const gen = new command(
    "gen",
    "Gives user a certain amount of money.",
    "gen [$] [user/(DEFAULT ALL USERS)]",
    async (msg, author, server, words) => {
        const money = +words[0];
        console.log(money);
        const mentioned = msg.mentions.users.first();
        if (mentioned == null) {
            server.members = server.members.map((m) => {
                m.bal += money;
                return m;
            });
            await server.save();
            genEmbed(msg.channel, "Money Generated", (embed) => {
                embed.setDescription(
                    `$${money} has been successfully allocated.`
                );
            });
            return;
        }
    },
    true
);

module.exports = gen;

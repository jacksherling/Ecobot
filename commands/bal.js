const { genEmbed } = require("../utility");
const { command, Server } = require("./command");

const bal = new command(
    "bal",
    "Retrieves the balance of a user",
    "bal [user/(DEFAULT YOU)]",
    async (msg, author, server, words) => {
        const mentioned =
            msg.mentions.users.first() != null
                ? msg.mentions.users.first()
                : msg.author;
        let member = server.members.find((v) => v.id == mentioned);
        // if (!member) {
        //     member = {
        //         balance: server.startingBalance,
        //         name: author.username,
        //         serverId: server.id,
        //         id: mentioned.id,
        //     };
        //     server.members.push(member);
        //     await server.save();
        //     return;
        // }
        genEmbed(msg.channel, `${member.name}'s Wallet`, (embed) => {
            embed.setDescription(`$${member.balance}`);
        });
    },
    false
);

module.exports = bal;

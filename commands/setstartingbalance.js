const { genEmbed } = require("../utility");
const { command, Server } = require("./command");

const setStartingBalance = new command(
    "setstartingbalance",
    "Sets the balance of new members of the server.",
    "setstartingbalance [$]",
    async (msg, author, server, words) => {
        const newStartingBalance = +words[0];

        if (isNaN(newStartingBalance)) {
            genEmbed(msg.channel, "Input Error", (embed) => {
                embed.setDescription(`Input must be a number.`);
            });
            return;
        }

        server.startingBalance = newStartingBalance;
        await server.save();

        genEmbed(msg.channel, "Starting Balance Updated", (embed) => {
            embed.setDescription(
                `The new server starting balance is $${newStartingBalance} for new members.`
            );
        });
    },
    true
);

module.exports = setStartingBalance;

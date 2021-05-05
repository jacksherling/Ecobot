const { genEmbed } = require("../utility");
const { command, Server } = require("./command");

const reset = new command(
    "reset",
    "Reset the money on the server to $0.",
    "reset",
    async (msg, author, server, words) => {},
    true
);

module.exports = reset;

const command = require("./command");

const bal = new command(
    "bal",
    "Retrieves the balance of a user",
    "bal [user/(DEFAULT YOU)]",
    () => {}
);

module.exports = bal;

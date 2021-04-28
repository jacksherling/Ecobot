const mongoose = require("mongoose");
const User = require("./User");

const serverSchema = mongoose.Schema({
    users: [[User]],
});

module.exports = Server = mongoose.model("server", serverSchema);

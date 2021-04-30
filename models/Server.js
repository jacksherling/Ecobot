const mongoose = require("mongoose");
// const Member = require("./Member");

const serverSchema = mongoose.Schema({
    members: [Object],
    id: String,
    startingBalance: Number,
});

module.exports = Server = mongoose.model("server", serverSchema);

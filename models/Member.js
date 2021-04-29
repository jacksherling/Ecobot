const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
    balance: Number,
    serverId: String,
    name: String,
    id: String,
});

module.exports = Member = mongoose.model("member", memberSchema);

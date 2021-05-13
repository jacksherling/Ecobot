const mongoose = require("mongoose");

const serverSchema = mongoose.Schema({
    members: [Object],
    id: String,
    startingBalance: Number,
    tierOneCost: Number,
});

module.exports = Server = mongoose.model("server", serverSchema);

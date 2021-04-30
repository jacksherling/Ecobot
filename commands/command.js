const mongoose = require("mongoose");
const Server = require("../models/Server");
require("../db");

class command {
    constructor(name, description, usage, func, bankOnly) {
        this.name = name;
        this.description = description;
        this.usage = usage;
        this.func = func;
        this.bankOnly = bankOnly;
    }
}

module.exports = { command, Server };

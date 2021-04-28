class command {
    constructor(name, description, usage, func) {
        this.name = name;
        this.description = description;
        this.usage = usage;
        this.func = func;
    }
}

module.exports = command;

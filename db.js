const mongoose = require("mongoose");

const mongoDBLink = process.env.DB_LINK;

mongoose.connect(mongoDBLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
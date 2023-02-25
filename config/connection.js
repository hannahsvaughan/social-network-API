const mongoose = require('mongoose');

// WRAP MONGOOSE AROUND LOCAL CONNECTION TO MONGOOSE DB
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// EXPORT CONNECTION
module.exports = mongoose.connection;
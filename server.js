const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// CONNECT TO MONGOOSE - not working yet
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social_networkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// LOG MONGO QUERIES BEING EXECUTED
mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));

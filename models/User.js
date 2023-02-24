const { Schema, model } = require("mongoose");

// SCHEMA TO CREATE USER MODEL
const userSchema = new Schema({
    username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    },
    email: {
    type: String,
    required: "You need to provide an email!",
    unique: true,
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "You need to provide a valid email!"],
    },
    thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: "Thought",
    },
    ],
    friends: [
    {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    ],
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// CREATE VIRTUAL PROPERTY CALLED friendCount THAT RETRIEVES THE LENGTH OF THE USERS friends ARRAY FIELD ON QUERY
userSchema.virtual('friendsCount').get(function() {
    return this.friends.length;
});

// INITALIZE USER MODEL
const User = model('User', userSchema);

module.exports = User;

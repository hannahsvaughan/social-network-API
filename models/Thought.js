const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// SCHEMA TO CREATE THOUGHT MODEL
const thoughtSchema = new Schema(
    {
        thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (presentDate) => moment(presentDate).format('MMM DD, YYY hh:mm a')
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
    },
    {
    toJSON: {
        virtuals: true,
    },
    id: false,
    }
);

// VIRTUAL CALLED reactionCount THAT RETREIVES THE LENGTH OF THE THOUGHT'S reactions ARRAY FIELD ON QUERY
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

// INITALIZE THOUGHT MODEL
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

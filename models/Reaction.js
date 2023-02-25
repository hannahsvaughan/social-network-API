const { Schema, Types } = require('mongoose');

// SCHEMA ONLY
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
            required: true,
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                const newDate = new Date(date);
                return `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`;
            },
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;
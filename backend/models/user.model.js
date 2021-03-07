const mongoose = require('mongoose')

const User = new mongoose.model(
    'User',
    new mongoose.Schema({
        username: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        },
        password: {
            type: String,
        },
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Role',
            },
        ],
    })
)

module.exports = User

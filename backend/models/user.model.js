const mongoose = require('mongoose')

const User = new mongoose.Model(
    'User',
    new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: 'Name is required',
        },
        email: {
            type: String,
            trim: true,
            unique: 'Email already exists',
            match: [/.+\@.+\..+/, 'Please fill a valid email address'],
            required: 'Email is required',
        },
        password: {
            type: String,
            required: 'Password is required',
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

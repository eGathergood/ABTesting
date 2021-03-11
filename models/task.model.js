const mongoose = require('mongoose')

const Task = new mongoose.model(
    'Tasks',
    new mongoose.Schema(
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
            },
            dueDate: {
                type: Date,
            },
        },
        {
            timestamps: true,
        }
    )
)

module.exports = Task

const db = require('../models')

const Task = db.task

// POST /exercises/add
exports.add = (req, res) => {
    const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        dueDate: Date.parse(req.body.date),
    })

    newTask
        .save()
        .then(() => res.json('Task added!'))
        .catch((err) => res.status(400).json('Error: ' + err))
}

// GET /exercises/
exports.getAll = (req, res) => {
    Task.find()
        .then((tasks) => res.json(tasks))
        .catch((err) => res.status(400).json('Error: ' + err))
}

// GET /exercises/:ID
exports.getByID = (req, res) => {
    Task.findById(req.params.id)
        .then((task) => res.json(task))
        .catch((err) => res.status(400).json('Error: ' + err))
}

// Delete /exercises/:ID
exports.delete = (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then((task) => res.json('Task deleted'))
        .catch((err) => res.status(400).json('Error: ' + err))
}

exports.update = (req, res) => {
    Task.findById(req.params.id)
        .then((task) => {
            ;(task.title = req.body.title),
                (task.description = req.body.description),
                (task.dueDate = Date.parse(req.body.date))

            task.save()
                .then(() => res.json('Task updated!'))
                .catch((err) => res.status(400).json('Error: ' + err))
        })
        .catch((err) => res.status(400).json('Error: ' + err))
}

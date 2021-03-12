const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = express()
const db = require('./models')
const dbConfig = require('./config/db.config')
const Role = db.role
const Metric = db.metric

// this lets us use env variables
require('dotenv').config()

const PORT = process.env.PORT || 8080

var corsOptions = {
    origin: 'http://localhost:8081',
}

// let's us parse json and urlencoded tpyes
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors(corsOptions))

const uri = process.env.MONGODB_URI

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'))
// }

db.mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Successfully connected to MongoDB')
        initialiseRoles()
        initialiseMetrics()
    })
    .catch((err) => {
        console.error('Connection error', err)
        process.exit()
    })

// This function initalises roles if the rows collection is empty
function initialiseRoles() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: 'user',
            }).save((err) => {
                if (err) {
                    console.log('error' + err)
                }

                console.log("Added 'user' to roles collection")
            })

            new Role({
                name: 'admin',
            }).save((err) => {
                if (err) {
                    console.log('error' + err)
                }

                console.log("Added 'admin' to roles collection")
            })
        }
    })
}

function initialiseMetrics() {
    Metric.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            // taskViewDelete Metric
            new Metric({
                name: 'taskViewDelete',
                clicks: 0,
            }).save((err) => {
                if (err) {
                    console.log('error' + err)
                }

                console.log("Added 'taskViewDelete' to metrics collection")
            })
            // create task metric
            new Metric({
                name: 'createTask',
                clicks: 0,
            }).save((err) => {
                if (err) {
                    console.log('error' + err)
                }

                console.log("Added 'create task' to metrics collection")
            })

            //edit task metric
            new Metric({
                name: 'editTask',
                clicks: 0,
            }).save((err) => {
                if (err) {
                    console.log('error' + err)
                }

                console.log("Added 'editTask' to metrics collection")
            })

            // editViewDelete metric
            new Metric({
                name: 'editViewDelete',
                clicks: 0,
            }).save((err) => {
                if (err) {
                    console.log('error' + err)
                }

                console.log("Added 'editViewDelete' to metrics collection")
            })
        }
    })
}

app.get('/', (req, res) => {
    res.json({ message: 'Example route.' })
})


app.use(express.static(path.join(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build'))
})

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})

// routes
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)
require('./routes/task.routes')(app)
require('./routes/metric.routes')(app)

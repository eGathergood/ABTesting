const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const db = require('./models')
const dbConfig = require('./config/db.config')
const Role = db.role

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

const uri = process.env.ATLAS_URI

db.mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Successfully connected to MongoDB')
        initial()
    })
    .catch((err) => {
        console.error('Connection error', err)
        process.exit()
    })

// This function initalises roles if the rows collection is empty
function initial() {
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
                name: 'moderator',
            }).save((err) => {
                if (err) {
                    console.log('error' + err)
                }

                console.log("Added 'moderator' to roles collection")
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

app.get('/', (req, res) => {
    res.json({ message: 'Example route.' })
})

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})

// routes
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)

//TODO Basic express setup
const express = require('express')
const massive = require('massive')
require('dotenv').config()
const session = require('express-session')
const postCtrl = require('./controller')
const authCtrl = require('./authController')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

const app = express()

// Top level middleware
app.use(express.json())

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
    secret: SESSION_SECRET,
  })
)

//# Auth endpoints
app.post('/auth/login', authCtrl.login)
app.post('/auth/register', authCtrl.register)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)

//# Posts endpoints
app.get('/api/posts', postCtrl.getPosts)
app.post('/api/posts', postCtrl.addPost)
app.put('/api/posts/:id', postCtrl.editPost)
app.delete('/api/posts/:id', postCtrl.deletePost)
massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
}).then((dbInstance) => {
  app.set('db', dbInstance)
  console.log('DB Connected!')
  app.listen(SERVER_PORT, () =>
    console.log(`Server connected on port ${SERVER_PORT}!`)
  )
})






'use strict'

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT
const router = require('./routers/quiz-router')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Wellcome bro')
})

app.use(router)

app.listen(port, () => {
    console.log(`This awesome app listening on http://localhost:${port}`)
})
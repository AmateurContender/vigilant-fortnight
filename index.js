require('dotenv').config()
const express = require('express')

const Router = require('./routes/index.js')
const app = express()

app.use('/', Router)

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))

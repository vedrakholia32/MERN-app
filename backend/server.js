const express = require('express')
const db = require('./db')
const cors = require('cors')
const app = express()
app.use(cors())

app.use(express.json());

const userDataRoute = require("./routes/userDataRoute");
app.use(userDataRoute)

app.listen(3000);
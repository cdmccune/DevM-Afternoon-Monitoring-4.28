const express = require("express")
const path = require("path")

const app = express()

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '42d1d806099e48d7a7d00d2980a2f080',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')



app.use(express.json())



const port = process.env.PORT || 4545

app.listen(port, () => {console.log(`listening on port ${port}`)})
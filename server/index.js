const express = require("express")
const path = require("path")

const app = express()

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
    rollbar.info('file served')
})


var Rollbar = require('rollbar')
var rollbar = new Rollbar({
    accessToken: '42d1d806099e48d7a7d00d2980a2f080',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

app.get('/test', () => {
try{
    banana()
} catch(error){
    rollbar.error(error)
}})

app.get('/criticalerror', () => {
    try{
        criticalerrors()
    } catch(error){
        rollbar.critical(error)
    }})

app.get('/warning', () => {
try{
    warnings()
} catch(error){
    rollbar.warning(error)
}})


// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.use(express.json())



const port = process.env.PORT || 4545

app.use(rollbar.errorHandler())

app.listen(port, () => {console.log(`listening on port ${port}`)})
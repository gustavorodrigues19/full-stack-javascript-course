const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(express.static('.')) // provide all static files`
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/test', (req, res) => res.send('ok'))
app.listen(8080, ()=> console.log('Server is running...'))
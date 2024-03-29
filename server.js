const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
// var compression = require('compression');

const app = express()

// for bad network connections
// app.use(compression())

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/build')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, '/build/index.html'))
})

const port = process.env.PORT || 3000
app.listen(port)
console.log(`app is listening on port: ${port}`)
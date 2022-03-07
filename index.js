var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var routeSaya = require('./route')
var fire = require('./fire')
var app = express()
app.use(cors())
app.use(bodyParser.json())
// app.use(routeSaya)
var db = fire.firestore()

app.get('/set', (req, res) => {
    db.settings({
        timestampsInSnapshots: true
    })
    db.collection('data').doc(req.query.password).set({
        command: req.query.command,
        latitude: req.query.latitude,
        longtitude: req.query.longtitude,
        status: req.query.status,
        waktu: new Date()
    })
    res.send({
        command: req.query.command,
        latitude: req.query.latitude,
        longtitude: req.query.longtitude,
        status: req.query.status,
        waktu: new Date()
    })
})

app.get('/get', (req, res) => {
    db.settings({
        timestampsInSnapshots: true
    })
    var data = db.collection('data').doc(req.query.password)
    data.get().then((doc) => {
        if(doc.exists) {
            res.send(doc.data())
        }else {
            res.send('empty')
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    })
})

app.listen(3210, () => {
    console.log('Server aktif @port 3210')
})
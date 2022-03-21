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

app.get('/', (req, res) => {
    res.send('https://www.github.com/maldinipunisher')
})

app.get('/setup', (req, res) => {
    if(req.query.password){
        db.collection('data').doc(req.query.password).set({
            lock: req.query.lock,
            alarm: req.query.alarm,
            status: req.query.status,
            waktu: new Date(),
        })
    }
    res.send({
        lock: req.query.lock,
        alarm: req.query.alarm,
        status: req.query.status,
        waktu: new Date(),
    })
})

app.get('/set', (req, res) => {
    var params =  new Object() 

    if(req.query.lock ) {
        params.lock = req.query.lock
    }
     if(req.query.alarm) {
        params.alarm = req.query.alarm
    }
    if(req.query.latitude) {
        params.latitude = req.query.latitude
    }
    if(req.query.longtitude){
        params.longtitude = req.query.longtitude
    }
     if(req.query.status){
        params.status = req.query.status
    }
     if(req.query.ontime) {
        params.ontime = req.query.ontime
    }
    var password = req.query.password
    params.waktu = new Date()

    if(password) {
        db.collection('data').doc(req.query.password).update(params)
    }
    res.send(JSON.stringify(params))
})

app.get('/get', (req, res) => {
    // db.settings({
    //     timestampsInSnapshots: true
    // })
    var data = db.collection('data').doc(req.query.password)
    data.get().then((doc) => {
        if(doc.exists) {
            var jsonObj = new Object() 
            // jsonObj.coor = doc.data()['latitude'] + "," +doc.data()['longtitude']
            jsonObj.lock = doc.data()['lock']
            jsonObj.alarm = doc.data()['alarm']
            jsonObj.status = doc.data()['status']

            res.send(JSON.stringify(jsonObj))
            console.log(req.socket.bytesRead)
        }else {
            res.send('empty')
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    })
})

app.listen(process.env.PORT || 80, () => {
    console.log('Server aktif @port 3210')
})

// app.listen(3210, () => {
//         console.log('Server aktif @port 3210')
//     })
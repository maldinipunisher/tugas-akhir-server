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

app.get('/set', (req, res) => {
    db.collection('data').doc(req.query.password).set({
        command: req.query.command,
        latitude: req.query.latitude,
        longtitude: req.query.longtitude,
        status: req.query.status,
        waktu: new Date(),
        ontime : req.query.ontime, 
    })
    res.send({
        command: req.query.command,
        latitude: req.query.latitude,
        longtitude: req.query.longtitude,
        status: req.query.status,
        waktu: new Date(),
        ontime : req.query.ontime, 

    })
})

app.get('/get', (req, res) => {
    // db.settings({
    //     timestampsInSnapshots: true
    // })
    var data = db.collection('data').doc(req.query.password)
    data.get().then((doc) => {
        if(doc.exists) {
            var jsonObj = '{"latitude":' +  doc.data()['latitude'] + ', "command" : ' +  doc.data()['command'] + ',"waktu":'  + doc.data()['waktu'] + ', "status" : '  + doc.data()['status'] + ',"longtitude" : ' + doc.data()['longtitude']
            JSON.parse(jsonObj)

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
var express = require('express')
var bodyParser = require('body-parser')
const axios = require('axios')
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
    if (req.query.password) {
        db.collection('data').doc(req.query.password).set({
            lock: req.query.lock,
            alarm: req.query.alarm,
            status: req.query.status,
            waktu_mulai: new Date(),
            waktu: new Date(),
        })
    }
    res.send({
        lock: req.query.lock,
        alarm: req.query.alarm,
        status: req.query.status,
        waktu_mulai: new Date(),
        waktu: new Date(),
    })
})

app.get("/send-notification", (req, res) => {
    let headers = {
        "Authorization": "key=AAAAZ5ttDVo:APA91bHo9nUceYkV41q8mCy-GlSh2cHXJxMGVTVSxuDf3zfClsTJPH5teZgzC1ncPM4eLOAD2fmggROy8C2J5CRHfuxlo_Rjrj0-nzS1bXwL3x55hqcI4r-AAE0uAAhWMAQxOLU6Batq",
        "Content-Type": "application/json",
    }

    if (req.query.alarm) {
        let body = {
            "to": "/topics/fcm_test",
            "notification": {
                "body": "Peringatan alarm pada kendaraan anda telah berbunyi",
                "title": "Alarm berbunyi",
                "sound": "default",
            }
        }
        // res.send(JSON.stringify(body))
        // res.send(body)
        axios.post('https://fcm.googleapis.com/fcm/send', body, {headers : headers})
            .then(function (response) {
                console.log(response.data);
                res.send(response.data);
                // res.json({
                //     data: JSON.stringify(response)
                // })
            })
            .catch(function (error) {
                console.log(error);
                res.send({
                    status: '500',
                    message: error
                })
            });
    }
});

app.get('/set', (req, res) => {
    var params = new Object()

    if (req.query.lock) {
        params.lock = req.query.lock
    }
    if (req.query.alarm) {
        params.alarm = req.query.alarm
    }
    if (req.query.latitude) {
        params.latitude = req.query.latitude
    }
    if (req.query.longtitude) {
        params.longtitude = req.query.longtitude
    }
    if (req.query.status) {
        params.status = req.query.status
    }
    if (req.query.ontime) {
        params.ontime = req.query.ontime
    }
    var password = req.query.password
    params.waktu = new Date()

    if (password) {
        db.collection('data').doc(req.query.password).update(params)
    }
    let response = JSON.stringify(params)
    res.json(JSON.parse(response))
})

app.get('/get', (req, res) => {
    // db.settings({
    //     timestampsInSnapshots: true
    // })
    var data = db.collection('data').doc(req.query.password)
    data.get().then((doc) => {
        if (doc.exists) {
            var jsonObj = new Object()
            // jsonObj.coor = doc.data()['latitude'] + "," +doc.data()['longtitude']
            jsonObj.lock = doc.data()['lock']
            jsonObj.alarm = doc.data()['alarm']
            jsonObj.status = doc.data()['status']
            let response = JSON.stringify(jsonObj)
            // res.json(JSON.stringify(jsonObj))
            res.json(JSON.parse(response))
            // console.log(req.socket.bytesRead)
        } else {
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
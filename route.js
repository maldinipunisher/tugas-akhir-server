var router = require('express').Router()
var fire = require('./fire')
var bodyParser = require('body-parser')
var db = fire.firestore()
router.use(bodyParser.json())

router.get('/arduino', (req, res)=>{
    db.settings({
        timestampsInSnapshots: true
    })
    var allData = []
    db.collection('data')
    .orderBy('waktu', 'desc').get()
    .then(snapshot => {
        snapshot.forEach((hasil)=>{
            allData.push(hasil.data())
        })
        console.log(allData)
        res.send(allData)
    }).catch((error)=>{
        console.log(error)
    })
})

router.get('/arduino', (req, res)=>{
    // db.settings({
    //     timestampsInSnapshots: true
    // })
    // db.collection('data').add({
    //     command: req.query.command,
    //     latitude: req.query.latitude,
    //     longtitude: req.query.longtitude,
    //     status : req.query.status, 
    //     waktu: new Date()
    // })
    res.send({
        command: req.query.command,
        latitude: req.query.latitude,
        longtitude: req.query.longtitude,
        status : req.query.status, 
        waktu: new Date()
    })
})

module.exports = router
var firebase = require('firebase')
// var config = {
//     apiKey: "Aizn21bjkabdwa",
//     authDomain: "bots-fed6f.firebaseapp.com",
//     databaseURL: "https://bots-fed6f-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "bots-fed6f",
//     storageBucket: "bots-fed6f.appspot.com",
//     messagingSenderId: "2114231411321",
//     appId: "1:41231253221313",
//     measurementId: "G-WDAJKDSAF"
// };
var config = YOURCONFIG

var fire = firebase.initializeApp(config);
module.exports = fire

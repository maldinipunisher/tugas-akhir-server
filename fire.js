var firebase = require('firebase')
var config = {
    apiKey: "AIzaSyB2JRWlQknMpl5Ptzi_q_fWJrZs8pT_S2c",
    authDomain: "bots-fed6f.firebaseapp.com",
    databaseURL: "https://bots-fed6f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bots-fed6f",
    storageBucket: "bots-fed6f.appspot.com",
    messagingSenderId: "444989246810",
    appId: "1:444989246810:web:384ac3b15cc07faf317763",
    measurementId: "G-KF5F80DXPF"
};

var fire = firebase.initializeApp(config);
module.exports = fire
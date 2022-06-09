var firebase = require('firebase')

var firebaseConfig = {
    apiKey: "AIzaSyAjutuuUPAsaJh_7HBd0HVQ_6SHeclNTCw",
    authDomain: "carnet-de-chants-130f7.firebaseapp.com",
    databaseURL: "https://carnet-de-chants-130f7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "carnet-de-chants-130f7",
    storageBucket: "carnet-de-chants-130f7.appspot.com",
    messagingSenderId: "251921900124",
    appId: "1:251921900124:web:98587cb22c193f6fedfc99"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = firebase;
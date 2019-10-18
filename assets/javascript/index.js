$(document).ready(function () {
    console.log("test");
    var firebaseConfig = {
        apiKey: "AIzaSyB0Fudim7_5XFhEO-5YfgU5fQAHRRm0arc", // This key will be different for every Firebase project
        authDomain: "trainschedule-885c6.firebaseapp.com",
        databaseURL: "https://trainschedule-885c6.firebaseio.com",
        projectId: "trainschedule-885c6",
        storageBucket: "trainschedule-885c6.appspot.com",
        messagingSenderId: "249684455785",
        appId: "1:249684455785:web:0f232f5e1b138fade4cdf8"
    };
    
    firebase.initializeApp(firebaseConfig); // Initialize Firebase

    let trainDatabase = firebase.database();
    trainDatabase.ref().push({ //set overwrites to firebase
        test: 98765
    });
    trainDatabase.ref().push({ //write to firebase
        test2: "abcde"
    });
    trainDatabase.ref().once('value').then(function (snapshot) {
        console.log(snapshot.val()); //read from firebase
    })
})
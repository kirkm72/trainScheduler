var fbaseCfg = { // Firebase info below is unique for every firebase DB setup
    apiKey: "AIzaSyB0Fudim7_5XFhEO-5YfgU5fQAHRRm0arc", // This key will be different for every Firebase project
    authDomain: "trainschedule-885c6.firebaseapp.com",
    databaseURL: "https://trainschedule-885c6.firebaseio.com",
    projectId: "trainschedule-885c6",
    storageBucket: "trainschedule-885c6.appspot.com",
    messagingSenderId: "249684455785",
    appId: "1:249684455785:web:0f232f5e1b138fade4cdf8"
};
firebase.initializeApp(fbaseCfg); // Initialize Firebase
console.log("Firebase config completed");

$(document).ready(function () {
    //console.log("After doc.ready");
    // const trainDbase = firebase.database().ref('train/'); do not set the ref here
    trainDbase = firebase.database();
    // trainDbase.ref('train/').push({ //set overwrites to firebase USE A REFERENCE
    //     test: 98765
    // });
    //console.log("first push");
    // trainDbase.ref('train/').push({ //write to firebase
    //     test2: "abcde"
    // });
    //console.log("second push");
    // trainDbase.ref('train/').once('value').then(function (snapshot) {
    //     console.log(snapshot.val()); //read from firebase
    

// Form input section
$(document).on("click", ".addBtn", function (event) { 
    event.preventDefault();
    //console.log("After on Click");
    let addCity = $("#inputCity").val().trim();
    let addName = $("#inputName").val().trim();
    let addInt = $("#inputInterval").val();
    let addTime = $("#inputTime").val().trim();
    console.log("before sent to fBase", addName, addCity, addInt, addTime);
    $("#form").get(0).reset(); //native javascript: resets input form after submission

    trainDbase.ref('train/').push({ //set overwrites to firebase, use push
        name: addName,
        city: addCity,
        interval: addInt,
        time: addTime
    });

    trainDbase.ref('train/').once('value').then(function (snapshot) {
    console.log(snapshot.val()); //read from firebase
    });
});

});
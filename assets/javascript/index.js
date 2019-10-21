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

var addCity=""; // These variables must be in root scopr or second event listener will not see value
var addName="";
var addInt=0;
var addTime="";
var removeName="";

$(document).ready(function () {
    trainDbase = firebase.database();

// Form input section
$(document).on("click", ".addBtn", function (event) { 
    event.preventDefault();
    addCity = $("#inputCity").val().trim();
    addName = $("#inputName").val().trim();
    addInt = $("#inputInterval").val();
    addTime = $("#inputTime").val().trim();
    console.log("before sent to fBase", addName, addCity, addInt, addTime);
    $("#form").get(0).reset(); //native javascript: resets input form after submission

    // Writes to fBase
    trainDbase.ref('train/'+addName).update({ //set overwrites to firebase, use update
        name: addName,
        city: addCity,
        interval: addInt,
        time: addTime
    });

    // Update DOM table with listed trains
    

    trainDbase.ref('train/').once('value').then(function (snapshot) { // investigate diff between on & once
    console.log(snapshot.val()); //read from firebase
    });
}); //submit button braces

$(document).on("click", ".remove", function (event) {
    event.preventDefault();
    console.log("inside remove button listener looking for ", addName);
    trainDbase.ref("train/"+addName).remove();
});

}); // doc.ready braces
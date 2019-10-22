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
//console.log("Firebase config completed");

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
    let row = $('<tr>');
    let th = $('<th scope="row">'); //Header will have same classname as addName
    let td1 = $('<td>'); // Destination City
    let td2 = $('<td>'); // Time Interval
    let td3 = $('<td>'); // 1st Time
    let td4 = $('<td>'); // Military time TBD moment JS
    let td5 = $('<td>'); // Standard Time TND moment JS
    let td6 = $('<td>'); // Removal Button
    th.text(addName);    // Train Name
    th.addClass(addName); // Header will have same classname as addName
    td1.text(addCity);    // Destination City
    td2.text(addInt);     // Time Interval
    td3.text(addTime);  // First Time
    td4.text('military');   // Military time TBD moment JS
    td5.text('standard');   // Standard Time TND moment JS
    td6.addClass('btn btn-primary remove'); //Removal button classes
    td6.text(addName);  // Button Text
    row.append(th);
    row.append(td1);
    row.append(td2);
    row.append(td3);
    row.append(td4);
    row.append(td5);
    row.append(td6);
    $("#table").append(row); //works

    trainDbase.ref('train/').once('value').then(function (snapshot) { // investigate diff between on & once
    console.log(snapshot.val()); //read from firebase
    });
}); //submit button braces

$(document).on("click", ".remove", function (event) { // Remove from Fbase & DOM
    event.preventDefault(); // First part removed from Fbase
    let value = $(this).text();
    // console.log(value);
    trainDbase.ref("train/"+value).remove(); //succesfully removed from Fbase
    // let tmp = "." + this;
    // console.log(tmp);
    if($('<th>').hasClass(this)){
        $('<th>').remove();
    };

});

}); // doc.ready braces
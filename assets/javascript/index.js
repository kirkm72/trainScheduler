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

var addCity = ""; // These variables must be in root scope or second event listener will not see value
var addName = "";
var addInt = 0;
var addTime = "";
var removeName = "";

setInterval(() => { // Interval set for timer to seed MomentJS
    const now = moment();
    let mTime = now.format('HH:mm:ss');  //Military time format
    let sTime = now.format('h:mm:ss A'); //Standard time format
    $('#mClock').text(mTime);
    $('#sClock').text(sTime);
}, 1000);

$(document).ready(function () {
    trainDbase = firebase.database();

    // Form input section
    $(document).on("click", ".addBtn", function (event) { // Even listener for submit button
        event.preventDefault();
        addCity = $("#inputCity").val().trim();
        addName = $("#inputName").val().trim();
        addInt = $("#inputInterval").val();
        addTime = $("#firstTrain").val();
        
        trainDbase.ref('train/' + addName).update({ //set overwrites to firebase, use update
            name: addName,
            city: addCity,
            interval: addInt,
            time: addTime
        });
        $("#form").get(0).reset(); //native javascript: resets input form after submission. 
        //Must be placed after firebase write or else will input the "option selected" field in to fBase.
        //See line 70 of index.html

    }); //submit button braces

    trainDbase.ref('train/').on("child_added", function (snapshot, prevChildKey) {
        // Update DOM table with listed trains
        let Name = snapshot.val().name;
        let City = snapshot.val().city;
        let Int = snapshot.val().interval;
        let firstTime = snapshot.val().time;
        var now = moment();

        // Update DOM
        let row = $('<tr>');
        let th = $('<th scope="row">'); //Header will have same classname as addName
        let td1 = $('<td>');  // Origin City
        let td2 = $('<td>');  // Time Interval
        let td3 = $('<td>');  // 1st Time
        let td4 = $('<td>');  // Military time TBD moment JS
        th.text(Name);     // Train Name
        th.addClass(Name); // Header will have same classname as addName
        td1.text(City);    // Origin City
        td2.text(Int + "th Minute");     // Time Interval
        if (firstTime === "00:00") { // Conditionally show "Noon" or "Midnight"
            td3.text("Midnight");
        } else if (firstTime === "12:00") {
            td3.text("Noon");
        } else {
            td3.text(firstTime);
        };
        if (Int >= (moment().minute())) {
            let next = Int - moment().minute();
            td4.text(next + " Minutes");
        }
        if (Int < now.minute()){
            let next = 60 - parseInt(now.minute()) + parseInt(Int); 
            td4.text(next + " Minutes");
        }
        row.append(th);
        row.append(td1);
        row.append(td2);
        row.append(td3);
        row.append(td4);
        row.addClass(addName);
        $("#table").append(row); //works

    });
}); // doc.ready braces
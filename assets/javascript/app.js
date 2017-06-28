// Initialize Firebase
var config = {
  apiKey: "AIzaSyB6MmoN4_FXPK9RZOGDUhD-xRwEl5WHdqk",
  authDomain: "trainscheduler-b64ba.firebaseapp.com",
  databaseURL: "https://trainscheduler-b64ba.firebaseio.com",
  projectId: "trainscheduler-b64ba",
  storageBucket: "trainscheduler-b64ba.appspot.com",
  messagingSenderId: "558962006910"
};
firebase.initializeApp(config);

var database = firebase.database();
var dataRef = database.ref("/trains");

var name;
var destination;
var time;
var frequency;

function createRow() {
  var tr = $("<tr>");
  tr.append($("<td>").text(name));
  tr.append($("<td>").text(destination));
  tr.append($("<td>").text(frequency));
  tr.append($("<td>").text("NEXT TIME"));
  tr.append($("<td>").text("MINUTES AWAY"));
  $("#train-info").append(tr);
}

dataRef.on("child_added", function(snapshot) {

  name = snapshot.val().name;
  destination = snapshot.val().destination;
  time = snapshot.val().time;
  frequency = snapshot.val().frequency;

  createRow();

});

$("#add-train").on("click", function() {
  event.preventDefault();

  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  time = $("#time-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  $("#name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

  dataRef.push({
    name: name,
    destination: destination,
    time: time,
    frequency: frequency
  });

});


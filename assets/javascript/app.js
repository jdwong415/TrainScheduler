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
var minutesAway;
var nextTime;

function createRow(key) {
  var tr = $("<tr id='" + key + "'>");
  tr.append($("<td>").text(name));
  tr.append($("<td>").text(destination));
  tr.append($("<td>").text(frequency));
  tr.append($("<td>").text(nextTime));
  tr.append($("<td>").text(minutesAway));
  var close = "<button type='button' class='close' aria-label='Close'>" +
    "<span aria-hidden='true'>&times;</span></button>";
  tr.append($("<td>").html(close));
  $("#train-info").append(tr);
}

function calculateTime() {
  var convertedTime = moment(time, "HH:mm");
  var diffTime = moment().diff(convertedTime, "minutes");
  minutesAway = frequency - (diffTime % frequency);
  nextTime = moment().add(minutesAway, "minutes").format("hh:mm a");
}

dataRef.on("child_added", function(snapshot) {

  name = snapshot.val().name;
  destination = snapshot.val().destination;
  time = snapshot.val().time;
  frequency = snapshot.val().frequency;

  calculateTime();

  createRow(snapshot.key);

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

$(document).on("click", ".close", function() {
  console.log($(this).parent().parent().attr("id"));
  var key = $(this).parent().parent().attr("id");
  dataRef.child(key).remove();
  $(this).parent().parent().remove();

});
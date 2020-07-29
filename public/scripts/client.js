$(document).ready(onReady);

let operator = "";
// click listeners, function that fires on page load
function onReady() {
  $("#multiplyButton").on("click", multiplyFunction);
  $("#divideButton").on("click", divideFunction);
  $("#subtractButton").on("click", subtractFunction);
  $("#addButton").on("click", addFunction);
  $("#equalsButton").on("click", getResults);
  $("#clearButton").on("click", clearNumbers);
  backFromServer();
}

function clearNumbers() {
  $("#numberOne").val(" "), $("#numberTwo").val(" ");
}

function getResults() {
  let numbersToSend = {
    numberOne: $("#numberOne").val(),
    numberTwo: $("#numberTwo").val(),
    operator: operator,
  };

  // send to server via ajax post

  $.ajax({
    type: "POST",
    url: "/addition",
    data: JSON.stringify(numbersToSend),
    contentType: "application/json; charset=utf-8",
  })
    .then(function (response) {
      //   console.log("back from POST", response);
      backFromServer();
    })
    .catch(function (err) {
      alert("error posting addition");
      console.log(err);
    });
  //empty the inputs so new numbers can be added
  $("#numberOne").val("");
  $("#numberTwo").val("");
}
// functions that determine which operator will be sent to the server
function addFunction() {
  operator = "+";
}
function subtractFunction() {
  operator = "-";
}
function multiplyFunction() {
  operator = "*";
}
function divideFunction() {
  operator = "/";
}
// get request back from the server with out math problem solved.
function backFromServer() {
  $.ajax({
    type: "GET",
    url: "/calculations",
  })
    .then(function (response) {
      console.log("back from Get", response);
      let el = $("#results");
      el.empty();
      let answer = $("#answerOut");

      //loop through responses
      for (let i = 0; i < response.length; i++) {
        //append to DOM here
        el.append(
          `<li>${response[i].numberOne} ${response[i].operator} ${response[i].numberTwo} = ${response[i].result}</li>`
        );
        // empty answers
        answer.empty();
        answer.append(`${response[i].result}`);
      }
    })
    .catch(function (err) {
      alert("error posting /calculations");
      console.log(err);
    });
}

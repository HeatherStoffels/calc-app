// add requires
const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
// add uses
app.use(express.static("server/public"));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// set up port

//heroku || 5000
const port = process.env.PORT || 5000;
// area for variables
let calculatedResult = 0;
let finishedCalculations = [];
let allResults = [
  // test object  {
  //     numberOne: 7,
  //     numberTwo: 5,
  //     operator: "add",
  //     result: 12,
  //   },
];
// set up app to listen for port 5000
app.listen(port, () => {
  console.log("in port:", port);
});

// app.get("/addition", (req, res) => {
//   console.log("in /addition", allResults);
//   res.send(allResults);
// });

// send get request back to client side with calculations
app.get("/calculations", (req, res) => {
  res.send(finishedCalculations);
});
// getting post from client side with object to compute
app.post("/addition", (req, res) => {
  allResults.unshift(req.body);
  finishedCalculations.push({
    numberOne: req.body.numberOne,
    numberTwo: req.body.numberTwo,
    operator: req.body.operator,
    result: calculateAnswer(),
  });
  //   console.log(allResults)
  res.send(finishedCalculations);
});

// compute numbers function, if object.operator = "add" then push to array under answer
function calculateAnswer() {
  if (allResults[0].operator === "+") {
    calculatedResult =
      parseInt(allResults[0].numberOne) + parseInt(allResults[0].numberTwo);
  } else if (allResults[0].operator === "-") {
    calculatedResult =
      parseInt(allResults[0].numberOne) - parseInt(allResults[0].numberTwo);
  } else if (allResults[0].operator === "*") {
    calculatedResult =
      parseInt(allResults[0].numberOne) * parseInt(allResults[0].numberTwo);
  } else {
    allResults[0].operator === "/";
    calculatedResult =
      parseInt(allResults[0].numberOne) / parseInt(allResults[0].numberTwo);
  }
  return calculatedResult;
}
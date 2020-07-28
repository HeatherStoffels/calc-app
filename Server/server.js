const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
// add uses
app.use(express.static("server/public"));
app.use(express.json());

const port = process.env.PORT || 5000;
// area for variables
let calculatedResult = 0;
let finishedCalculations = [];
let allResults = [];

app.listen(port, () => {
    console.log("in port:", port);
  });

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
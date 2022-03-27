const express = require("express");

const connect = require("./configs/db");

const usersController = require("./controllers/user.controllers");
const studentsController = require("./controllers/student.controller");
const batchController = require("./controllers/batch.controller");
const evaluateController = require("./controllers/evaluate.controller");
const submitController = require("./controllers/submit.controller");

const app = express();

app.use(express.json());

app.use("/user", usersController); 
app.use("/student", studentsController);
app.use("/batch", batchController);
app.use("/evaluate",evaluateController)
app.use("/submit",submitController)

app.listen(4000, async () => {
    try {
      await connect();
    } catch (err) {
      console.log(err);
    }
  
    console.log("listening on port 4000");
  });




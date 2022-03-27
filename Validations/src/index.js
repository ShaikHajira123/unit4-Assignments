const express = require("express");

const connect = require("./configs/db");

const usersController = require("./controllers/user.controllers");

const app = express();

app.use(express.json());

app.use("/user", usersController); 



app.listen(2000, async function () {
  try {
    await connect();
    console.log("listening on port 5000");
  } catch (err) {
    console.error(err.message);
  }
});

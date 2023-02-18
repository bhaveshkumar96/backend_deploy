const express = require("express");
const { connection } = require("./db");
const { authentication } = require("./Middlewares/auth.middleware");
const { noteRouter } = require("./Routes/note.routes");
const { userRouter } = require("./Routes/user.routes.js");
var cors = require('cors')
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("HOME");
});
app.use("/users", userRouter);
app.use("/notes",noteRouter)
app.use(authentication)
app.use(cors())

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
  console.log("server is running at port 8080");
});

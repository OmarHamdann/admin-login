const express = require("express");
const cors = require("cors");

//read env variables
require("dotenv").config();


const app = express();

//built-in middleware
app.use(cors());
app.use(express.json());

//routers
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");


app.use("/users", usersRouter);
app.use("/login", loginRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});

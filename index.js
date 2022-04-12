const express = require("express");
const cors = require("cors");
const path = require("path");
//read env variables
require("dotenv").config();


const app = express();

//built-in middleware
app.use(cors());
app.use(express.json());

//routers
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");

//endpionts
app.use("/users", usersRouter);
app.use("/login", loginRouter);

//run server in port 5000

const PORT = 5000;
//for heroku deployment
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
}
app.get('*',(req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});

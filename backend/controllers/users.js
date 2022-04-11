const connection = require("../database/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const createNewUser = async (req, res) => {
  const { userName, email, password } = req.body;
  let encryptedPassword = "";
  if (password) {
    encryptedPassword = await bcrypt.hash(password, saltRounds);
  }
  const query = `INSERT INTO users ( userName,email, password) VALUES (?,?,?)`;
  const data = [userName, email, encryptedPassword];
  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: "have a problem with the server",
        err: err,
      });
    }
    // result are the data returned by mysql server
    res.status(200).json({
      success: true,
      massage: "Success user Added",
      results: results,
    });
  });
};

/////////////////////////////////////////////////////////////////////////////////////
//get all users

const getAllUsers = (req, res) => {
  const query = `SELECT * FROM users`;

  connection.query(query, (err, result, field) => {
    if (err) {
      res.json({ success: false, massege: "server erorr", err: err });
      res.status(500);
    } else {
      res.json({ success: true, massege: "All the users", result: result });
      res.status(200);
    }
  });
};

///////////////////////////////////////////////////////////////////////////////////////////////////=================================================

module.exports = {
  createNewUser,
  getAllUsers,
};
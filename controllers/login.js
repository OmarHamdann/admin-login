const connection = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();

  const query = `SELECT email,password,id FROM users WHERE email=?`;
  const data = [email];
  connection.query(query, data, (err, results) => {
    if (results.length > 0) {
      //check password is correct or not
      bcrypt.compare(password, results[0].password, (err, respons) => {
        if (err) res.json(err);
        if (respons) {
          //create token for user
          const paylod = {
            userId: results[0].id,
            userName: results[0].userName,
          };
          // sign token with payload and secret key
          const secret = process.env.SECRET;
          const token = jwt.sign(paylod, secret);

          res.status(200).json({
            success: true,
            message: "Valid login credentials",
            token,
            userName: results[0].usr,
            userId: results[0].id,
          });
        } else {
          res.status(403).json({
            success: false,
            message: `The password is incorrect`,
            err,
          });
        }
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: "The email doesn't exist", err });
    }
  });
};

module.exports = {
  login,
};

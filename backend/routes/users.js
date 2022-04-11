const express = require("express");

const { createNewUser, getAllUsers,updateUserById } = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.post("/", createNewUser);
usersRouter.get("/", getAllUsers);
usersRouter.put("/:id", updateUserById);


module.exports = usersRouter;

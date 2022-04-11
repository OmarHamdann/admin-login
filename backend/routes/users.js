const express = require("express");

const { createNewUser, getAllUsers,updateUserById,deleteUserById } = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.post("/", createNewUser);
usersRouter.get("/", getAllUsers);
usersRouter.put("/:id", updateUserById);
usersRouter.delete("/:id", deleteUserById);



module.exports = usersRouter;

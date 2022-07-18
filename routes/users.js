const express = require("express");
const routerUsers = express.Router();
const userController = require("../controllers/usercontroller");

routerUsers.post("/", userController.addUser);
routerUsers.get("/", userController.getAllUsers);
routerUsers.get("/:id", userController.getUserById);
routerUsers.put("/:id", userController.updateUser);
routerUsers.patch("/:id/:partnerCode", userController.inputPartnerCode);
routerUsers.delete("/:id", userController.deleteUser);

module.exports = routerUsers;

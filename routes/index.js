"use strict";
const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;

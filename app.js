require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes/index");
app.use(cors());
app.use(express.urlencoded({ extended: true, limit:'50mb' }));
app.use(express.json({limit:'50mb'}));
app.use(router);

module.exports = app;

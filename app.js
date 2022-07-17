"use strict";
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;
const routerApp = require("./routers/app-quiz");

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/app", routerApp);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

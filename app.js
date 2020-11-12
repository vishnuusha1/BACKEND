const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("../backend/config/db");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
const auth = require("../backend/routers/auth");

dotenv.config();

app.get("/", (req, res) => {
  res.json("hello world");
});

app.use("/auth", auth);
const port = process.env.PORT || 3003;
app.listen(port, () => console.log("server running sucessfully...."));

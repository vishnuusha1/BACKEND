const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (!error) {
      console.log("Success");
    } else {
      console.log("Error");
    }
  }
);

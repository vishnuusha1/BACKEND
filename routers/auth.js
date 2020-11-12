const router = require("express").Router();
const { registrationValidation } = require("../validator/validator");
const { loginValidation } = require("../validator/validator");
const { checkEmail } = require("../validator/validator");
const { hashPassword } = require("../helper/helper");
const { validPassword } = require("../validator/validator");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

/**
 *@author vishnu r
 *@description registration api
 *@date 12/11/2020
 */
router.post("/register", async (req, res) => {
  console.log(req.body, "hloo");
  const { error } = await registrationValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  const userexist = await checkEmail(req.body.email);
  if (userexist) return res.status(400).send(" email already exist");

  const salt = await bcrypt.genSalt(10);
  console.log(salt, "ffffffffff");
  const hashedpassword = await hashPassword(req.body.password, salt);

  const user = new User();
  user["username"] = req.body.username;
  user["password"] = hashedpassword;
  user["email"] = req.body.email;

  try {
    const senduser = await user.save();

    return res.send({ senduser });
  } catch (err) {
    return res.status(502).json({ message: err });
  }
});

/**
 *@author vishnu r
 *@description login api
 *@date 12/11/2020
 */
router.post("/login", async (req, res) => {
  console.log(req.body, "hloo");
  const { error } = await loginValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  const user = await checkEmail(req.body.email);

  if (!user) return res.status(400).send("invalid email");
  const validpassword = await validPassword(req.body.password, user.password);

  if (!validpassword) return res.status(400).send("invalid password");
  try {
    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
    return res.header("auth-token", token).send(token);
  } catch (err) {
    return res.status(502).json({ message: err });
  }
});

router.get("/", async (req, res) => {
  console.log(req.headers["authorization"], "hloo");
  let decoded;
  if (req.headers && req.headers["authorization"]) {
    var authorization = req.headers.authorization;
    try {
      decoded = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET);
      var userId = decoded.id;
      const user = await User.findOne({ _id: userId });
      return res.status(200).json({ user: user });
    } catch (err) {
      return res.status(401).send("unauthorized");
    }
  }
});
module.exports = router;

const Joi = require("@hapi/joi");
const { check } = require("express-validator");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const registrationValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  });
  console.log("data", data);
  return schema.validate(data);
};

const loginValidation = (data) => {
  const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  });

  return loginSchema.validate(data);
};
const checkEmail = async (email) => {
  return await User.findOne({ email: email });
};

const validPassword = async (password, userpassword) => {
  const data = await bcrypt.compare(password, userpassword);
  return data;
};

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;
module.exports.checkEmail = checkEmail;
module.exports.validPassword = validPassword;
module.exports.checkEmail = checkEmail;

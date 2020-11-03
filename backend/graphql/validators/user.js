const Joi = require("joi");

const firstName = Joi.string().max(255).required().label("First name");
const lastName = Joi.string().max(255).required().label("Last name");
const email = Joi.string().email().required().label("Email");
const password = Joi.string()
  .min(8)
  .max(30)
  .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"));
const confirmPassword = Joi.ref("password");

const signInValidationSchema = Joi.object({
  email,
  password,
});

const signUpValidationSchema = Joi.object({
  email,
  firstName,
  lastName,
  password,
  confirmPassword,
});

const updateUserValidationSchema = Joi.object({
  firstName,
  lastName,
});

const updatePasswordValidationSchema = Joi.object({
  password,
  confirmPassword,
});

module.exports.signInValidationSchema = signInValidationSchema;
module.exports.signUpValidationSchema = signUpValidationSchema;
module.exports.updateUserValidationSchema = updateUserValidationSchema;
module.exports.updatePasswordValidationSchema = updatePasswordValidationSchema;

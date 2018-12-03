const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  console.log(data.name);

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirmation = !isEmpty(data.passwordConfirmation)
    ? data.passwordConfirmation
    : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must between 2 and 30 characters.";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required.";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid email address.";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must contain a minimum of 6 characters.";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required.";
  }

  if (!validator.isLength(data.passwordConfirmation, { min: 6, max: 30 })) {
    errors.passwordConfirmation =
      "Password must contain a minimum of 6 characters.";
  }

  if (!validator.equals(data.passwordConfirmation, data.password)) {
    errors.passwordConfirmation = "Passwords do not match.";
  }

  if (validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = "Password confirmation field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

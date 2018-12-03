const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCommentInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 5, max: 300 })) {
    errors.text = "Comment content should be between 5 and 300 characters.";
  }

  if (validator.isEmpty(data.text)) {
    errors.text = "Text field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

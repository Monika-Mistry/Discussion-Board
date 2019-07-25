const Validator = require("validator");

const isEmpty = require("./isEmpty");

const validateItemInput = data => {
    let errors = {};

    //if the values are not present, change to empty strings
    data.username = !isEmpty(data.username) ? data.username : "";

    //item validation rules

    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
    }

    if (!Validator.isAlphanumeric(data.username)) {
        errors.username = "Username invalid: can only contain letters and numbers"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateItemInput;
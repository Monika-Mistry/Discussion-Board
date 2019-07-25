const validator = require("validator");

const isEmpty = require("./isEmpty");

function validateItemInput(data) {
    let errors = {};

    //if the values are not present, change to empty strings
    data.username = !isEmpty(data.username) ? data.username : "";

    //item validation rules
    if (!validator.isAlphanumeric(data.username)) {
        errors.username = "Username invalid: must contain letters and numbers only"
    }

    if (validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

module.exports = validateItemInput;
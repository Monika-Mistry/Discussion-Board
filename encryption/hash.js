const bcrypt = require("bcrypt");

const hash = data => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(data, salt, (err, hash) => {
            if (err) throw err;
            return hash;
        });
    });
};

module.exports = hash;
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);


module.exports.newToken = async (payload) => {
    let token = await jwt.sign(payload, process.env.JWTSECRET, {
        expiresIn: 36000
    })
    return token;
}

module.exports.encriptPassword = (password) => {
    return password && password.length > 5 ? bcrypt.hashSync(password, salt) : "abc";
}

module.exports.comparePassword = (password, existedPassword) => {
    return bcrypt.compareSync(password, existedPassword);
}




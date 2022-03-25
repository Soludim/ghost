const jwt = require('jsonwebtoken');

const generateToken = (res, id, username, email) => {
    const token = jwt.sign({
        username,
        email,
        id
    },
        process.env.JWT_KEY);

    return token;
}

module.exports = generateToken

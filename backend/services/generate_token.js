const jwt = require('jsonwebtoken');

const generateToken = (res, id, username, email, role_number) => {
    const token = jwt.sign({
        role_number,
        username,
        email,
        id
    },
        process.env.JWT_KEY);

    return token;
}

module.exports = generateToken

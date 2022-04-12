const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.query.token || req.headers['x-access-token'] || '';

    try {
        if (!token) {
            return res.status(401).json({ message: 'Unauthenticated' })
        }

        const decrypt = jwt.verify(token, process.env.JWT_KEY);
        req.user = {
            id: decrypt.id,
            email: decrypt.email,
            username: decrypt.username,
            role_number: decrypt.role_number
        }
        next();

    } catch (err) {
        return res.status(500).json({ message: err.toString() })
    }

}

module.exports = verifyToken
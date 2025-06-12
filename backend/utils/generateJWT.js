const jwt = require('jsonwebtoken');

const generateJWT = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
            tenant: user.tenant,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

module.exports = generateJWT;
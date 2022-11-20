const { validationToken } = require('../utils/jwtUtils');

const tokenValidation = (req, res, next) => {
 const { authorization } = req.headers;
 const { type, message } = validationToken(authorization);
 if (type) return res.status(type).json({ message });
 req.user = message; 
 next();
};

module.exports = tokenValidation;
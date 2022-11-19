const jwt = require('jsonwebtoken');
const authentication = require('../services/serviceUsers');

const loginStart = async (req, res) => {
    const { email, password } = req.body;
    if (email === '' || password === '') {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
    const validation = await authentication.isLogin(req.body);
    if (validation.type) {
        return res.status(validation.type).json({ message: validation.message });
    }
    const requirement = {
        expiresIn: '1d',
        algorithm: 'HS256',
      };
      const token = jwt.sign({ ...req.body, admin: true }, process.env.JWT_SECRET, requirement);
  res.status(200).json({ token });
};

module.exports = { loginStart };
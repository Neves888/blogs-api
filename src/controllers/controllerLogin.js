const loginService = require('../services/serviceLogin');

const loginStart = async (req, res) => {
    const { type, message } = await loginService.isLogin(req.body);
    if (type) return res.status(type).json({ message });
    res.status(200).json(message);
};

module.exports = { 
    loginStart,
};
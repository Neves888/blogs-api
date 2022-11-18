const authentication = require('../services/serviceUsers');

const loginStart = async (req, res) => {
    const login = authentication.validationLogin(req.body);
    if (login.type) return res.status(login.type).json({ message: login.message });

    const validation = await authentication.isLogin(req.body);
    if (validation.type) return res.status(validation.type).json({ message: validation.message });
    res.status(200).json(validation);
    };

    module.exports = { loginStart };
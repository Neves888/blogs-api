const userService = require('../services/serviceUser');

const insert = async (req, res) => {
    const { type, message } = await userService.createUser(req.body);
    if (type) return res.status(type).json({ message });
    res.status(201).json(message);
};

module.exports = {
    insert,
};
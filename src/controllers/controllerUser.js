const userService = require('../services/serviceUser');

const insert = async (req, res) => {
    const { type, message } = await userService.createUser(req.body);
    if (type) return res.status(type).json({ message });
    res.status(201).json(message);
};

const findUser = async (_req, res) => {
    const { type, message } = await userService.findUser();
    if (type) return res.status(type).json({ message });
    res.status(200).json(message);
};

module.exports = {
    insert,
    findUser,
};
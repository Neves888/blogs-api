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

const findUserById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await userService.findUserById(id);
    if (type) return res.status(type).json({ message });
    res.status(200).json(message);
};

const deleteUser = async (req, res) => {
    const { id } = req.user.dataValues;
    const { type, message } = await userService.deleteUser(id);
    if (type) return res.status(type).json({ message });
    return res.status(204).json(message);
};

module.exports = {
    insert,
    findUser,
    findUserById,
    deleteUser,
};
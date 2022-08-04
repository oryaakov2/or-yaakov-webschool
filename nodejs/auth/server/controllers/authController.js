const bcrypt = require("bcrypt");
const { saveUser, compareUser } = require("../../utils/dbUtils");

const createUser = async (req, res) => {
    const credentials = req.body;
    const results = await compareUser(credentials);

    if (results) {
        res.cookie("auth", { login: results });
        res.send(JSON.stringify({ message: results }));

        return
    }
    res.send(JSON.stringify({ message: results }));
}

const validateUser = async (req, res) => {
    const newUser = req.body;

    const userPassword = newUser.password;
    const hash = await bcrypt.hash(userPassword, 10);
    newUser.password = hash;

    const message = saveUser(newUser);

    res.send(JSON.stringify(message));
}

module.exports = { createUser, validateUser }

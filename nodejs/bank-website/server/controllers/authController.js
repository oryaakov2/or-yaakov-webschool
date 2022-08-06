const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/jwtUtils")
const { saveUser, validateUser } = require("../../utils/dbUtils");

const createUser = async (req, res) => {
    const { username, password, questionAnswer } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const newUser = { username, password: hash, questionAnswer };

    const resObj = saveUser(newUser);

    if (resObj.type === 'success') {
        res.status(200).json(resObj);
    }
    else {
        res.status(400).json(resObj);
    }
}

const login = async (req, res) => {
    const credentials = req.body;

    const resObj = await validateUser(credentials);

    if (resObj.type === 'success') {
        const token = await generateToken(credentials)

        res.cookie('token', token);
        res.status(200).json(resObj);
    }
    else {
        res.status(400).json(resObj);
    }
}

module.exports = { createUser, login }

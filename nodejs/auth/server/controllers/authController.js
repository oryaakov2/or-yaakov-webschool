const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { saveUser, compareUser, deleteUserFromDB } = require("../../utils/dbUtils");

const SECRET_KEY = process.env.SECRET_KEY

const login = async (req, res) => {
    const credentials = req.body;
    const results = await compareUser(credentials);

    if (results.result) {
        const token = jwt.sign({ email: credentials.email, role: results.role }, SECRET_KEY);

        console.log(token);

        res.cookie("auth", { token });
        res.send(JSON.stringify({ message: "Logged in successfully" }));

        return
    }
    res.send(JSON.stringify({ message: "Invalid credentials" }));
}

const createUser = async (req, res) => {
    const newUser = req.body;

    const userPassword = newUser.password;
    const hash = await bcrypt.hash(userPassword, 10);
    newUser.password = hash;

    const message = saveUser(newUser);

    res.send(JSON.stringify(message));
}

const deleteUser = (req, res) => {
    const email = req.params.email
    const cookies = req.cookies

    if (cookies.auth) {
        const token = cookies.auth.token

        try {
            const decodedToken = jwt.verify(token, SECRET_KEY);

            if (decodedToken.role === "admin") {
                const message = deleteUserFromDB(email);
                res.send(JSON.stringify(message));
                return
            }
            else {
                res.status(403).json({ error: "You have not permissions" });
                return
            }

        } catch (err) {
            console.log(err)
            res.status(400).json({ error: err.message })
        }
    }
}

module.exports = { login, createUser, deleteUser }

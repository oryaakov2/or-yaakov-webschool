const jwt = require("jsonwebtoken");
const { getAllUsers } = require("../utils/dbUtils");

const SECRET_KEY = process.env.SECRET_KEY

const generateToken = async (credentials) => {
    const token = jwt.sign({ username: credentials.username }, SECRET_KEY, { expiresIn: '1h' });
    return token
}

const verifyToken = (token) => {
    const users = JSON.parse(getAllUsers())

    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);

        for (let i = 0; i < users.length; i++) {
            const userFromDb = users[i];

            if (userFromDb.username === decodedToken.username) {
                return decodedToken
            }
        }

    } catch (error) {
        console.log(error.message)
    }

    return { type: 'error', message: 'Authentication required' }
}

module.exports = { generateToken, verifyToken }
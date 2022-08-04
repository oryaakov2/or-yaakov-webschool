const fs = require("fs");
const bcrypt = require("bcrypt");
const path = require("path");

const db = path.join(__dirname, '/../data.json')

function getUsersFromDB() {
    const users = fs.readFileSync(db, 'utf-8');
    return JSON.parse(users);
}

function saveUser(newUser) {
    const users = getUsersFromDB();

    const userIndex = users.findIndex((user) => user.email === newUser.email);

    if (userIndex === -1) {
        users.push(newUser);

        fs.writeFileSync(db, JSON.stringify(users))

        return { message: "signup successfully" }
    }
    else {
        return { message: "email already exists" }
    }
}

async function compareUser(credentials) {
    const users = getUsersFromDB();

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        if (user.email === credentials.email) {
            const comparedResult = await bcrypt.compare(credentials.password, user.password)

            return comparedResult;
        }
    }

    return false
}

module.exports = { saveUser, compareUser }

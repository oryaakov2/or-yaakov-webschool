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

        return { message: "Signup successfully" }
    }
    else {
        return { message: "Email already exists" }
    }
}

async function compareUser(credentials) {
    const users = getUsersFromDB();

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        if (user.email === credentials.email) {
            const comparedResult = await bcrypt.compare(credentials.password, user.password)

            return { result: comparedResult, role: user.role };
        }
    }

    return { result: false }
}

const deleteUserFromDB = (email) => {
    const users = getUsersFromDB();

    for (let i = 0; i < users.length; i++) {
        const storedUser = users[i];

        if (storedUser.email === email) {
            users.splice(i, 1);

            fs.writeFileSync(db, JSON.stringify(users));

            return { message: `User with email: ${email} deleted successfully` }
        }
    }

    return { message: `No such user with email: ${email}` }
}

module.exports = { saveUser, compareUser, deleteUserFromDB }

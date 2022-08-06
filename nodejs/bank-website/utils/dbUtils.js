const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const dbFile = path.join(__dirname, '/../db.json');

const getAllUsers = () => {
    const users = fs.readFileSync(dbFile, 'utf-8');
    return users
}

const saveUser = (newUser) => {
    const users = JSON.parse(getAllUsers());

    const indexOf = users.findIndex(user => user.username === newUser.username);

    if (indexOf < 0) {
        newUser.quantity = 500;

        users.push(newUser);

        fs.writeFileSync(dbFile, JSON.stringify(users));

        return { type: 'success', message: 'user created sucessfully' }
    }
    else {
        return { type: 'error', message: 'username already exists' }
    }
}

const validateUser = async (credentials) => {
    const users = JSON.parse(getAllUsers());

    for (let i = 0; i < users.length; i++) {
        const userFromDb = users[i];

        if (userFromDb.username === credentials.username) {
            const result = await bcrypt.compare(credentials.password, userFromDb.password);

            if (result) {
                return { type: 'success', message: 'signin successfully' }
            }
        }
    }

    return { type: 'error', message: 'invalid username or password' }
}

const increaseUserQuantity = (username, quantity) => {
    const users = JSON.parse(getAllUsers());

    for (let i = 0; i < users.length; i++) {
        const userFromDb = users[i];

        if (userFromDb.username === username) {
            userFromDb.quantity += quantity;

            fs.writeFileSync(dbFile, JSON.stringify(users));

            return { type: 'success', message: 'deposit money successcully', balance: userFromDb.quantity }
        }
    }

    return { type: 'error', message: 'no such user' }
}

const decreaseUserQuantity = (username, quantity) => {
    const users = JSON.parse(getAllUsers());

    for (let i = 0; i < users.length; i++) {
        const userFromDb = users[i];

        if (userFromDb.username === username) {
            if (userFromDb.quantity >= quantity) {
                userFromDb.quantity = userFromDb.quantity - quantity;

                fs.writeFileSync(dbFile, JSON.stringify(users));
                return { type: 'success', message: 'withdraw money successfully', balance: userFromDb.quantity }
            }
            else {
                return { type: 'error', message: 'you have not enough money', balance: userFromDb.quantity }
            }
        }
    }

    return { type: 'error', message: 'no such user' }
}

const deleteUser = (username, questionAnswer) => {
    const users = JSON.parse(getAllUsers());

    for (let i = 0; i < users.length; i++) {
        const userFromDb = users[i];

        if (userFromDb.username === username) {
            if (userFromDb.questionAnswer === questionAnswer) {
                users.splice(i, 1)

                fs.writeFileSync(dbFile, JSON.stringify(users));

                return { type: 'success', message: 'account removed successfully' }
            }
            else {
                return { type: 'error', message: 'wrong answer' }
            }
        }
    }

    return { type: 'error', message: 'no such user' }
}

module.exports = {
    getAllUsers,
    saveUser,
    deleteUser,
    validateUser,
    increaseUserQuantity,
    decreaseUserQuantity,
}
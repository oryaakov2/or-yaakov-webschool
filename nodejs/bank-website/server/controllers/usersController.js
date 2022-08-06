const { verifyToken } = require("../../utils/jwtUtils");
const { increaseUserQuantity, decreaseUserQuantity, deleteUser } = require("../../utils/dbUtils");

const depositMoney = (req, res) => {
    const token = req.body['token']
    const quantity = parseFloat(req.params['quantity'])

    if (!token) {
        res.status(401).json({ message: 'no token provided' });
    }
    else {
        const data = verifyToken(token)

        if (data.type === 'error') res.status(401).send()
        else {
            const resObj = increaseUserQuantity(data.username, quantity);

            if (resObj.type === 'success') {
                res.status(200).json(resObj)
            }
            else {
                res.status(403).json(resObj)
            }
        }
    }
}

const withdrawMoney = (req, res) => {
    const token = req.body['token']
    const quantity = parseFloat(req.params['quantity'])

    if (!token) {
        res.status(401).json({ message: 'no token provided' });
    }
    else {
        const data = verifyToken(token)

        if (data.type === 'error') res.status(401).send()
        else {
            const resObj = decreaseUserQuantity(data.username, quantity);

            if (resObj.type === 'success') {
                res.status(200).json(resObj)
            }
            else {
                res.status(403).json(resObj)
            }
        }
    }
}

const removeAccount = (req, res) => {
    const token = req.body['token']
    const questionAnswer = req.params['questionAnswer']

    if (!token) {
        res.status(401).json({ message: 'no token provided' });
    }
    else {
        const data = verifyToken(token)

        if (data.type === 'error') res.status(401).send()
        else {
            const resObj = deleteUser(data.username, questionAnswer)

            if (resObj.type === 'success') {
                res.status(200).json(resObj)
            }
            else {
                res.status(400).json(resObj)
            }
        }
    }
}

module.exports = { depositMoney, withdrawMoney, removeAccount }
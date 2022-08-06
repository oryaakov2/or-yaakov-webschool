const express = require("express");

const { depositMoney, withdrawMoney, removeAccount } = require("../controllers/usersController");

const router = express.Router()

router.post('/deposit/:quantity', depositMoney);
router.post('/withdraw/:quantity', withdrawMoney);
router.delete('/delete/:questionAnswer', removeAccount);

module.exports = router

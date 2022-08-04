const express = require("express");
const { login, createUser, deleteUser } = require("../controllers/authController")

const router = express.Router();

router.post('/login', login)

router.post('/signup', createUser)

router.delete('/delete/:email', deleteUser)

module.exports = router
const express = require("express");
const { createUser, validateUser } = require("../controllers/authController")

const router = express.Router();

router.post('/login', createUser)

router.post('/signup', validateUser)

module.exports = router
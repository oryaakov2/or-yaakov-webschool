const express = require("express");
const path = require("path");

const viewsDir = path.join(__dirname, '/../../views');

const router = express.Router();

router.get('/login', (req, res) => {
    res.sendFile(viewsDir + '/login/login.html')
})

router.get('/signup', (req, res) => {
    res.sendFile(viewsDir + '/signup/signup.html')
})

module.exports = router

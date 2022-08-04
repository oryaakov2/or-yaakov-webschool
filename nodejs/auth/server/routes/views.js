const express = require("express");
const { getLoginPage, getSignupPage, getPrivatePage } = require("../controllers/viewsController");

const router = express.Router();

router.get('/login', getLoginPage)

router.get('/signup', getSignupPage)

router.get('/private', getPrivatePage)

module.exports = router
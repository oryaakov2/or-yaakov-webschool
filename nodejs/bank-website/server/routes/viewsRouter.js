const express = require("express");
const { getHomePage, getLoginPage, getSignupPage } = require("../controllers/viewsController");

const router = express.Router();

router.get('/', getHomePage)

router.get('/login', getLoginPage)

router.get('/signup', getSignupPage)

module.exports = router

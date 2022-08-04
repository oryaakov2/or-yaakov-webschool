const express = require("express");
const path = require("path");
const { getLoginPage, getSignupPage } = require("../controllers/viewsController");

const viewsDir = path.join(__dirname + '/../../views');

const router = express.Router();

router.get('/login', getLoginPage)

router.get('/signup', getSignupPage)

router.get('/private', (req, res) => {
    const cookies = req.cookies

    if (cookies['auth']) {
        console.log(cookies)

        const loggedIn = cookies['auth'].login

        if (loggedIn) {
            res.sendFile(viewsDir + '/private/private.html');
            return
        }
    }
    res.status(401).json({error: "Unauthorized"});
})

module.exports = router
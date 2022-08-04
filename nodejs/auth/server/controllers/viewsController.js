const path = require("path");

const viewsDir = path.join(__dirname + '/../../views');

const getLoginPage = (req, res) => {
    res.sendFile(viewsDir + '/login/login.html');
}

const getSignupPage = (req, res) => {
    res.sendFile(viewsDir + '/signup/signup.html');
}

module.exports = { getLoginPage, getSignupPage }
const path = require("path");
const { verifyToken } = require("../../utils/jwtUtils");

const viewsDir = path.join(__dirname, '/../../views');

const getHomePage = (req, res) => {
    const token = req.body['token'];

    if (token) {
        const data = verifyToken(token);

        if (data.type === 'error') {
            res.redirect('/login')
        }
        else {
            res.sendFile(viewsDir + '/home/home.html')
        }
    }
    else {
        res.redirect('/login')
    }
}

const getLoginPage = (req, res) => {
    res.sendFile(viewsDir + '/login/login.html')
}

const getSignupPage = (req, res) => {
    res.sendFile(viewsDir + '/signup/signup.html')
}

module.exports = { getHomePage, getLoginPage, getSignupPage }
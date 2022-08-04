const jwt = require("jsonwebtoken");
const path = require("path");

const SECRET_KEY = process.env.SECRET_KEY

const viewsDir = path.join(__dirname + '/../../views');

const getLoginPage = (req, res) => {
    res.sendFile(viewsDir + '/login/login.html');
}

const getSignupPage = (req, res) => {
    res.sendFile(viewsDir + '/signup/signup.html');
}

const getPrivatePage = (req, res) => {
    const cookies = req.cookies

    if (cookies.auth) {
        const token = cookies.auth.token

        try {
            const decodedToken = jwt.verify(token, SECRET_KEY);
            console.log(decodedToken);

            res.sendFile(viewsDir + '/private/private.html');
            return

        } catch (err) {
            console.log(err)
        }
    }
    res.status(302).redirect("/login")
}

module.exports = { getLoginPage, getSignupPage, getPrivatePage }
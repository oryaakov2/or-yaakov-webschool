require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const authRouter = require("./routes/authRouter");
const viewsRouter = require("./routes/viewsRouter");
const usersRouter = require("./routes/usersRouter");
const PORT = 3000;

const viewsDir = path.join(__dirname, '/../views');

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(viewsDir + '/home'))
app.use("/login", express.static(viewsDir + '/login'))
app.use("/signup", express.static(viewsDir + '/signup'))
app.use("/private", express.static(viewsDir + '/private'))

app.use((req, res, next) => {
    console.log(`URL: ${req.url} METHOD: ${req.method}`);
    next();
})

app.use((req, res, next) => {
    const token = req.cookies['token']

    if (token) {
        req.body.token = token
    }
    
    next();
})

// routers
app.use("/", viewsRouter)
app.use("/api/auth", authRouter)
app.use("/api/users", usersRouter)

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`Server listening on port ${PORT}`);
})

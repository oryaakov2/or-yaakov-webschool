const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const PORT = 3000;

const authRouter = require("./routes/auth");
const viewsRouter = require("./routes/views");

const app = express();

const viewsDir = path.join(__dirname + '/../views');

// middlewares
app.use(express.json())
app.use(cookieParser())

app.use("/login", express.static(viewsDir + '/login'))
app.use("/signup", express.static(viewsDir + '/signup'))
app.use("/private", express.static(viewsDir + '/private'))

// routers
app.use("/", viewsRouter)
app.use("/api", authRouter)

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`Server listening on port ${PORT}`);
})
const express = require("express");
const path = require("path");
const apiRouter = require("./routes/apiRouter");
const viewsRouter = require("./routes/viewsRouter");
const PORT = 3000;

const viewsDir = path.join(__dirname, '/../views');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`URL: ${req.url} METHOD: ${req.method}`);
    next();
})

// middlewares
app.use(express.json())

app.use("/login", express.static(viewsDir + '/login'))
app.use("/signup", express.static(viewsDir + '/signup'))
app.use("/private", express.static(viewsDir + '/private'))

// routers
app.use("/", viewsRouter)
app.use("/api", apiRouter)

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`Server listening on port ${PORT}`);
})

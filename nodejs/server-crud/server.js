const fs = require("fs");
const http = require("http");
const path = require("path");
const getStudents = require("./crud/read");
const deleteStudent = require("./crud/delete");

const htmlDirectory = path.join(__dirname + "/./html");
const cssDirectory = path.join(__dirname + "/./css");
const jsDirectory = path.join(__dirname + "/./js");

const PORT = 3000;

const server = http.createServer((req, res) => {
    const method = req.method
    console.log('method', method);

    const url = req.url;

    switch (url) {
        case "/":
            const homePage = fs.readFileSync(htmlDirectory + "/home.html");
            res.end(homePage);
            break;

        case "/css/home.css":
            const homeStyle = fs.readFileSync(cssDirectory + "/home.css");
            res.end(homeStyle);
            break;

        case "/js/home.js":
            const homeScript = fs.readFileSync(jsDirectory + "/home.js");
            res.end(homeScript);
            break;

        case "/delete":
            const deletePage = fs.readFileSync(htmlDirectory + "/delete.html");
            res.end(deletePage);
            break;

        case "/css/delete.css":
            const deletePageStyle = fs.readFileSync(cssDirectory + "/delete.css");
            res.end(deletePageStyle);
            break;

        case "/js/delete.js":
            const deleteScript = fs.readFileSync(jsDirectory + "/delete.js");
            res.end(deleteScript);
            break;

        case "/css/404.css":
            const pageNotFoundStyle = fs.readFileSync(cssDirectory + "/404.css");
            res.end(pageNotFoundStyle);
            break;

        case "/students":
            const students = getStudents();
            res.end(students);
            break;

        case "/delete-student":
            const deletedStudent = deleteStudent();
            res.end(deletedStudent);
            break;

        default:
            const pageNotFoundPage = fs.readFileSync(htmlDirectory + "/404.html");
            res.end(pageNotFoundPage);
            break;
    }
})

server.listen(PORT);
console.log(`server listening on port: 3000`);

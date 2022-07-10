const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname + "/../data/students.json");

function getStudents() {
    const students = fs.readFileSync(dataFile, "utf-8");

    return students
}

module.exports = getStudents

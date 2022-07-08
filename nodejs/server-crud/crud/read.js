const fs = require("fs");

function getStudents() {
    const students = fs.readFileSync("./data/students.json");

    return students
}

module.exports = getStudents

const fs = require("fs");
const path = require("path");
const getStudents = require("./read");

const dataFile = path.join(__dirname + "/../data/students.json");

function deleteStudent() {
    const students = getStudents();
    const studentsJson = JSON.parse(students);

    const deletedStudent = studentsJson.shift();

    if (deletedStudent) {
        fs.writeFileSync(dataFile, JSON.stringify(studentsJson));

        return JSON.stringify(deletedStudent)
    }
    else {
        return ""
    }
}

module.exports = deleteStudent

const fs = require("fs");
const getStudents = require("./read");

function deleteStudent() {
    const students = getStudents();
    const studentsJson = JSON.parse(students);

    const deletedStudent = studentsJson.shift();

    if (deletedStudent) {
        fs.writeFileSync("./data/students.json", JSON.stringify(studentsJson));

        return JSON.stringify(deletedStudent)
    }
    else {
       return ""
    }
}

module.exports = deleteStudent

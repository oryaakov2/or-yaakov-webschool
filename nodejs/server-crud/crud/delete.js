const fs = require("fs");
const path = require("path");
const getStudents = require("./read");

const dataFile = path.join(__dirname + "/../data/students.json");

function deleteStudent(studentId) {
    const students = getStudents();
    const studentsJson = JSON.parse(students);

    // check if the new student id already exists.
    const index = studentsJson.findIndex(item => item.id === studentId);

    if (index > -1) {
        studentsJson.splice(index, 1);
        fs.writeFileSync(dataFile, JSON.stringify(studentsJson));

        return JSON.stringify({ type: "Success", payload: studentId });
    }

    return JSON.stringify({ type: "Error", message: `No such student with id: ${studentId}` });
}

module.exports = deleteStudent

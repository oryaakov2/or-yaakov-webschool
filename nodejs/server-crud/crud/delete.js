const fs = require("fs");
const path = require("path");
const getStudents = require("./read");

const dataFile = path.join(__dirname + "/../data/students.json");

function deleteStudent(studentId) {
    const students = getStudents();
    const studentsJson = JSON.parse(students);

    const studentIndex = studentsJson.findIndex(item => item.id === studentId);

    if (studentIndex > 0) {
        studentsJson.splice(studentIndex, 1);
        fs.writeFileSync(dataFile, JSON.stringify(studentsJson));

        return JSON.stringify({ type: "Success", payload: studentId });
    }

    return JSON.stringify({ type: "Error", message: `No such student with id: ${studentId}` });
}

module.exports = deleteStudent

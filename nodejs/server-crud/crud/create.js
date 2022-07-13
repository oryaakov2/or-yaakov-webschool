const fs = require("fs");
const path = require("path");
const getStudents = require("./read");

const dataFile = path.join(__dirname + "/../data/students.json");

function createStudent(newStudent) {
    const students = getStudents();
    const studentsJson = JSON.parse(students);

    // check if the new student id already exists.
    const index = studentsJson.findIndex((item) => {
        return item.id === newStudent.id;
    })

    if (index < 0) {
        studentsJson.push(newStudent);

        fs.writeFileSync(dataFile, JSON.stringify(studentsJson));

        return JSON.stringify({ type: "Success", payload: newStudent });
    }

    return JSON.stringify({ type: "Error", message: `Student with id: ${newStudent.id} already exists` });
}

module.exports = createStudent

const fs = require("fs");
const path = require("path");
const getStudents = require("./read");

const dataFile = path.join(__dirname + '/../data/students.json');

function updateStudent(data) {
    const students = getStudents()
    const studentsJson = JSON.parse(students);

    // check if the new student id already exists.
    const index = studentsJson.findIndex(item => item.id === data.id);

    if (index > -1) {
        const student = studentsJson[index];

        for (const key in data) {
            const value = data[key];

            if (value && !(student[key] === value)) {
                student[key] = value;
            }
        }

        fs.writeFileSync(dataFile, JSON.stringify(studentsJson));

        return JSON.stringify({ type: "Success", payload: student });
    }

    return JSON.stringify({ type: "Error", message: `No such student with id: ${data.id}` });
}

module.exports = updateStudent
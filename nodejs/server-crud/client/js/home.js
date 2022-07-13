const fetchBtn = document.getElementById("fetch-btn");
const tableBody = document.getElementById("tbody");

fetchBtn.addEventListener("click", async function () {
    try {
        const response = await fetch("http://localhost:3000/api/students");

        const data = await response.json();
        console.log('data', data)

        appendStudents(data);

    } catch (err) {
        console.log(err);
    }
})

function appendStudents(students) {
    const tableSection = document.getElementById("table");

    tableSection.innerHTML = `<table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Age</th>
                                        <th>GPA</th>
                                    </tr>
                                </thead>
                                <tbody id="tbody">
                                </tbody>
                            </table>`

    const tableBody = document.getElementById("tbody");

    students.forEach((student) => {
        const { id, firstName, lastName, age, GPA } = student;

        tableBody.innerHTML += (`<tr>
                                <td>${id}</td>
                                <td>${firstName}</td>
                                <td>${lastName}</td>
                                <td>${age}</td>
                                <td>${GPA}</td>
                            </tr>`)
    })
}

const addStudentForm = document.getElementById("add-student");
const main = document.querySelector("main");

addStudentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = document.querySelectorAll("input");

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];

        if (input.value === "") {
            input.focus();
            return
        }
    }

    const data = new FormData(this);

    var newStudent = {}

    for (const [key, value] of data.entries()) {
        if (key === "id" || key === "age" || key === "GPA") {
            newStudent[key] = parseInt(value);
        }
        else {
            newStudent[key] = value;
        }
    }

    fetch(`http://localhost:3000/api/create-student`, {
        method: "POST",
        body: JSON.stringify(newStudent)
    })
        .then((res) => res.json())
        .then((data) => {
            appendMessage(data);
            resetInputs(inputs);
        })
        .catch((err) => console.log(err))
})

function appendMessage(data) {
    const p = document.createElement("p");

    if (data.type === "Error") {
        p.innerText = `${data.message}`;
        main.append(p);
    }
    else {
        p.innerText = `New student with id: ${data.payload.id} created successfully`;
        main.append(p);
    }

    setTimeout(() => {
        main.removeChild(p);
    }, 3000)
}

function resetInputs(inputs) {
    inputs.forEach(input => input.value = "");
}

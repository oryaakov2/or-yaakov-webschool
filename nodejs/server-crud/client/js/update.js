const updateStudentForm = document.getElementById("update-form");
const main = document.querySelector("main");

updateStudentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = document.querySelectorAll("input");
    const idInput = document.getElementById("id-input");

    if (!idInput.value) {
        idInput.focus();
        idInput.style.border = "1px solid red";
        return
    }

    idInput.style.border = "none";

    const formData = new FormData(this);
    const data = {}

    for (const [key, value] of formData.entries()) {
        if (value) {
            switch (key) {
                case "id":
                    data[key] = parseInt(value)
                    break;

                case "age":
                    data[key] = parseInt(value)
                    break;

                case "GPA":
                    data[key] = parseInt(value)
                    break;

                default:
                    data[key] = value
            }
        }
    }

    fetch("http://localhost:3000/api/update-student", {
        method: "PUT",
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            appendMessage(data)
            resetInputs(inputs);
        })
        .catch(err => console.log(err));
})

function appendMessage(data) {
    const p = document.createElement("p");

    if (data.type === "Error") {
        p.innerText = `${data.message}`;
        main.append(p);
    }
    else {
        p.innerText = `Student with id: ${data.payload.id} updated successfully`;
        main.append(p);
    }

    setTimeout(() => {
        main.removeChild(p);
    }, 3000)
}

function resetInputs(inputs) {
    inputs.forEach(input => input.value = "");
}

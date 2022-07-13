const deleteStudentForm = document.getElementById("delete-form");
const main = document.querySelector("main");

deleteStudentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const idInput = document.getElementById("id-input");

    if (!idInput.value) {
        idInput.focus();
        return;
    }
    
    const id = parseInt(idInput.value);

    fetch("http://localhost:3000/api/delete-student", {
        method: "POST",
        body: JSON.stringify({ id })
    })
        .then(res => res.json())
        .then(data => {
            appendMessage(data);
            idInput.value = "";
        }).catch(err => console.log(err))
})

function appendMessage(data) {
    const p = document.createElement("p");

    if (data.type === "Error") {
        p.innerText = `${data.message}`;
        main.append(p);
    }
    else {
        p.innerText = `Student with id: ${data.payload} deleted successfully`;
        main.append(p);
    }

    setTimeout(() => {
        main.removeChild(p);
    }, 3000)
}

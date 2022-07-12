const deleteBtn = document.getElementById("delete-btn");
const messageElement = document.getElementById("delete-message");
let messageTimeout = 0;

deleteBtn.addEventListener("click", async function () {
    try {
        const response = await fetch("http://localhost:3000/delete-student", {
            method: "POST"
        })

        const responseText = await response.text();
        if (responseText === "") {
            alert("no students")
        }
        else {
            const deletedStudent = JSON.parse(responseText);
            appendMessage(deletedStudent);
        }

    } catch (err) {
        console.error(err);
    }
})

function appendMessage(deletedStudent) {
    const { id, firstName, lastName } = deletedStudent

    messageElement.innerText = `Student with id: ${id} and name: ${firstName} ${lastName} deleted successfully`;

    if (messageTimeout > 0) {
        clearTimeout(messageTimeout);
    }

    messageTimeout = setTimeout(() => {
        messageElement.innerText = "";
        messageElement.style.display = "hidden";
    }, 4000)
}
const deleteForm = document.getElementById("delete-form");
const emailInput = document.getElementById("email");

deleteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value;

    fetch(`http://localhost:3000/api/delete/${email}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(err => console.log(err))
})
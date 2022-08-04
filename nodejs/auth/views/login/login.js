const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const credentials = {}

    for (const [key, value] of data) {
        credentials[key] = value;
    }

    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(err => console.log(err))
})
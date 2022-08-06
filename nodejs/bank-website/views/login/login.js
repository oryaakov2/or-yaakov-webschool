const loginForm = document.getElementById("login-form");

loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    const credentials = {}

    for (const [key, value] of formData) {
        credentials[key] = value;
    }

    try {
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-type': 'application/json'
            }
        })

        const data = await res.json();

        if (res.ok) {
            window.location = '/'
        }
        else {
            alert(data.message);
        }

    } catch (error) {
        console.log(error)
    }
})
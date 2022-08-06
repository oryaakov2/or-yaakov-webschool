const signupForm = document.getElementById("signup-form");

signupForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    const newUser = {}

    for (const [key, value] of formData) {
        newUser[key] = value;
    }

    try {
        const res = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-type': 'application/json'
            }
        })

        const data = await res.json();
        alert(data.message);

        if (res.ok) {
            this.reset();
            window.location = '/login';
        }

    } catch (error) {
        console.log(error)
    }
})
const users = [
    {
        firstName: "Or",
        userName: "oryaakov2",
        password: "112233"
    },
    {
        firstName: "David",
        userName: "davidjosh2",
        password: "223344"
    },
    {
        firstName: "Jimmy",
        userName: "jimmyrose2",
        password: "334455"
    }
]

function signIn() {
    const main = document.querySelector("main");

    const usernameInput = document.getElementById("user-name");
    const passwordInput = document.getElementById("password");

    const userNameValue = usernameInput.value.toLowerCase();
    const passwordValue = passwordInput.value.toLowerCase();

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        if (user.userName === userNameValue && user.password === passwordValue) {
            main.innerHTML = `<h1>Welcome ${user.firstName}</h1>`;
            break;
        }
        else if (i === users.length - 1) {
            usernameInput.value = "";
            passwordInput.value = "";
            alert("Invalid credentials try again.");
        }
    }
}
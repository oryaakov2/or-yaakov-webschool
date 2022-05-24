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

const usernameInput = document.getElementById("user-name");
const passwordInput = document.getElementById("password");
const main = document.querySelector("main");

function signIn() {
    const userNameValue = usernameInput.value.toLowerCase();
    const passwordValue = passwordInput.value.toLowerCase();
    
    usernameInput.style.border = "";
    passwordInput.style.border = "";

    if (!userNameValue) {
        usernameInput.style.border = "1px solid red";
        usernameInput.focus();
        return;

    } else if (!passwordValue) {
        passwordInput.style.border = "1px solid red";
        passwordInput.focus();
        return;
    }

    var userFirstName = "";

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        if (user.userName === userNameValue && user.password === passwordValue) {
            userFirstName = user.firstName;
            break;
        }
    }

    if (userFirstName) {
        main.innerHTML = `<h1>Welcome ${userFirstName}</h1>`;

    } else {
        alert("Invalid credentials try again.");
    }
}
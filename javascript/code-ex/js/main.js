const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const main = document.querySelector("main");
const mainDiv = document.getElementById("main-div");
const input = document.getElementById("primary-input");
const button = document.getElementById("primary-btn")

let code = "";
let userSelect = "";
var timeouts = [];
let tries = 0;

input.addEventListener("input", () => {
    const value = input.value;
    const char = value.slice(-1);
    let isNumber = false;

    if (value.length > 4) {
        input.value = value.substring(0, value.lastIndexOf(char));
    }
    else {
        for (let i = 0; i < numbers.length; i++) {
            if (char === numbers[i]) {
                isNumber = true;
                break;
            }
        }

        if (!isNumber) {
            input.value = value.substring(0, value.lastIndexOf(char));
        }
    }
})

function createCode() {
    if (input.value.length < 4) {
        input.style.borderBottom = "solid 3px red";
        input.focus();
    }
    else {
        code = input.value;
        input.style.borderBottom = "solid 3px #3d3d3d";
        input.value = "";

        showKeyboard();
    }
}

function showKeyboard() {
    main.innerHTML =
        `<div class="grid-container">
            <div class="item">7</div>
            <div class="item">8</div>
            <div class="item">9</div>
            <div class="item">4</div>
            <div class="item">5</div>
            <div class="item">6</div>  
            <div class="item">1</div>  
            <div class="item">2</div>  
            <div class="item">3</div>  
            <div id="zero" class="item">0</div>
        </div>`


    document.querySelectorAll(".item").forEach(item => {
        item.addEventListener("click", onPressNumber);
    });
}

function onPressNumber() {
    userSelect += this.innerText;
    applySelect(this);
    if (userSelect.length === 4) {
        const t = setTimeout(() => {
            check();
            clearInterval(t);
        }, 200)
    }
}

function applySelect(element) {
    element.style.backgroundColor = "#98FB98";
    if (timeouts.length != 0) {
        clearTimeout(timeouts[0])
        timeouts = timeouts.splice(1, -1);
    }
    const timeout = setTimeout(() => {
        clearAll();
    }, 3000);
    timeouts.push(timeout);
}

function clearAll() {
    userSelect = "";
    document.querySelectorAll(".item").forEach(item => {
        item.style.backgroundColor = "#fff";
    });
    timeouts.forEach(t => {
        clearTimeout(t);
    });
    timeouts.length = 0;
}

function check() {
    tries++;
    if (userSelect === code) {
        alert(`Success ${userSelect} = ${code}`);
    }
    else if (tries < 3) {
        alert("Failed");
        clearAll();
    }
    else {
        alert("Calling the Police!");
        clearAll();
        document.querySelectorAll(".item").forEach(item => {
            item.removeEventListener("click", onPressNumber);
        });
    }
}

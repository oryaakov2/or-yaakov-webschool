const p = document.querySelector("p");

window.onload = () => {
    p.style.color = "red";
}

function changeFontSize() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            p.style.fontSize += 50 + "px";
            resolve();
        }, 5000)
    })
}

function changeFontStyle() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            p.style.fontStyle = "italic";
            resolve();
        }, 5000)
    })
}

function changeFontColor() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            p.style.color = "purple";
            resolve();
        }, 5000)
    })
}

async function startAnimation()  {
    await changeFontSize();
    await changeFontStyle();
    await changeFontColor();
}

startAnimation();

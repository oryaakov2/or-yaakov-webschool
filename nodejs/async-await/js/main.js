const p = document.querySelector("p");

window.onload = () => {
    p.style.color = "red";
}

async function changeFontSize() {
    setTimeout(() => {
        p.style.fontSize += 50 + "px";
    })
}

async function changeFontStyle() {
    setTimeout(() => {
        p.style.fontStyle = "italic";
    }, 5000)
}

async function changeFontColor() {
    setTimeout(() => {
        p.style.color = "purple";
    }, 5000)
}

async function startAnimation() {
    await changeFontSize();
    await changeFontStyle();
    await changeFontColor();
}

startAnimation();

const catchBtn = document.getElementById("catch-btn");
const gameboard = document.getElementById("gameboard");

const $ = {
    score: document.getElementById("score"),
    level: document.getElementById("level"),
    points: document.getElementById("points"),
    fakePoints: document.getElementById("fake-points"),
    timer: document.getElementById("timer"),
    highScores: document.getElementById("high-scores"),
}

const MAX_LEVEL = 5;
const MAX_TOP_PLAYERS = 5;
const ROTATE_SPEED = ["2s", "1.75s", "1.50s", "1.25s", "1s"];

var level = 1;
var score = 0;
var fakeClicks = 0;
var pointsToNextLevel = 10;
var seconds = 60;
var interval = 0;
var locationDelay = 300;

var highScores = localStorage.getItem("highScores");

if (!highScores) {
    highScores = [];
    localStorage.setItem("highScores", JSON.stringify(highScores));
}
else {
    highScores = JSON.parse(highScores);

    appendHighScores(highScores);
}

const Popup = {
    div: document.querySelector(".popup"),
    isOpen: false,
    open: function (e, date) {
        this.div.innerHTML = `<p>${date}</p>`;
        this.div.style.display = "block";
        this.div.style.top = e.y + "px";
        this.div.style.left = e.x + "px";
        this.isOpen = true;
    },
    close: function () {
        this.div.style.display = "none";
        this.isOpen = false;
    }
}

function startGame() {
    reset();

    changelocation();

    catchBtn.classList = " rotate";

    catchBtn.addEventListener("click", incrementScore);
    catchBtn.addEventListener("mouseenter", changelocation);
    gameboard.addEventListener("click", incrementFakeClick);

    interval = setInterval(() => {
        seconds--
        $.timer.innerText = seconds;

        if (seconds === 0) {
            score = score - fakeClicks;
            alert(`Your score is: ${score.toString()}`);

            reset();
        }

    }, 1000)
}

const reset = () => {
    level = 1;
    score = 0;
    fakeClicks = 0;
    seconds = 60;
    pointsToNextLevel = 10;
    locationDelay = 300;

    catchBtn.removeEventListener("click", incrementScore);
    catchBtn.removeEventListener("mouseenter", changelocation);
    gameboard.removeEventListener("click", incrementFakeClick);

    catchBtn.style.top = 0;
    catchBtn.style.left = 0;
    catchBtn.classList.remove("rotate");

    $.score.innerText = score;
    $.points.innerText = pointsToNextLevel;
    $.level.innerText = level;
    $.timer.innerText = seconds;
    $.fakePoints.innerText = fakeClicks;

    clearInterval(interval);
}

const incrementScore = (e) => {
    e.stopPropagation();

    score += level * 10;

    pointsToNextLevel--

    if (pointsToNextLevel === 0) {
        nextLevel();
    }

    $.score.innerText = score;
    $.points.innerText = pointsToNextLevel;
}

const incrementFakeClick = () => {
    fakeClicks += level;
    $.fakePoints.innerText = fakeClicks;
}

const nextLevel = () => {
    level++

    catchBtn.style.animationDuration = ROTATE_SPEED[level - 1];

    if (level > MAX_LEVEL) {
        score = score - fakeClicks;
        checkScore();
    }
    else {
        seconds += 10;
        pointsToNextLevel = 10;
    }

    locationDelay = locationDelay - 50;
    $.level.innerText = level;
}

const changelocation = () => {
    const timeout = setTimeout(() => {
        catchBtn.style.top = (Math.random() * gameboard.offsetHeight).toString() + "px";
        catchBtn.style.left = (Math.random() * gameboard.offsetWidth).toString() + "px";

        clearTimeout(timeout);
    }, locationDelay)
}

const checkScore = () => {
    const date = getCurrentDate();

    if (highScores.length < MAX_TOP_PLAYERS) {
        const playerName = prompt("Enter Your Name:") || "Anonymous";
        highScores.push({ name: playerName, date, score });

        highScores.sort((a, b) => b.score - a.score);

        localStorage.setItem("highScores", JSON.stringify(highScores));
    }
    else {
        const lowestPlayerScore = highScores.pop();

        if (lowestPlayerScore.score <= score) {
            const newPlayer = {
                name: prompt("Enter Your Name:") || "Anonymous",
                date,
                score
            }

            highScores = highScores.splice(0, 4);
            highScores.push(newPlayer);
            highScores.sort((a, b) => b.score - a.score);
            localStorage.setItem("highScores", JSON.stringify(highScores));
        }
    }

    highScores = JSON.parse(localStorage.getItem("highScores"));
    appendHighScores();

    reset();
}

function appendHighScores() {
    $.highScores.innerHTML = `<h3>High Scores:</h3>`;

    for (let i = 0; i < highScores.length; i++) {
        const item = highScores[i];

        const p = document.createElement("p");

        p.addEventListener("mouseover", function (e) {
            Popup.open(e, item.date);
        })

        p.addEventListener("mouseleave", function () {
            Popup.isOpen && Popup.close();
        })

        p.innerText = `${item.score} - ${item.name}`;
        $.highScores.appendChild(p);
    }
}

function getCurrentDate() {
    let date = new Date();

    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    date = day + "/" + month + "/" + year;

    return date
}

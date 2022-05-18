const arr = [];

for (let i = 0; i < 5; i++) {
    const student = {
        name: prompt("what is your name?").toLocaleLowerCase(),
        score: parseInt(prompt("what is your score?"))
    }

    arr.push(student)
}

const average = getAverage(arr);

console.log(average);

function getAverage(array) {
    let avg = array[i].score;
    for (let i = 1; i < array.length; i++) {
        avg = calcAverage(avg, array[i].score);
    }

    return avg;
}

function calcAverage(avg, student) {
    return (avg + student) / 2;
}

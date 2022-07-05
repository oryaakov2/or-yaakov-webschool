const fs = require("fs");

function read() {
    const fileData = fs.readFileSync("./cart/cart.js", "utf-8");
    const fileDataObj = JSON.parse(fileData);
    return fileDataObj;
}

function getSum() {
    const fileDataObj = read();

    const sum = fileDataObj.reduce((sum, product) => {
        return sum + product.price;
    }, 0)

    return sum;
}

function sortCart(sortObj) {
    const fileDataObj = read();

    if (Object.keys(sortObj).length === 0) {
        throw new Error("sort parameter missing")
    }
    
    else {
        const key = sortObj.field;
        const sortType = sortObj.sortType;

        const sortedCart = fileDataObj.sort((a, b) => {
            if (sortType === "asc") {
                return a[key] > b[key] ? 1 : -1;
            }
            else if (sortType === "desc") {
                return a[key] < b[key] ? 1 : -1;
            }
        })

        return sortedCart;
    }
}

module.exports = { read, getSum, sortCart };

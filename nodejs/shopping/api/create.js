const fs = require("fs");

function createAction(product) {
    const fileData = fs.readFileSync("./cart/cart.js", "utf-8");
    const fileDataObj = JSON.parse(fileData);

    fileDataObj.push(product);

    fs.writeFileSync("./cart/cart.js", JSON.stringify(fileDataObj));
}

module.exports = createAction;

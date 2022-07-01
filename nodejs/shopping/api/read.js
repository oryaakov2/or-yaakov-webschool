const fs = require("fs");

function readAction() {
    const fileData = fs.readFileSync("./cart/cart.js", "utf-8");
    console.log(fileData);
}

module.exports = readAction;

const fs = require("fs");
const readAction = require("./read");
const checkProductExists  = require("../tools/validation");

function createAction(product) {
    const fileDataObj = readAction.read();

    const productIndex = checkProductExists(product);

    if (productIndex < 0) {
        fileDataObj.push(product);
        fs.writeFileSync("./cart/cart.js", JSON.stringify(fileDataObj));
    }
    else {
        throw new Error(`create failed: product with id ${product.id} already exists`);
    }
}

module.exports = createAction;

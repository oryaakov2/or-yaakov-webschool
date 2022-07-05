const fs = require("fs");
const readAction = require("./read");
const checkProductExists  = require("../tools/validation");

function deleteAction(product) {
    const fileDataObj = readAction.read();
    const productId = product.id;

    const productIndex = checkProductExists(product);

    if (productIndex > -1) {
        fileDataObj.splice(productIndex, 1);

        fs.writeFileSync("./cart/cart.js", JSON.stringify(fileDataObj));
    }
    else {
        throw new Error(`delete failed: no such product with id ${productId}`);
    }
}

module.exports = deleteAction;

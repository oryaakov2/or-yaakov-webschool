const fs = require("fs");
const readAction = require("./read");
const checkProductExists  = require("../tools/validation");

function updateAction(updatedProduct) {
    const fileDataObj = readAction.read();

    const productIndex = checkProductExists(updatedProduct);

    if (productIndex > -1) {
        const product = fileDataObj[productIndex];

        for (const key in updatedProduct) {
            if (updatedProduct[key]) {
                const value = updatedProduct[key];
                product[key] = value;
            }
        }

        fs.writeFileSync("./cart/cart.js", JSON.stringify(fileDataObj));
    }
    else {
        throw new Error(`update failed: no such product with id ${updatedProduct.id}`);
    }
}

module.exports = updateAction;

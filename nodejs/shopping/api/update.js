const fs = require("fs");

function updateAction(updatedProduct) {
    const fileData = fs.readFileSync("./cart/cart.js", "utf-8");
    const fileDataObj = JSON.parse(fileData);

    const productIndex = fileDataObj.findIndex(product => {
        return product.id === updatedProduct.id;
    });

    if (productIndex > -1) {
        fileDataObj[productIndex] = updatedProduct;
    }
    else {
        fileDataObj.push(updatedProduct);
    }

    fs.writeFileSync("./cart/cart.js", JSON.stringify(fileDataObj));
}

module.exports = updateAction;

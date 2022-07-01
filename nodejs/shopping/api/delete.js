const fs = require("fs");

function deleteAction(product) {
    const productId = product.id;

    const fileData = fs.readFileSync("./cart/cart.js", "utf-8");
    const fileDataObj = JSON.parse(fileData);

    const productIndex = fileDataObj.findIndex(product => {
        return product.id === productId;
    });

    if (productIndex > -1) {
        fileDataObj.splice(productIndex, 1);

        fs.writeFileSync("./cart/cart.js", JSON.stringify(fileDataObj));
    }
}

module.exports = deleteAction;

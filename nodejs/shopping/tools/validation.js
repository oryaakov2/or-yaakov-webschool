const readAction = require("../api/read");

function checkProductExists(product) {
    const fileDataObj = readAction.read();

    const index = fileDataObj.findIndex((item) => {
        return item.id === product.id;
    })

    if (index > -1) return index;
    else return -1
}

module.exports = checkProductExists;

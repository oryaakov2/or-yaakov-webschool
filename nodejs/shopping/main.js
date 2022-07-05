const createAction = require("./api/create");
const readAction = require("./api/read");
const updateAction = require("./api/update");
const deleteAction = require("./api/delete");

const args = process.argv.slice(2);

const action = args[0] ? args[0].toLowerCase() : "";
var product = args[1];

if (action === "create" || action === "update" || action === "delete") {
    if (product) {
        product = JSON.parse(product);
    }
    else {
        throw new Error(`required product object for ${action} product`);
    }
}

switch (action) {
    case "create":
        createAction(product);
        break;

    case "read":
        const fileDataObj = readAction.read();
        console.log(fileDataObj);
        break;

    case "update":
        updateAction(product);
        break;

    case "delete":
        deleteAction(product);
        break;

    case "sum":
        const sum = readAction.getSum();
        console.log(sum);
        break;

    case "sort":
        product = product ? JSON.parse(product) : {};
        const sortedCart = readAction.sortCart(product);
        console.log(sortedCart);
        break;

    default:
        throw new Error(`${action} is not a valid action, please select: create, read, update, delete`);
}

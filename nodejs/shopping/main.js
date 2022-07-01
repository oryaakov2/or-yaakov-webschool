const createAction = require("./api/create");
const readAction = require("./api/read");
const updateAction = require("./api/update");
const deleteAction = require("./api/delete");

const args = process.argv.slice(2);

const action = args[0].toLowerCase();
var product = args[1];

if (action === "create" || action === "update" || action === "delete") {
    if (!product) {
        throw new Error(`required an product object for ${action} product`);
    }
    else {
        product = JSON.parse(product);
    }
}

switch (action) {
    case "create":
        createAction(product);
        break;

    case "read":
        readAction();
        break;

    case "update":
        updateAction(product);
        break;

    case "delete":
        deleteAction(product);
        break;

    default:
        throw new Error(`${action} is not a valid action, please select: create, read, update, delete`);
}

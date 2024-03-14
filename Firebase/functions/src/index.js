// eslint-disable-next-line object-curly-spacing
const { onRequest } = require("firebase-functions/v2/https");
const apiHandler = require("./handlers/api");

exports.firebaseTest = onRequest(apiHandler.callback());

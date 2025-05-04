"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = 8080;
const server = app_1.app.listen(PORT, () => {
    console.log('WSV eCommerce start with ' + PORT);
});
process.on('SIGINT', () => {
    server.close();
    console.log('Exist Express Server');
});

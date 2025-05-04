"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const init_mongodb_1 = require("./databases/init.mongodb");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
exports.app = app;
// init middleware
app.use((0, morgan_1.default)('dev'));
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
// init database
init_mongodb_1.instanceMongodb;
// init router
app.use(routes_1.indexRouter);

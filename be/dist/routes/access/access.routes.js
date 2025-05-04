"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessRouter = void 0;
const express_1 = __importDefault(require("express"));
const access_controller_1 = require("../../controllers/access.controller");
const router = express_1.default.Router();
exports.accessRouter = router;
router.get('/', access_controller_1.AccessController.signUp);

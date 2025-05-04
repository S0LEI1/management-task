"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceMongodb = exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_mongodb_1 = require("../configs/config.mongodb");
const { db: { host, port, name }, } = config_mongodb_1.env === 'dev' ? config_mongodb_1.config['dev'] : config_mongodb_1.config['pro'];
const connectString = `mongodb://${host}:${port}/${name}`;
class Database {
    constructor() {
        this.connect();
    }
    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose_1.default.set('debug', true);
            mongoose_1.default.set('debug', { color: true });
        }
        mongoose_1.default
            .connect(connectString)
            .then((_) => {
            console.log('Connect mongodb success');
            console.log(connectString);
        })
            .catch((err) => console.log('Error connect', err));
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
exports.Database = Database;
const instanceMongodb = Database.getInstance();
exports.instanceMongodb = instanceMongodb;

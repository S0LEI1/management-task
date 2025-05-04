import mongoose from 'mongoose';
import { config, env } from '../configs/config.mongodb';

const {
  db: { host, port, name },
} = env === 'dev' ? config['dev'] : config['pro'];
const connectString = `mongodb://${host}:${port}/${name}`;
export class Database {
  constructor() {
    this.connect();
  }
  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }
    mongoose
      .connect(connectString)
      .then((_) => {
        console.log('Connect mongodb success');
        console.log(connectString);
      })
      .catch((err) => console.log('Error connect', err));
  }
  private static instance: Database;
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

export { instanceMongodb };

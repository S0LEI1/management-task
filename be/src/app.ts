import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import { instanceMongodb } from './databases/init.mongodb';
import { indexRouter } from './routes';
import { errorHandler } from './core/middleware/error-handler.middleware';
import { BadRequestError } from './core/error/bad-request.error';

const app = express();
// init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// init database
instanceMongodb;
// init router
app.use(indexRouter);
app.all('*', async (req, res) => {
  throw new BadRequestError('Route must be define');
});
app.use(errorHandler);
// error handler
export { app };

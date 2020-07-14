import * as dotenv from 'dotenv';
dotenv.config();
import express, { Application, Response } from 'express';
import {activateConsumer} from './services/rabbitMq';
import {sequelizeClient} from './services/sequelize';

const app: Application = express();
const port: Number = Number(process.env.SERVER_PORT) || 3000;

app.use('/', (req, res: Response) => {
  return res
    .status(200)
    .json('Hello world!');
});

app.listen(port, () => {
  sequelizeClient();
  activateConsumer();
  console.log(`Server is listening on port ${port}!`);
});



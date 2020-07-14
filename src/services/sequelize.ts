import {Sequelize} from 'sequelize-typescript';
import {PageModel} from '../models/PageModel';

const database: string = process.env.DB_DATABASE;
const username: string = process.env.DB_USERNAME;
const password: string = process.env.DB_PASSWORD;
const port: number = Number(process.env.DB_PORT);
const host: string = process.env.DB_HOST;

export const sequelizeClient = (): Sequelize => new Sequelize({
  dialect: 'mariadb',
  host,
  port,
  database,
  username,
  password,
  dialectOptions: {
    useUTC: false,
    dateStrings: true,
    typeCast: true,
    timezone: 'Etc/GMT0',
  },
  models: [PageModel],
  logging: false
});

export const getPage = async (id: number): Promise<PageModel> => {
  console.log(id);
  return PageModel.findOne({
    where: {
      id: id
    },
    attributes: ['login', 'password', 'id', 'url'],
  });
};

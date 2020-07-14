import {AfterFind, Column, DataType, Model, Table} from 'sequelize-typescript';
import {encryptor} from '../services/encryptor';

@Table({
  tableName: 'pages',
  underscored: true,
})

export class PageModel extends Model<PageModel> {
    @Column(DataType.STRING)
    url: string;

    @Column(DataType.STRING)
    login: string;

    @Column(DataType.STRING)
    password: string;

    @Column(DataType.STRING)
    status: string;

    @AfterFind
    static decryptCredentials(page: PageModel) {
      page.setDataValue('login', encryptor.decrypt(page.login));
      page.setDataValue('password', encryptor.decrypt(page.password));
    }
}


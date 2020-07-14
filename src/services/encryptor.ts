// @ts-ignore
import {Encryptor} from 'node-laravel-encryptor';

export const encryptor = new Encryptor({
  key: process.env.APP_KEY,
  serialize_mode: 'php'
});

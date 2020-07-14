import * as Amqp from 'amqp-ts';
import {Connection, Message, Queue} from 'amqp-ts';

const host: string = process.env.RABBITMQ_HOST;
const port: string = process.env.RABBITMQ_PORT;
const user: string = process.env.RABBITMQ_LOGIN;
const queueName: string = process.env.RABBITMQ_QUEUE;
const password: string = process.env.RABBITMQ_PASSWORD;
const maxForks: number = Number(process.env.MAX_FORKS) || 10;
const CONN_URL: string = `amqp://${  user  }:${  password  }@${  host  }:${  port  }/`;

export type MessageInterface<T = object> = T & {
  pageId: number,
  appKey: string
}

type MessageType = MessageInterface<{}>;

export const activateConsumer = (): void => {
  let forkCounter = 0;
  const connection = setConnection(CONN_URL);
  const queue = setQueue(connection);

  const onMessage = async (message: Message) => {
    forkCounter += 1;
    console.log(`received ${  message.getContent()}`);
    if (forkCounter === maxForks) {
      console.log('stopping');
      queue.stopConsumer();
    }

    // const childProcess: ChildProcess = fork(
    //   modulePath
    //   , []
    //   , {
    //     execArgv: ['-r', 'ts-node/register']
    //   }
    // );

    const parsedMessage: MessageType = JSON.parse(message.getContent());
    message.ack();

    // childProcess.send({payload: parsedMessage, message});

    // childProcess.on('exit', () => {
    //   forkCounter -= 1;
    //   if (forkCounter === maxForks - 1) {
    //     console.log('restarting');
    //     queue.activateConsumer(onMessage, options)
    //   }
    // })
  };

  queue.activateConsumer(onMessage, options);
};

export const setConnection = (url: string): Connection => new Amqp.Connection(url);

export const setQueue = (connection: Connection): Queue => connection.declareQueue(queueName, {durable: true});

const options: object = {noAck: false};

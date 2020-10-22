import { createConnection, ConnectionOptions } from 'typeorm';

import entities from './root.enities';

let isConnected = false;

// Set TypeOrm connection options here
const connectionOpts = {
  port: 5432,
  database: 'pos',
  type: 'postgres',
  host: 'localhost',
  synchronize: true,
  username: 'posuser',
  password: 'adminadmin',
  entities: [...entities],
} as ConnectionOptions;

/**
 * @description Initialize database connection
 */
export default async (retryDelay: number) => {
  let count = 0;
  while (true) {
    try {
      if (!isConnected) {
        const conn = await createConnection(connectionOpts);
        isConnected = conn.isConnected;
      }
      return;
    } catch (err) {
      count += 1;
      console.error(`Connection Attempt ${count} Failed: `, err);
      console.info(`Retrying connection in ${retryDelay} seconds`);
      await wait(retryDelay * 1000);
      continue;
    }
  }
};

/**
 * @param duration time in ms to pause
 * @description Pause for given number of `duration`
 */
function wait(duration: number) {
  return new Promise((resolve, __) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

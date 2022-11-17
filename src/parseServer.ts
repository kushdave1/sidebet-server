import MoralisEthAdapter from './auth/MoralisEthAdapter';
// @ts-ignore
// import { ParseServer } from 'parse-server';
import ParseServer from 'parse-server';
import config from './config';

export const parseServer = new ParseServer({
  databaseURI: config.DATABASE_URI,
  cloud: config.CLOUD_PATH,
  serverURL: config.SERVER_URL,
  appId: config.APPLICATION_ID,
  masterKey: config.MASTER_KEY,
  auth: {
    moralisEth: {
      module: MoralisEthAdapter,
    },
  },
});

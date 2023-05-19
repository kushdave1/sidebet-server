import Moralis from 'moralis';
// @ts-ignore
import ParseServer from 'parse-server';
import config from './config';
import cors from 'cors';
import express from 'express';
import http from 'http';
import ngrok from 'ngrok';
import { parseServer } from './parseServer';
import { streamsSync } from '@moralisweb3/parse-server';
import { parseDashboard } from './parseDashboard';
export const app: any = express();

Moralis.start({
  apiKey: config.MORALIS_API_KEY,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

if (config.USE_STREAMS) {
  app.use(
    streamsSync(parseServer, {
      apiKey: config.MORALIS_API_KEY,
      webhookUrl: config.STREAMS_WEBHOOK_URL,
    }),
  );
}

app.use(`/server`, parseServer.app);
// Add the new route //
app.use(`/dashboard`, parseDashboard);
const httpServer = http.createServer(app);
httpServer.listen(config.PORT, async () => {
  if (config.USE_STREAMS) {
    // eslint-disable-next-line no-console
    console.log(
      `Moralis Server is running on port ${config.PORT}`,
    );
  } else {
    // eslint-disable-next-line no-console
    console.log(`Moralis Server is running on port ${config.PORT}.`);
  }
});
// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
declare const Parse: any;

import './generated/evmApi';
import './generated/solApi';

import { requestMessage } from '../auth/authService';
// @ts-ignore
import { logger } from "parse-server";
Parse.Cloud.define('requestMessage', async ({ params }: any) => {
  const { address, chain, networkType } = params;

  const message = await requestMessage({
    address,
    chain,
    networkType,
  });

  return { message };
});

Parse.Cloud.define('getPluginSpecs', () => {
  // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
  return [];
});

Parse.Cloud.define('getServerTime', () => {
  // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
  return null;
});

Parse.Cloud.define('tf1', () => {
  logger.info('this is a logged message from a cloud function');
  logger.error('this is a logged error from a cloud function 1');
  return ['this is test function 1'];
});

Parse.Cloud.define('tf2', () => {
  return [['this is'], 'this is test function 1'];
});

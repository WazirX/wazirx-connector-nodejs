import * as crypto from "crypto-js";
import { AxiosResponse } from 'axios';

const catchBlock = (err:any) => {
  throw err;
}


const apiCatchBlock = (res:any = {}) => {
  let {data, statusText, status} = res.response || {};
  throw {data, statusText, status};
}

const METHOD = {
  // Public API Methods
  PING: {NAME: 'ping', ENDPOINT: '/ping'},
  TIME: {NAME: 'time', ENDPOINT: '/time'},
  SYSTEM_STATUS: {NAME: 'systemStatus', ENDPOINT: '/systemStatus'},
  EXCHANGE_INFO: {NAME: 'exchangeInfo', ENDPOINT: '/exchangeInfo'},
  TICKERS: {NAME: 'tickers', ENDPOINT: '/tickers/24hr'},
  TICKER: {NAME: 'ticker', ENDPOINT: '/ticker/24hr'},
  DEPTH: {NAME: 'depth', ENDPOINT: '/depth'},
  TRADES: {NAME: 'trades', ENDPOINT: '/trades'},
  HISTORICAL_TRADES: {NAME: 'historicalTrades', ENDPOINT: '/historicalTrades'},

  // Account API Methods
  ORDER: {NAME: 'order', ENDPOINT: '/order'},
  TEST_ORDER: {NAME: 'testOrder', ENDPOINT: '/testOrder'},
  OPEN_ORDERS: {NAME: 'openOrders', ENDPOINT: '/openOrders'},
  ALL_ORDERS: {NAME: 'allOrders', ENDPOINT: '/allOrders'},
  ACCOUNT: {NAME: 'account', ENDPOINT: '/account'},
  FUNDS: {NAME: 'funds', ENDPOINT: '/funds'},

  // Websocket Auth Token
  WS_AUTH_TOKEN: {NAME: 'wsAuthToken', ENDPOINT: '/create_auth_token'}
}

const generateSignature = (secretKey:string, payload:string) => crypto.HmacSHA256(payload, secretKey) + '';

export {
  catchBlock,
  METHOD,
  generateSignature,
  apiCatchBlock
}

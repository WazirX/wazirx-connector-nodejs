require('dotenv').config()
var chai = require('chai');
var {Client} = require('../lib/cjs').v1;
var assert = chai.assert;  
var expect = chai.expect; 
var should = chai.should();

describe('Wazirx Node SDK specs', () => {
  describe('should general methods works without API Key and Secrect Key', () => {
    let client;
    before(function() {
      client = new Client();
    });

    it('ping', async function() {
      this.timeout(500);
      let res = await client.ping();
      expect(res).to.have.property('data');
      expect(res).to.have.property('status');
      expect(res.status).to.eql(200);
    });

    it('time', async function() {
      this.timeout(500);
      let res = await client.time();
      expect(res).to.have.property('data');
      expect(res.data).to.have.property('serverTime');
      expect(res).to.have.property('status');
      expect(res.status).to.eql(200);
    });

    it('systemStatus', async function() {
      this.timeout(500);
      let res = await client.systemStatus();
      expect(res).to.have.property('data');
      expect(res.data).to.have.property('status');
      expect(res.data).to.have.property('message');
      expect(res.data.status).to.eql('normal');
      expect(res.data.message).to.eql('System is running normally.');
      expect(res).to.have.property('status');
      expect(res.status).to.eql(200);
    });

    it('exchangeInfo', async function() {
      this.timeout(500);
      let res = await client.exchangeInfo();
      expect(res).to.have.property('data');
      expect(res.data).to.have.property('symbols');
      expect(res.data).to.have.property('timezone');
      expect(res.data).to.have.property('serverTime');
      expect(res.data.symbols).to.be.an('array');
      expect(res.status).to.eql(200);
    });
  });
  
  describe('should public methods works without API Key and Secrect Key', ()=> {
    let client;
    before(function() {
      client = new Client();
    });
    it('tickers', async function() {
      this.timeout(500);
      let res = await client.tickers();
      expect(res.status).to.eql(200);
      expect(res).to.have.property('data');
      expect(res).to.have.property('status');
      expect(res.data).to.be.an('array');
    });

    it('ticker', async function() {
      this.timeout(500);
      let res = await client.ticker({symbol: 'btcinr'});
      expect(res.status).to.eql(200);
      expect(res).to.have.property('data');
      expect(res).to.have.property('status');
      expect(res.data).to.be.an('object');
    });

    it('depth', async function() {
      this.timeout(500);
      let res = await client.depth({symbol: 'btcinr', limit: 10});
      expect(res).to.have.property('status');
      expect(res.status).to.eql(200);
      expect(res).to.have.property('data');
      expect(res.data).to.be.an('object');
      expect(res.data).to.have.property('timestamp');
      expect(res.data).to.have.property('asks');
      expect(res.data.asks).to.be.an('array');
    });

    it('trades', async function() {
      this.timeout(500);
      let res = await client.trades({symbol: 'btcinr', limit: 10});
      expect(res).to.have.property('status');
      expect(res.status).to.eql(200);
      expect(res).to.have.property('data');
      expect(res.data).to.be.an('array');
    });
  });

  describe('should Market Data methods works with keys', () => {
    let client;
    let publicClient;
    before(function() {
      publicClient = new Client();
      client = new Client(process.env.API_KEY, process.env.API_SECRECT);
    });

    it('historicalTrades', async () => {
      this.timeout(500);
      let res = await client.historicalTrades({symbol: 'btcinr', limit: 10, recvWindow: 10000});
      expect(res).to.have.property('status');
      expect(res.status).to.eql(200);
      expect(res).to.have.property('data');
      expect(res.data).to.be.an('array');
    });
  });
 
  describe('should trading methods works with keys', () => {
    let client;
    let publicClient;
    before(function() {
      publicClient = new Client();
      client = new Client(process.env.API_KEY, process.env.API_SECRECT);
    });
    
    it.skip('order', async () => {
      let res = await client.order({symbol: 'btcinr', side:'buy', type: 'limit', recvWindow: 10000, quantity:1, price:50});
      expect(res).to.have.property('status');
      expect(res.status).to.eql(200);
      expect(res).to.have.property('data');
    });

    it.skip('testOrder', async () => {
      let res = await client.testOrder({symbol: 'btcinr', side:'buy', type: 'limit', recvWindow: 10000, quantity:1, price:50});
      expect(res).to.have.property('status');
      expect(res.status).to.eql(200);
      expect(res).to.have.property('data');
    });

    it.skip('queryOrder', async () => {
      let res = await client.queryOrder({orderId: 23223196, recvWindow: 20000});
      expect(res).to.have.property('status');
      expect(res.status).to.eql(200);
      expect(res).to.have.property('data');
    });

    it('openOrders', async () => {
      this.timeout(500);
      let res = await client.openOrders({orderId: 23223196, limit: 1, recvWindow: 20000});
      expect(res).to.have.property('status');
      expect(res.status).to.eql(200);
      expect(res).to.have.property('data');
    });

    it('allOrders', async () => {
      this.timeout(500);
      let res = await client.openOrders({symbol: 'btcusdt', orderId: 23223196, recvWindow: 20000, startTime: 1590148051000, limit: 100});
      expect(res).to.have.property('status');
      expect(res.status).to.eql(200);
      expect(res).to.have.property('data');
    });

    it.skip('cancelOrder', async () => {
      this.timeout(500);
      let res = await client.cancelOrder({symbol: 'btcinr', recvWindow: 10000, orderId:23223196});
      expect(res).to.have.property('status');
      expect(res.status).to.eql(200);
      expect(res).to.have.property('data');
    });

    it.skip('cancelAllOrder', async () => {
      this.timeout(500);
      let res = await client.cancelAllOrder({symbol: 'btcinr', recvWindow: 10000});
      expect(res).to.have.property('status');
      expect(res.status).to.eql(200);
      expect(res).to.have.property('data');
    });
  });

  describe('should account methods works with keys', () => {
    let client;
    let publicClient;
    before(function() {
      publicClient = new Client();
      client = new Client(process.env.API_KEY, process.env.API_SECRECT);
    });
    
    it('account', async () => {
      this.timeout(500);
      let res = await client.account({recvWindow: 20000});
      expect(res).to.have.property('status');
      expect(res.status).to.eql(200);
      expect(res).to.have.property('data');
      expect(res.data).to.be.an('object');
    });

    it('funds', async () => {
      this.timeout(500);
      let res = await client.funds({recvWindow: 20000});
      expect(res).to.have.property('status');
      expect(res.status).to.eql(200);
      expect(res).to.have.property('data');
      expect(res.data).to.be.an('array');
    });
  });

  describe('should Websocket Auth Token methods works with keys', () => {
    let client;
    let publicClient;
    before(function() {
      publicClient = new Client();
      client = new Client(process.env.API_KEY, process.env.API_SECRECT);
    });
    
    it('wsAuthToken', async () => {
      this.timeout(500);
      let res = await client.wsAuthToken({recvWindow: 10000});
      expect(res).to.have.property('status');
      expect(res.status).to.eql(200);
      expect(res).to.have.property('data');
      expect(res.data).to.be.an('object');
    });
  });
});
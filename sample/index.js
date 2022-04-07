const {Client,WsClient} = require('../lib/cjs').v1;

let apiKey = 'your api key';
let secretKey = 'your secret key';

let client = new Client(apiKey, secretKey);
let ws = new WsClient(apiKey, secretKey);


async function run() {
  // WS Example
  await ws.connect().catch((err) => {
    console.log(err)
  });

  await ws.ping().catch((err) => {
    console.log(err)
  });
  await ws.depth(["btcinr","btcusdt"]).catch((err) => {
    console.log(err)
  });
  await ws.trades(["btcinr","btcusdt"]).catch((err) => {
    console.log(err)
  });
  await ws.multiStream([{"symbol" : ["btcinr","btcusdt"], "type" : "depth"}, {"symbol" : ["btcinr","btcusdt"], "type" : "trades"}, {"type" : "ticker"}]).catch((err) => {
    console.log(err)
  });
  // API Example
  await client.ping().catch((err) => {
    console.log(err)
  });
  console.log(data);
}

run();

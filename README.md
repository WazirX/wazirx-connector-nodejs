# Wazirx NodeJS

[![Npm Version](https://img.shields.io/badge/npm%20version-1.0.0-brightgreen?style=flat&logo=node.js)](https://docs.wazirx.com)

This is an official NodeJS wrapper for the Wazirx exchange REST and WebSocket APIs.

##### Notice

We are now at 1.0 and there may be things breaking, don't hesitate to raise an issue if you feel so!

## Installation

Clone the repo and run the
```cmd
npm install
```

## Features

#### Current

* Basic implementation of REST API
  * Easy to use authentication
  * Methods return parsed JSON
  * No need to generate timestamps
  * No need to generate signatures
* Basic implementation of WebSocket API
  * Call `connect` method for initiating connection
  * Single and multiple streams supported
  * All methods runs with `await` call inside async function

#### Planned

* Exception handling with responses
* High level abstraction


## Getting Started

#### REST Client

Require Wazirx Node Rest Client:
```js
const { Client } = require('@wazirx/node-client').v1;
```

Create a new instance of the REST Client:

```js
// If you only plan on touching public API endpoints, no need to pass any arguments
let client = new Client();
// Otherwise provide an apiKey and secretKey as keyword arguments
let client = new Client(apiKey, secretKey);
```

Create various requests:

## General Endpoints

#### Ping

```js
client.ping
```
Response:
```json-doc
{ data: {}, status: 200 }
```
#### Server time

```js
client.time
```
Response:
```json-doc
{ data: { serverTime: 1641952885079 }, status: 200 }
```
#### System status

```js
client.systemStatus
```
Response:
```json-doc
{
  data: { status: 'normal', message: 'System is running normally.' },
  status: 200
}
```
#### Exchange info

```js
client.exchangeInfo
```
Response:
```json-doc
{
  data: {
    "timezone": "UTC",
    "serverTime": 1641952969748,
    "symbols": [
        {
            "symbol": "wrxinr",
            "status": "trading",
            "baseAsset": "wrx",
            "quoteAsset": "inr",
            "baseAssetPrecision": 5,
            "quoteAssetPrecision": 0,
            "orderTypes": [
                "limit",
                "stop_limit"
            ],
            "isSpotTradingAllowed": true,
            "filters": [
                {
                    "filterType": "PRICE_FILTER",
                    "minPrice": "1",
                    "tickSize": "1"
                }
            ]
        }
    ]
  }
}
```
#### Create an order
```js
client.order({symbol: 'btcinr', side:'buy', type: 'limit', recvWindow: 10000, quantity:1, price:50});
```
Response:
```json-doc
{data:{"id"=>27007862, "symbol"=>"btcinr", "type"=>"limit", "side"=>"buy",
"status"=>"wait", "price"=>"210.0", "origQty"=>"1.0", "executedQty"=>"0.0",
"createdTime"=>1632310960000, "updatedTime"=>1632310960000}}
```

##### For other methods follow [this](https://github.com/WazirX/wazirx-connector-nodejs/blob/master/src/v1/api-wrapper.ts).

##### For example and better understanding the api client usage refer [here](https://github.com/WazirX/wazirx-connector-nodejs/blob/master/sample/index.js)

Required and optional parameters, as well as enum values, can currently be found on the [Wazirx Documentation](https://docs.wazirx.com). Parameters should always be passed to client methods as keyword arguments in snake_case form.

#### WebSocket Client

Require Wazirx Node WebSocket Client:
```js
const { WsClient } = require('@wazirx/node-client').v1;
```

Create a new instance of the REST Client:

```js
# If you only plan on touching public API endpoints, you can forgo any arguments
let ws = new WsClient();
# Otherwise provide an api_key and secret_key as keyword arguments
let ws = new WsClient(apiKey, secretKey);
```

Make sure to call `connect` before start using other Methods

```js
await ws.connect().catch((err) => {
  console.log(err);
});
```

Create various WebSocket streams:

```js
  # Pass the symbol/symbols to subscribe to trades
  await ws.trades(['btcinr','wrxinr'], 0, 'subscribe');

  # Pass the symbol/symbols to subscribe to depth
  await ws.depth(['btcinr','wrxinr'], 0, 'subscribe');

  # For all market tickers
  await ws.allMarketTicker(['btcinr','wrxinr'], 0, 'subscribe');

```
##### Note:
* `symbol` can be `Array` for multiple.
* `id` by default is `0`, for unique identification any positive integer can be used.
* `action` only needs to pass in case of `unsubscribe`, default is `subscribe` if no data passed.

#### User Data Stream

User data streams utilize both the REST and WebSocket APIs.

Request a listen key from the REST API, and then create a WebSocket stream using it.

```js
await ws.userStream(['orderUpdate', 'ownTrade', 'outboundAccountPosition'], 0, 'subscribe');
```

##### For other websocket methods follow [this](https://github.com/WazirX/wazirx-connector-nodejs/blob/master/src/v1/ws-wrapper.ts).

##### For example and better understanding the websocket client usage refer [here](https://github.com/WazirX/wazirx-connector-nodejs/blob/master/sample/index.js)

## Development

After checking out the repo, run `npm install` to install dependencies. Then, run `npm test` to run the tests. You can also run `node sample/index.js` for an interactive prompt that will allow you to experiment.

## Contributing

Bug reports and pull requests are welcome on GitHub at [Issues](https://github.com/WazirX/wazirx-connector-nodejs/issues).

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
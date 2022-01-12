# Wazirx

This is an official NodeJS wrapper for the Wazirx exchange REST and WebSocket APIs.

##### Notice

We are now at Beta and there are may breaking changes, mainly with some method names and the casing of keys. Be sure to check out the code while I work on better documentation.

## Installation for devs

Clone the repo and run the ```npm install```

Generate API KEY from Wazirx website using the https://wazirx.com/settings/keys

Create .env file with following value
```WAZIRX_API_KEY=XXX```
```WAZIRX_API_SECRET=YYY```

For testing run ```npm test```


## Features

#### Current

* Basic implementation of REST API
  * Easy to use authentication
  * Methods return parsed JSON
  * No need to generate timestamps
  * No need to generate signatures
  * Websocket auth generation


## Getting Started

#### REST Client

Create a new instance of the REST Client:

# If you only plan on touching public API endpoints, you can forgo any arguments
```js
const { 
  Client
 } = require('@wazirx/node-client').v1;

let client = new Client();

# Otherwise provide an apiKey and secretKey as keyword arguments
const { 
  Client
 } = require('@wazirx/node-client').v1;

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

## Contributing

Bug reports and pull requests are welcome on GitHub at [Issues](https://github.com/WazirX/wazirx-connector-nodejs/issues).

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
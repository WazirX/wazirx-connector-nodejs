#!/usr/bin/env node
import WebSocket from 'ws';
import { Client } from "./client";

const ws = new WebSocket('wss://stream.wazirx.com/stream', {
  perMessageDeflate: false
});

const SUBSCRIBE = "subscribe";
const TRADES = "trades";
const DEPTH = "depth";
const TICKER = "ticker";

export class WsWrapper {
  private apiKey:string;
  private secretKey:string;
  private client:Client
  private authToken:any;

  constructor(apiKey:string, secretKey:string) {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.client = new Client(apiKey, secretKey);
  }

  async connect(){
    while(ws.readyState !== 1){
      await this.sleep(1000);
    }

    ws.on('open', function open() {});

    ws.on('message', function message(data) {
      console.log('%s',data);
    });

    setInterval(async () => {
      await this.sendHeartbeat();
    }, 2900000 );
  }

  async disconnect(){
    ws.close();
  }

  async ping() {
    await this.sendHeartbeat();
  }

  async trades(symbol:string[], id=0, action=SUBSCRIBE) {
    var streams = await this.getMappedStreams(symbol,TRADES);
    await this.subUnsub(action,streams,id);
  }

  async depth(symbol:string[], id=0, action=SUBSCRIBE) {
    var streams = await this.getMappedStreams(symbol,DEPTH);
    await this.subUnsub(action,streams,id);
  }

  async allMarketTicker(id=0, action=SUBSCRIBE) {
    var streams = new Array("!ticker@arr");
    await this.subUnsub(action,streams,id);
  }

  async userStream(streams:string[], id=0, action=SUBSCRIBE) {
    await this.subUnsub(action,streams,id,true);
  }

  async multiStream(streams:{[key: string]: any}[], id=0, action=SUBSCRIBE) {
    let formatStreams = new Array();
    for (const stream of streams) {
      if(stream.type == DEPTH) {
        formatStreams = formatStreams.concat(await this.getMappedStreams(stream.symbol,DEPTH));
      }
      if(stream.type == TRADES) {
        formatStreams = formatStreams.concat(await this.getMappedStreams(stream.symbol,TRADES));
      }
      if(stream.type == TICKER) {
        formatStreams.push("!ticker@arr");
      }
    }
    await this.subUnsub(action,formatStreams,id);
  }

  async sendHeartbeat() {
    try {
      ws.send('{"event":"ping"}');
    } catch (err) {
      throw err;
    }
  }

  async subUnsub(event:string, streams:string[], id:number, auth=false) {
    var stream = streams.join('","')
    var msg = '{"event":"'+event+'","streams":["'+stream+'"],"id":'+id
    if(auth){
      if(this.authToken == null || this.authToken == ''){
        let token = await this.client.wsAuthToken();
        this.authToken = token.data.auth_key;
      }
      msg += ',"auth_key":"'+this.authToken+'"}';
    } else {
      msg += '}';
    }
    console.log(msg);

    try {
      ws.send(msg);
    } catch (err) {
      throw err;
    }
  }

  async getMappedStreams(symbol:string[] = [], type:string = ""){
    let events = new Array();
    symbol.forEach(function(sym) {
        events.push(sym+'@'+type);
    });
    return events
  }

  async sleep(ms:number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
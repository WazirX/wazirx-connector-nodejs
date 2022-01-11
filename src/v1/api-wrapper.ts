import { RequestWrapper, ReqOptions } from "./request-wrapper";
import { Method, AxiosRequestHeaders } from 'axios';
import { METHOD, catchBlock, generateSignature } from "./util";

export class ApiWrapper extends RequestWrapper {
  private setAPIKey;
  private qsGenerator;
  private setContentType;
  private setSignature;

  constructor(apiKey:string, secretKey:string) {
    super();
    this.setAPIKey = (headers:AxiosRequestHeaders) => {
      headers['X-Api-Key'] = apiKey;
    }
    this.setContentType = (headers:AxiosRequestHeaders) => {
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    this.qsGenerator = (q:any) => {
      return new URLSearchParams(q).toString();
    }
    this.setSignature = (payload:any) => {
      payload.timestamp = new Date().getTime();
      payload.signature = generateSignature(secretKey, new URLSearchParams(payload).toString());
    }
  }
  
  // Public API Methods
  async ping() {
    let headers:AxiosRequestHeaders = {}
    let method:Method = 'GET';
    let options:ReqOptions = {
      headers:headers,
      url: METHOD.PING.ENDPOINT,
      method:method,
    };
    try {
      return await this.request(options).catch(catchBlock)
    } catch(err) {
      throw err;
    }
  }

  async time() {
    let headers:AxiosRequestHeaders = {}
    let method:Method = 'GET';
    let options:ReqOptions = {
      headers:headers,
      url: METHOD.TIME.ENDPOINT,
      method:method
    };
    try {
      return await this.request(options).catch(catchBlock)
    } catch(err) {
      throw err;
    }
  }

  async systemStatus() {
    let headers:AxiosRequestHeaders = {}
    let method:Method = 'GET';
    let options:ReqOptions = {
      headers:headers,
      url: METHOD.SYSTEM_STATUS.ENDPOINT,
      method:method
    };
    try {
      return await this.request(options).catch(catchBlock)
    } catch(err) {
      throw err;
    }
  }

  async exchangeInfo() {
    let headers:AxiosRequestHeaders = {}
    let method:Method = 'GET';
    let options:ReqOptions = {
      headers:headers,
      url: METHOD.EXCHANGE_INFO.ENDPOINT,
      method:method
    };
    try {
      return await this.request(options).catch(catchBlock)
    } catch(err) {
      throw err;
    }
  }

  async tickers() {
    let headers:AxiosRequestHeaders = {}
    let method:Method = 'GET';
    let options:ReqOptions = {
      headers:headers,
      url: METHOD.TICKERS.ENDPOINT,
      method:method
    };
    try {
      return await this.request(options).catch(catchBlock)
    } catch(err) {
      throw err;
    }
  }

  async ticker(q?:any) {
    let headers:AxiosRequestHeaders = {}
    let method:Method = 'GET';
    let options:ReqOptions = {
      headers:headers,
      url: METHOD.TICKER.ENDPOINT,
      method:method,
      query:this.qsGenerator(q)
    };
    try {
      return await this.request(options).catch(catchBlock)
    } catch(err) {
      throw err;
    }
  }

  async depth(q?:any) {
    let headers:AxiosRequestHeaders = {}
    let method:Method = 'GET';
    let options:ReqOptions = {
      headers:headers,
      url: METHOD.DEPTH.ENDPOINT,
      method:method,
      query:this.qsGenerator(q)
    };
    try {
      return await this.request(options).catch(catchBlock)
    } catch(err) {
      throw err;
    }
  }

  async trades(q?:any) {
    let headers:AxiosRequestHeaders = {}
    let method:Method = 'GET';
    let options:ReqOptions = {
      headers:headers,
      url: METHOD.TRADES.ENDPOINT,
      method:method,
      query:this.qsGenerator(q)
    };
    try {
      return await this.request(options).catch(catchBlock)
    } catch(err) {
      throw err;
    }
  }

  async historicalTrades(q:any={}) {
    try {
      let headers:AxiosRequestHeaders = {}
      this.setAPIKey(headers);
      this.setSignature(q);
      let method:Method = 'GET';
      let options:ReqOptions = {
        headers:headers,
        url: METHOD.HISTORICAL_TRADES.ENDPOINT,
        method:method,
        query:this.qsGenerator(q)
      };
      return await this.request(options).catch(catchBlock)
    } catch(err) {
      throw err;
    }
  }

  // Account API Methods
  async order(data:any= {}) {
    try {
      let headers:AxiosRequestHeaders = {}
      this.setAPIKey(headers);
      this.setContentType(headers);
      this.setSignature(data);
      let method:Method = 'POST';
      let options:ReqOptions = {
        headers:headers,
        url: METHOD.ORDER.ENDPOINT,
        method: method,
        data: this.qsGenerator(data)
      };
      return await this.request(options).catch(catchBlock)
    } catch(err) {
      throw err;
    }
  }

  async testOrder(data:any = {}) {
    try {
      let headers:AxiosRequestHeaders = {}
      this.setAPIKey(headers);
      this.setContentType(headers);
      this.setSignature(data);
      let method:Method = 'POST';
      let options:ReqOptions = {
        headers:headers,
        url: METHOD.TEST_ORDER.ENDPOINT,
        method:method,
        data:this.qsGenerator(data)
      };
      return await this.request(options).catch(catchBlock)
    } catch(err) {
      throw err;
    }
  }

  async queryOrder(q:any = {}) {
    try {
      let headers:AxiosRequestHeaders = {}
      this.setAPIKey(headers);
      this.setSignature(q);
      let method:Method = 'GET';
      let options:ReqOptions = {
        headers:headers,
        url: METHOD.ORDER.ENDPOINT,
        method:method,
        query:this.qsGenerator(q)
      };
      return await this.request(options).catch(catchBlock)
    } catch(err) {
      throw err;
    }
  }

  async openOrders(q:any={}) {
    try {
      let headers:AxiosRequestHeaders = {}
      this.setAPIKey(headers);
      this.setSignature(q);
      let method:Method = 'GET';
      let options:ReqOptions = {
        headers:headers,
        url: METHOD.OPEN_ORDERS.ENDPOINT,
        method:method,
        query:this.qsGenerator(q)
      };
      return await this.request(options).catch(catchBlock)
    } catch(err) {
      throw err;
    }
  }

  async allOrders(q:any = {}) {
    try {
      let headers:AxiosRequestHeaders = {}
      this.setAPIKey(headers);
      this.setSignature(q);
      let method:Method = 'GET';
      let options:ReqOptions = {
        headers:headers,
        url: METHOD.ALL_ORDERS.ENDPOINT,
        method:method,
        query:this.qsGenerator(q)
      };
      return await this.request(options).catch(catchBlock)
    } catch(err) {
      throw err;
    }
  }

  async cancelOrder(data:any= {}) {
    try {
      let headers:AxiosRequestHeaders = {}
      this.setAPIKey(headers);
      this.setContentType(headers);
      this.setSignature(data);
      let method:Method = 'DELETE';
      let options:ReqOptions = {
        headers: headers,
        url: METHOD.ORDER.ENDPOINT,
        method: method,
        data: this.qsGenerator(data)
      };
      return await this.request(options).catch(catchBlock)
    } catch(err) {
      throw err;
    }
  }

  async cancelAllOrder(data:any={}) {
    try {
      let headers:AxiosRequestHeaders = {}
      this.setAPIKey(headers);
      this.setContentType(headers);
      this.setSignature(data);
      let method:Method = 'DELETE';
      let options:ReqOptions = {
        headers: headers,
        url: METHOD.OPEN_ORDERS.ENDPOINT,
        method: method,
        data: this.qsGenerator(data)
      };
      return await this.request(options).catch(catchBlock)
    } catch(err) {
      throw err;
    }
  }

  async account(q:any={}) {
    try {
      let headers:AxiosRequestHeaders = {}
      this.setSignature(q);
      this.setAPIKey(headers);
      let method:Method = 'GET';
      let options:ReqOptions = {
        headers:headers,
        url: METHOD.ACCOUNT.ENDPOINT,
        method:method,
        query:this.qsGenerator(q)
      };
      return await this.request(options).catch(catchBlock)
    } catch(err) {
      throw err;
    }
  }

  async funds(q:any = {}) {
    try {
      let headers:AxiosRequestHeaders = {}
      this.setSignature(q);
      this.setAPIKey(headers);
      let method:Method = 'GET';
      let options:ReqOptions = {
        headers:headers,
        url: METHOD.FUNDS.ENDPOINT,
        method:method,
        query:this.qsGenerator(q)
      };
      return await this.request(options).catch(catchBlock)
    } catch(err) {
      throw err;
    }
  }

   // Websocket Auth Token
  async wsAuthToken(data:any = {}) {
    try {
      let headers:AxiosRequestHeaders = {}
      this.setSignature(data);
      this.setAPIKey(headers);
      this.setContentType(headers);
      let method:Method = 'POST';
      let options:ReqOptions = {
        headers:headers,
        url: METHOD.WS_AUTH_TOKEN.ENDPOINT,
        method:method,
        data:this.qsGenerator(data)
      };
      return await this.request(options).catch(catchBlock)
    } catch(err) {
      throw err;
    }
  }
}

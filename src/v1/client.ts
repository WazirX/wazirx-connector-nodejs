import { ApiWrapper } from "./api-wrapper";
import { WsWrapper } from "./ws-wrapper";

export class Client extends ApiWrapper {
  public dubug:boolean = false;
  constructor(apiKey?:string, secretKey?:string) {
    super(apiKey, secretKey);
  }
}

export class WsClient extends WsWrapper {
  public dubug:boolean = true;
  constructor(apiKey?:string, secretKey?:string) {
    super(apiKey, secretKey);
  }
}


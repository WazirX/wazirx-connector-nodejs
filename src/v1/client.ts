import { ApiWrapper } from "./api-wrapper";

export class Client extends ApiWrapper { 
  public dubug:boolean = false;
  constructor(apiKey?:string, secretKey?:string) {
    super(apiKey, secretKey);
  }
}



import axios, { 
  AxiosResponse, AxiosRequestConfig, Method, AxiosRequestHeaders } from 'axios';
import * as util from './util';

const BASE_URL = 'https://api.wazirx.com';
const BASE_PAHT = '/sapi';
const VERSION = '/v1';

export interface ReqOptions { 
  headers: AxiosRequestHeaders,
  data?: any,
  method: Method,
  url: string,
  query?: string,
  version?: string,
  basePath?: string
}

export class RequestWrapper{

  constructor() {

  }

  async request(options:ReqOptions) {
    try {
      let {query, version, basePath, headers} = options;
      headers['User-Agent'] = 'Wazirx-Node-client';
      let reqObj:AxiosRequestConfig = {...options};
      let baseUrl = `${BASE_URL}${basePath ? basePath : BASE_PAHT}${version ? version : VERSION}`;
      reqObj.url = `${baseUrl}${reqObj.url}`;
      if(query) {
        reqObj.url += `?${query}`;
      }
      let response:AxiosResponse = await axios(reqObj).catch(util.apiCatchBlock);
      let {data, status} = response;
      return {data, status};
    } catch(err) {
      throw err;
    }
    
  }
}

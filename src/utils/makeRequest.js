// import axios from 'axios';
import axiosHandler  from "../services/axiosClient";
import https from 'https';
import to from 'await-to-js';
// const httpContext = require('express-http-context');

const makeRequest = async (url, method, payload, headers= {}, meta={}, reject_unauthorized = true) => {
    headers['Content-Type'] = headers['Content-Type'] ? headers['Content-Type'] : 'application/json';
    let _err = null;
    let _res = null;
  
    let httpsAgent;
    if (!reject_unauthorized) {
      httpsAgent = new https.Agent({ rejectUnauthorized: false });
    }
    // const reqId = httpContext.get('reqId');
  
    [_err, _res] = await to(
      axiosHandler({
        method: method,
        url: url,
        data: payload,
        headers: headers,
        httpsAgent
      })
    );
    // 
    let host = null;
    let responseBody = null;
    if (!_res || !_res.status) {
      let message = '';
      let err = _err;
      let res = _res;
      if (_err && err.response && err.response.data) {
        responseBody = err.response.data.data || err.response.data || res.data;
        message = err.response.data.Message;
      } else {
        message = err.message ? err.message : res.data.data.ResponseData.ResponseMessage;
      }
      host = err.request && err.request.res ? err.request.res.client.servername : '';
      const m = err.response ? err.response.data : err.response;
      const statusCode = err.response ? err.response.status : 400;
      console.info(message, method, url, payload, responseBody, statusCode, host, err, 'FAILED');
      return {
        success: false,
        message,
        data: responseBody,
        statusCode,
        meta: m
      };
    }
    if(_res.data.status){
      if(_res && _res.data.status !== 'success'){
        const statusCode = 400;
        
        return {
          success: false,
          message: _res.data.Message,
          data: _res.data,
          statusCode,
          meta: _res.data
        }
      };
    }
    host = _res.request.res.client.servername;
    responseBody = _res.data.data || _res.data;
    return { success: true, message: 'success', data: responseBody, statusCode: _res.status };
};

export {
    makeRequest
}
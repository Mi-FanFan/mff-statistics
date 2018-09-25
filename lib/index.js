'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));

/**
 * Created by Freeman on 2017/9/29.
 */
var X_U_SSID = 'X_U_SSID';
var HOST = '/api/';

function getSsid () {
  var arr, reg = new RegExp('(^| )' + X_U_SSID + '=([^;]*)(;|$)');
  if (typeof document !== 'undefined'){
    if (arr =  document.cookie.match(reg))
      return arr[2]
    else
      return null
  }else if (typeof localStorage !== 'undefined' ){
    return localStorage.getItem(X_U_SSID)
  }else
    return null
}

var instance = axios.create({
  baseURL: HOST,
  headers: {'X-User-ssid': getSsid()},
});

/**
 *
 * @param valuevar
 * @param platform 平台 1：pc，2：移动端
 * @param version 版本
 */
function statistics (value, platform, version) {
   var data = {
    source: document.referrer,
    urlLog: window.location.href,
    eventCode: value,
    pcMobile: platform,
    version: version
  };

  instance.post('eventLogs', {data: data});
}

module.exports = statistics;

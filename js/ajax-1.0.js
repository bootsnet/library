/*
   Ajax JS : Bootsnet Lib.
   Powered by : bootsnet inc.
   Copyright by : bootsnet inc.
   Created by : mohammad sefatullah.
   Last updated : 29, Dec 2020
*/

(function(window) {
  "use strict";

  function Ajax(ajax_option) {
    let ajax_setting;
    let method, url, data;
    let ajax_request;
    let fn = {};

    function isEmpty(object) {
      for (let x in object) {
        if (object.hasOwnProperty(x)) {
          return false;
        }
      }
      return true;
    }
    function urlEncode(object) {
      let urlData = '';
      if (!object) {
        return '';
      }
      for (let x in object) {
        urlData = urlData + x + '=' + encodeURIComponent(object[x]) + '&';
      }
      urlData = urlData.substr(0, (urlData.length - 1));
      return urlData;
    }
    if (ajax_option) {
      ajax_setting = ajax_option;
    } else {
      return console.error('Failed to success XMLHttpRequest. Ajax arguments are required.');
    }
    if (ajax_setting.method) {
      method = ajax_setting.method;
    } else {
      return console.error('Failed to success XMLHttpRequest. Ajax methods are required.');
    }
    if (ajax_setting.url) {
      url = ajax_setting.url;
    } else {
      return console.error('Failed to success XMLHttpRequest. Ajax urls are required.');
    }

    data = ajax_setting.data || '';
    if (ajax_setting.method === 'GET' && data && !isEmpty(data)) {
      url = url + '?' + urlEncode(data);
    }

    try {
      ajax_request = new XMLHttpRequest();
    } catch (e) {
      try {
        ajax_request = new ActiveXObject('MSXML2.XMLHTTP');
      } catch(e) {
        ajax_request = new ActiveXObject('Microsoft.XMLHTTP');
      }
    }
    ajax_request.open(method, url);
    if (ajax_setting.setRequestHeader) {
      for (let key in ajax_setting.setRequestHeader) {
        ajax_request.setRequestHeader(key, ajax_setting.setRequestHeader[key]);
      }
    }
    if (ajax_setting.withCredentials) {
      ajax_request.withCredentials = true;
    }
    if (ajax_setting.method !== 'GET') {
      ajax_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    ajax_request.send(urlEncode(data));
    fn = {
      onload: function ( {
        success, error
      }) {
        // handle IE8 IE9 CORS
        if (typeof(XDomainRequest) !== 'undefined') {
          let host = location.host,
          matchUrl = url.replace('https://', '').replace('http://', '');
          matchUrl = matchUrl.slice(0, matchUrl.indexOf('/'));
          if (url.indexOf('//') === 0 || matchUrl !== host) {
            let xdr = new XDomainRequest();
            xdr.open(method, url);
            xdr.onprogress = function () {
              // progress
            };
            xdr.ontimeout = function () {
              // timeout
            };
            xdr.onerror = function () {
              // error
            };
            xdr.onload = function() {
              if (success) {
                success(JSON.parse(xdr.responseText));
              }
            };
            setTimeout(function () {
              xdr.send();
            }, 0);

            return;
          }
        }
        // handle IE8 IE9 CORS end
        ajax_request.onreadystatechange = function () {
          if (success || error) {

            if (ajax_request.readyState === 4) {
              if (ajax_request.status === 200) {
                let response;
                switch (ajax_setting.response) {
                  case 'json':
                    response = JSON.parse(ajax_request.responseText);
                    break;
                  case 'xml':
                    response = ajax_request.responseXML;
                    break;
                  case 'auto':
                    response = ajax_request;
                    break;
                  default:
                    response = JSON.parse(ajax_request.responseText);
                    break;
                }
                if (success) {
                  success(response);
                }
              } else {
                if (error) {
                  error(ajax_request.status, ajax_request.responseText);
                } else {
                  return console.error('ajax_request.status', ajax_request.status);
                }
              }
            }
          } else {
            return console.error('Failed to success XMLHttpRequest. Only 1 callbackss are required.');
          }
        };
      },
    };
    return fn;
  }

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = Ajax;
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return Ajax;
    });
  } else if (!window.Ajax) {
    window.Ajax = Ajax;
  }

} (typeof window !== 'undefined' ? window: this));

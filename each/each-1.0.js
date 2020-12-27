/**
* Each JS 1.0 || http://eachjs.atwebpages.com
* Each JS is a javascript framework and library for developing best.
* Copyright 2020 by Bootsnet inc.
* Licensed under Apache 2.0
*/

(function (window) {
  'use strict';
  let Each = function (argument) {
    switch (argument) {
      case 'ajax':
        Each.prototype.GET = function(url, {
          load, error
        }, asyn) {
          AjaxGet(url, load, error, asyn);
        };
        Each.prototype.POST = function(url, send, {
          load, error
        }, asyn) {
          AjaxPost(url, load, error, asyn, send);
        };
        break;

      default:
        // code
      }
    };
    let AjaxGet = function(a, b, c, d) {
      if (a) {
        let request;
        try {
          // Try to create object for Firefox, Safari, IE7, etc.
          request = new XMLHttpRequest();
        } catch (e) {
          try {
            // Try to create object for later versions of IE.
            request = new ActiveXObject('MSXML2.XMLHTTP');
          } catch (e) {
            try {
              // Try to create object for early versions of IE.
              request = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e) {
              // Could not create an XMLHttpRequest object
              return false;
            }
          }
        }
        if (request != false) {
          request.open('GET', a, true);
          request.onreadystatechange = function() {

            if (request.readyState == 4) {
              // Do stuff to handle response
              let data = request;

              switch (d) {
                case 'text':
                  data = request.responseText;
                  break;
                case 'xml':
                  data = request.responseXML;
                  break;
                case 'object':
                  data = JSON.parse(request.responseText);
                  break;
                case 'auto':
                  data = request;
                  break;
                default:
                  data = request;
                }
                return b(data);

              }
            };
            request.onerror = function () {
              // we have reached our server, but it returns an error
              return c(request.status, request.statusText, request);
            };
            request.send(null);
          } else {
            // throw new Error("");
          }
        }
      };
      let AjaxPost = function(a, b, c, d, x) {
        if (a) {
          let request;
          try {
            // Try to create object for Firefox, Safari, IE7, etc.
            request = new XMLHttpRequest();
          } catch (e) {
            try {
              // Try to create object for later versions of IE.
              request = new ActiveXObject('MSXML2.XMLHTTP');
            } catch (e) {
              try {
                // Try to create object for early versions of IE.
                request = new ActiveXObject('Microsoft.XMLHTTP');
              } catch (e) {
                // Could not create an XMLHttpRequest object
                return false;
              }
            }
          }
          if (request != false) {
            request.open('POST', a, true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            request.onreadystatechange = function() {

              if (request.readyState == 4 && request.status == 200) {
                // Do stuff to handle response
                let data = request;

                switch (d) {
                  case 'text':
                    data = request.responseText;
                    break;
                  case 'xml':
                    data = request.responseXML;
                    break;
                  case 'object':
                    data = JSON.parse(request.responseText);
                    break;
                  case 'auto':
                    data = request;
                    break;
                  default:
                    data = request;
                  }
                  return b(data);

                }

              };
              request.onerror = function () {
                // we have reached our server, but it returns an error
                return c(request.status, request.statusText, request);
              };
              request.send(x);
            } else {
              // throw new Error("");
            }
          }
        };


        if (typeof module === 'object' && typeof module.exports === 'object') {
          module.exports = Each;
        } else if (typeof define === 'function' && define.amd) {
          define([], function () {
            return Each;
          });
        } else if (!window.Each) {
          window.Each = Each;
        }

      } (typeof window !== 'undefined' ? window: this));

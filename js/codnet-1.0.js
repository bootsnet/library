/*
   Codnet JS : Bootsnet Lib.
   Powered by : bootsnet inc.
   Licensed under : Apache 2.0
   Created by : mohammad sefatullah.
   Last updated : 31, Dec 2020

 # In this version, [1.0] features :
  * XMLHttpRequest
  * Window customize
  * Font and selection styles (Typography 1)

 # In this version, [1.0] included :
  * Ajax : Arguments- url, method, credential, requestHeader, section, success with onload, error with onload. Create a XMLHttpRequest request with any tools.
  * Window : Get window type like- mobile, tablet, ipad, laptop, dekstop and set anythings with window.
  * Fonts : Arguments- element, family, size, weight, style, width, height, space, breaks, color. Create a typography.
  * Select : Arguments- element, bgcolor, color. Create a selection styles.
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
      return console.error('Failed to load XMLHttpRequest. Ajax arguments are required.');
    }
    if (ajax_setting.method) {
      method = ajax_setting.method;
    } else {
      return console.error('Failed to load XMLHttpRequest. Ajax methods are required.');
    }
    if (ajax_setting.url) {
      url = ajax_setting.url;
      if (ajax_setting.cors == "anywhere") {
        url = "https://cors-anywhere.herokuapp.com/"+ajax_setting.url;
      }
    } else {
      return console.error('Failed to load XMLHttpRequest. Ajax urls are required.');
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
    if (ajax_setting.requestHeader) {
      for (let key in ajax_setting.setRequestHeader) {
        ajax_request.setRequestHeader(key, ajax_setting.setRequestHeader[key]);
      }
    }
    if (ajax_setting.credential) {
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
                let section;
                switch (ajax_setting.section) {
                  case 'object':
                    section = JSON.parse(ajax_request.responseText);
                    break;
                  case 'xml':
                    section = ajax_request.responseXML;
                    break;
                  case 'none':
                    section = ajax_request;
                    break;
                  case 'text':
                    section = ajax_request.responseText;
                    break;
                  default:
                    section = ajax_request;
                    break;
                }
                if (success) {
                  success(section);
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

  function Windows( {
    mobile, tablet, laptop, ipad, dekstop, otherwise
  }) {
    if (mobile || tablet || laptop || ipad || dekstop || otherwise) {
      let onl = function() {
        if (window.innerWidth <= 400) {
          if (mobile) {
            // mobile window
            mobile(window);
          }
        } else if (window.innerWidth <= 870 && window.innerWidth >= 400) {
          if (tablet) {
            // tablet window
            tablet(window);
          }
        } else if (window.innerWidth <= 970 && window.innerWidth >= 870) {
          if (ipad) {
            // ipad window
            ipad(window);
          }
        } else if (window.innerWidth <= 1100 && window.innerWidth >= 970) {
          if (laptop) {
            // laptop window
            laptop(window);
          }
        } else if (window.innerWidth <= 1200 && window.innerWidth >= 1100) {
          if (dekstop) {
            // dekstop window
            dekstop(window);
          }
        } else {
          if (otherwise) {
            // other window
            otherwise(window);
          }
        }
      };
      if (document.body) onl();
      else window.onload = onl;
    } else {
      return console.error("Failed to execute window. Only 1 arguments are required, but only 0 arguments are present.");
    }
  }

  function Fonts( {
    element = "body", family = "Ubuntu", size, weight, style, height, space, width, breaks, color
  }) {
    if (element) {
      if (family) {
        let fontLink = document.createElement("link");
        fontLink.rel = "stylesheet";
        fontLink.setAttribute("href", "https://fonts.googleapis.com/css?family="+family+"&display=swap");
        let fontLinkAppend = function (argument) {
          document.head.appendChild(fontLink);
          element.style.fontFamily = family;
        };
        if (document.body) fontLinkAppend();
        else window.onload = fontLinkAppend;
      }
      if (size) {
        element.style.fontSize = size;
      }
      if (weight) {
        element.style.fontWeight = weight;
      }
      if (style) {
        element.style.fontStyle = style;
      }
      if (height) {
        element.style.lineHeight = height;
      }
      if (space) {
        element.style.letterSpacing = space;
      }
      if (width) {
        element.style.wordSpacing = width;
      }
      if (color) {
        element.style.color = color;
      }
      if (breaks) {
        switch (breaks) {
          case '1':
            breaks = "auto";
            break;
          case '2':
            breaks = "loose";
            break;
          case '3':
            breaks = "normal";
            break;
          case '4':
            breaks = "strict";
            break;
          default:
            breaks = breaks;
            break;
        }
        element.style.lineBreak = breaks;
      }
    } else {
      return console.error("Failed to create fonts. Element arguments are required, but not present.");
    }
  }

  function Select( {
    element = "", bgcolor = "rgb(0,123,255,0.3)", color = "#fff"
  }) {
    if (bgcolor && color) {
      let style = document.createElement("style");
      let selection;
      style.type = "text/css";
      style.innerHTML = element+" ::selection {background: "+bgcolor+";color:"+color+";}";

      let onl = function (argument) {
        document.head.appendChild(style);
      };
      if (document.body) onl();
      else window.onload = onl;
    } else {
      return console.error("Failed to create selection styles. Bgcolor and color arguments are required, but all are not present.");
    }
  }

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = Ajax;
    module.exports = Windows;
    module.exports = Font;
    module.exports = Select;
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return Ajax, Windows, Fonts, Select;
    });
  } else {
    if (!window.Ajax) {
      window.Ajax = Ajax;
    }
    if (!window.Windows) {
      window.Windows = Windows;
    }
    if (!window.Fonts) {
      window.Fonts = Fonts;
    }
    if (!window.Select) {
      window.Select = Select;
    }
  }
} (typeof window !== 'undefined' ? window: this));

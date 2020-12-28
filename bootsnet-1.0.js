/*
  Bootsnet JS : bootsnet inc.
  Version : 1.0
  Created on : 20 Dec 2020
  Modified on : 28 Dec 2020
  Updated on : 28 Dec 2020
  Copyright ©️ 2020 by bootsnet inc.
*/

let cors = "";
  let Ajax = function(URL) {
    let fn= {
      get: function( {
        load, error
      }, type) {
        if (URL) {
          let ajax = new XMLHttpRequest();
          try {
            ajax = new XMLHttpRequest();
          } catch(e) {
            try {
              ajax = new ActiveXObject('MSXML2.XMLHTTP');
            } catch(e) {
              ajax = new ActiveXObject('Microsoft.XMLHTTP');
            }
          }
          ajax.open("GET", URL, false);
          ajax.onreadystatechange = function() {
            if (load) {
              if (ajax.readyState == 4 && ajax.state == 200) {
                // Do stuff to handle response
                let data = ajax;

                switch (type) {
                  case 'text':
                    data = ajax.responseText;
                    break;
                  case 'xml':
                    data = ajax.responseXML;
                    break;
                  case 'object':
                    data = JSON.parse(ajax.responseText);
                    break;
                  case 'auto':
                    data = ajax;
                    break;
                  default:
                    data = ajax;
                    break;
                }
                return load(ajax);
              }
            } else {
              if (error) {
                return error(ajax);
              }
            }
          };
          ajax.onerror = function () {
            console.log("Error: failed to load Ajax: XMLHttpRequest.");
          };
          ajax.send(null);
        }
      },
    };
    return fn;
  };

  let Firebase = function(conf) {
    let fn = {
      on: function( {
        load, error
      }) {
        let x = document.createElement('script');
        let y = document.createElement('script');
        let z = document.createElement('script');
        let n = document.createElement('script');

        x.src = 'https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js';
        y.src = 'https://www.gstatic.com/firebasejs/7.17.1/firebase-analytics.js';
        z.src = 'https://www.gstatic.com/firebasejs/7.17.1/firebase-auth.js';
        n.src = '/__/firebase/init.js';

        let configuration = function() {
          document.head.appendChild(x);
          document.head.appendChild(y);
          document.head.appendChild(z);
          document.head.appendChild(n);
          // Initialize Firebase
          try {
            firebase.initializeApp(conf);
            firebase.analytics();
            firebase.auth().onAuthStateChanged(function(user) {
              return load(user);
            });
          } catch(e) {
            return error(e);
          }
        };

        if (document.body) {
          configuration();
        } else {
          window.onload = configuration;
        }
      },
    };

    return fn;
  };

(function (window) {
  'use strict';

  let Bootsnet = function () {
    // body...
  };

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = Bootsnet;
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return Bootsnet;
    });
  } else {
    if (!window.Bootsnet) {
      window.Bootsnet = Bootsnet;
    }
  }

} (typeof window !== 'undefined' ? window: this));

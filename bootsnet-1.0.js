/*
  Bootsnet JS : bootsnet inc.
  Version : 1.0
  Created on : 20 Dec 2020
  Modified on : 26 Dec 2020
  Updated on : 26 Dec 2020
  Copyright ©️ 2020 by bootsnet inc.
*/


let cors = "";
let Ajax = {
  GET: function(ajax_url, {
    load, error, ready
  }) {
    if (ajax_url) {
      let ajax = new XMLHttpRequest();
      ajax.open("GET", ajax_url);
      if (ready) {
        ajax.onreadystatechange = function(data) {
          return ready(ajax);
        };
      }
      if (load) {
        ajax.onload = function(data) {
          return load(ajax);
        };
      }
      if (error) {
        ajax.onerror = function(data) {
          return error(ajax.status, ajax.statusText);
        };
      }
      ajax.send(null);
    }
  },
  POST: function(urls, data, {
    load, error, ready
  }) {
    if (urls) {
      let ajax = new XMLHttpRequest();
      ajax.open("POST", urls);
      ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      ajax.send(data);
      if (ready) {
        ajax.onreadystatechange = function(data) {
          return ready(ajax);
        };
      }
      if (load) {
        ajax.onload = function(data) {
          return load(ajax);
        };
      }
      if (error) {
        ajax.onerror = function(data) {
          return error(ajax.status, ajax.statusText);
        };
      }
    } else {
      throw new Error("Somethings is broken or not used. check now.");
    }
  }
};

let Alert = function( {
  title, message, okay, cancel
}) {
  // check the parameters
  if (title != null && message != null && okay != null && cancel != null) {
    // alerts container
    let bootslert_layer = document.createElement("div");
    bootslert_layer.classList.add("bootslert-layer");

    let bootslert_main = document.createElement("main");
    bootslert_main.classList.add("bootslert");

    // show/hide button
    let bootslert_info_btn = document.createElement("div");
    bootslert_info_btn.innerText = "Alert";
    bootslert_info_btn.classList.add("bootslert-info-btn");

    bootslert_info_btn.addEventListener("click", function () {
      // Information

    }, true);

    // alerts okay/cancel button
    let bootslert_okay = document.createElement("div");
    bootslert_okay.classList.add("bootslert-okay");

    let bootslert_cancel = document.createElement("div");
    bootslert_cancel.classList.add("bootslert-cancel");

    // alerts main content
    let bootslert_title = document.createElement("h3");

    let bootslert_msg = document.createElement("p");

    // setup configuration
    let configuration = function() {
      // 1
      document.body.appendChild(bootslert_layer);
      document.body.appendChild(bootslert_main);
      // 2
      bootslert_main.appendChild(bootslert_info_btn);
      // 3
      if (title == false) {
        bootslert_title.innerText = "Alert";
        bootslert_main.appendChild(bootslert_title);
      } else {
        bootslert_title.innerText = title;
        bootslert_main.appendChild(bootslert_title);
      }

      bootslert_msg.innerText = message;
      bootslert_main.appendChild(bootslert_msg);

      if (okay != false && cancel != false) {
        bootslert_cancel.innerText = cancel;
        bootslert_main.appendChild(bootslert_cancel);
        bootslert_okay.innerText = okay;
        bootslert_main.appendChild(bootslert_okay);
      } else if (okay != false && cancel == false) {
        bootslert_okay.innerText = okay;
        bootslert_main.appendChild(bootslert_okay);
      } else if (okay == false && cancel != false) {
        bootslert_cancel.innerText = cancel;
        bootslert_main.appendChild(bootslert_cancel);
      } else {
        setTimeout(()=> {
          bootslert_okay.innerText = "Okay";
          bootslert_main.appendChild(bootslert_okay);
          bootslert_okay.style.display = "none";
          bootslert_okay.click();
        }, 2000);
      }

      bootslert_okay.addEventListener("click", function() {
        let ev = this.parentNode;
        ev.style.animation = "0.5s bootslert-fadeout linear";
        bootslert_layer.style.animation = "0.5s layer-fadeout linear";

        setTimeout(function() {
          bootslert_layer.remove();
          ev.remove();
        }, 500);
      }, true);
      bootslert_cancel.addEventListener("click", function() {
        let ev = this.parentNode;
        ev.style.animation = "0.5s bootslert-fadeout linear";
        bootslert_layer.style.animation = "0.5s layer-fadeout linear";

        setTimeout(function() {
          bootslert_layer.remove();
          ev.remove();
        }, 500);
      }, true);
    };

    let fn = {
      okay: function(callback) {
        if (okay != null) {
          bootslert_okay.addEventListener("click", function() {
            let ev = this.parentNode;
            ev.style.animation = "0.5s layer-fadeout linear";
            bootslert_layer.style.animation = "0.5s layer-fadeout linear";

            setTimeout(function() {
              bootslert_layer.remove();
              ev.remove();
            }, 500);
            return callback();
          }, true);
        }
      },
      cancel: function(callback) {
        if (cancel != null) {
          bootslert_cancel.addEventListener("click", function() {
            let ev = this.parentNode;
            ev.style.animation = "0.5s bootslert-fadeout linear";
            bootslert_layer.style.animation = "0.5s layer-fadeout linear";

            setTimeout(function() {
              bootslert_layer.remove();
              ev.remove();
            }, 500);
            return callback();
          }, true);
        }
      }
    };

    if (document.body) configuration();
    else window.onload = configuration;

    return fn;
  } else {
    throw new Error("Somethings is broken or not used. check now.");
  }
};
let Canvas = function(elem) {
  var canvas = elem.getContext('2d');
  let fn = {
    line: function( {
      left, top, right, bottom, color
    }) {
      // Lines
      canvas.strokeStyle = color;
      canvas.moveTo(left, top);
      canvas.lineTo(right, bottom);
      canvas.stroke();
    },
    rect: function( {
      left, top, right, bottom, type, color
    }) {
      // Rects
      eval("canvas."+type+"Style = '"+color+"';");
      eval("canvas."+type+"Rect(left,top,right, bottom)");
      eval("canvas."+type+"();");
    },
    arc: function( {
      left, top, size, type, color
    }) {
      canvas.beginPath();
      eval("canvas."+type+"Style = '"+color+"';");
      canvas.arc(left, top, size, 0, 20 * Math.PI);
      eval("canvas."+type+"();");
    },
    text: function( {
      left, top, size, style, color, value
    }) {
      canvas.font = size+"px "+style;
      canvas.fillText(value, left, top);
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

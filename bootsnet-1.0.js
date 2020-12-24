/*
  Bootsnet JS : bootsnet inc.
  Version : 1.0
  Created on : 20 Dec 2020
  Modified on : 22 Dec 2020
  Updated on : 24 Dec 2020
  Copyright ©️ 2020 by bootsnet inc.
*/

"use strict";

/* It will remember you that bootspro JS is staying with your documents */

(function() {
  console.info("Bootsnet JS is standing on your documents.\n\bBootsnet JS 1.0.");
}());


/* Information:
  AJAX stands for Asynchronous JavaScript And XML. In a nutshell, it is the use of the XMLHttpRequest object to communicate with servers. It can send and receive information in various formats, including JSON, XML, HTML, and text files.
  From: MDN, Mozilla
*/

let Ajax = function(urls) {
  let ajax = new XMLHttpRequest();
  ajax.open("GET", urls);
  ajax.send(null);
  return {
    on: function( {
      load, error
    }) {
      (function() {
        console.log("Bootsnet JS 1.0 > new Ajax().on()");
      }());
      ajax.onload = function(data) {
        if (ajax.status >= 200 && ajax.status < 400) {
          return load(JSON.parse(ajax.responseText), ajax);
        } else {
          return error(ajax.status, ajax.statusText);
        }
      };
      ajax.onerror = function(data) {
        return error(ajax.status, ajax.statusText);
      };
    },

  };
};

/* Information:
   The Canvas API provides a means for drawing graphics via JavaScript and the HTML <canvas> element. Among other things, it can be used for animation, game graphics, data visualization, photo manipulation, and real-time video processing.
   The Canvas API largely focuses on 2D graphics. The WebGL API, which also uses the <canvas> element, draws hardware-accelerated 2D and 3D graphics.
   From: mdn, mozilla
*/

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
      (function() {
        console.log("Bootsnet JS 1.0 > new Canvas().rect()");
      }());
    },
    arc: function( {
      left, top, size, type, color
    }) {
      canvas.beginPath();
      eval("canvas."+type+"Style = '"+color+"';");
      canvas.arc(left, top, size, 0, 20 * Math.PI);
      eval("canvas."+type+"();");
      (function() {
        console.log("Bootsnet JS 1.0 > new Canvas().arc()");
      }());
    },
    text: function( {
      left, top, size, style, color, value
    }) {
      canvas.font = size+"px "+style;
      canvas.fillText(value, left, top);
      (function() {
        console.log("Bootsnet JS 1.0 > new Canvas().text()");
      }());
    },
  };
  return fn;
};

/* Information:
   The alert dialog should be used for messages which do not require any response on the part of the user, other than the acknowledgement of the message.
  From: mdn, mozilla
*/

let Alert = function( {
  title, message, okay, cancel, info
}) {
  // check the parameters
  if (title != null && message != null && okay != null && cancel != null && info != null) {
    // alerts container
    let bootslert_layer = document.createElement("div");
    bootslert_layer.classList.add("bootslert-layer");

    let bootslert_main = document.createElement("main");
    bootslert_main.classList.add("bootslert");

    // show/hide button
    let bootslert_info_btn = document.createElement("div");
    bootslert_info_btn.innerText = "Info";
    bootslert_info_btn.classList.add("bootslert-info-btn");

    bootslert_info_btn.addEventListener("click", function () {
      // Information

      new Alert({
        title: "Information",
        message: info,
        cancel: "Okay",
        okay: false,
        info: false
      });

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
      if (info != false) {
        bootslert_main.appendChild(bootslert_info_btn);
      }
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

      let info_dir = document.createElement("div");
      info_dir.innerHTML = "Bootslert 1.0, powered by bootsnet inc.";
      info_dir.style.color = "grey";
      info_dir.classList.add("bootslert-dir");
      if (info != false) bootslert_main.appendChild(info_dir);
    };

    let fn = {
      okay: function(callback) {
        if (okay != null) {
          (function() {
            console.log("Bootsnet JS 1.0 > new Alert().okay()");
          }());
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
          (function() {
            console.log("Bootsnet JS 1.0 > new Alert().cancel()");
          }());
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
    (function() {
      if (info != false) {
        console.log("Bootsnet JS 1.0 > new Alert()");
      }
    }());

    if (document.body) configuration();
    else window.onload = configuration;

    return fn;
  } else {
    throw new Error("Somethings is broken or not used. check now./nBootslert 1.0");
  }
};

/* Information:
   Google’s Firebase is a cloud-based database hosting service that will set up a database for you and host it, as well as offer you the tools to interact with it. You can use it to store and retrieve data in real time. That’s not all Firebase does, it can do more things like handle user authentication and store files, but we’ll be mainly focusing on data storage.
   From: css-tricks
*/

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

      (function() {
        console.log("Bootsnet JS 1.0 > new Firebase().on()");
      }());

      if (document.body) {
        configuration();
      } else {
        window.onload = configuration;
      }
    },
  };

  return fn;
};

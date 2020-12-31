
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

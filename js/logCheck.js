  // Initialize Firebase

  var config = {
    apiKey: "AIzaSyDD-AmEnz70-xxCoQwX0f0D6jn0BH4es08",
    authDomain: "lone-solider.firebaseapp.com",
    databaseURL: "https://lone-solider.firebaseio.com",
    storageBucket: "lone-solider.appspot.com",
  };
  firebase.initializeApp(config);


 initApp = function() {
        firebase.auth().onAuthStateChanged(function(user){
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            user.getToken().then(function(accessToken) {
              document.getElementById('sign-in-status').textContent = 'Signed in';
              document.getElementById('greeting').textContent = "Welcome Back " + displayName
            });
          } else {

            // User is signed out.
            document.getElementById('sign-in-status').textContent = 'Signed out';
          }
        }, function(error) {
          console.log(error);
        });
      };


      window.addEventListener('load', function() {
        initApp()
      });
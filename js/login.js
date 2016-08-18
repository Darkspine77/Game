  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDD-AmEnz70-xxCoQwX0f0D6jn0BH4es08",
    authDomain: "lone-solider.firebaseapp.com",
    databaseURL: "https://lone-solider.firebaseio.com",
    storageBucket: "lone-solider.appspot.com",
  };
  firebase.initializeApp(config);


      var uiConfig = {
        'signInSuccessUrl': 'game.html',
        'signInOptions': [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        'tosUrl': '<your-tos-url>',
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
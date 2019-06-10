import "https://www.gstatic.com/firebasejs/5.7.2/firebase.js"
import "https://cdn.firebase.com/libs/firebaseui/3.5.1/firebaseui.js"

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAP-M8b91cy6ShZuYE-hxr89Hj5InjQM_8",
  authDomain: "wishuponagoal.firebaseapp.com",
  databaseURL: "https://wishuponagoal.firebaseio.com",
  projectId: "wishuponagoal",
  storageBucket: "wishuponagoal.appspot.com",
  messagingSenderId: "318224137825"
};
firebase.initializeApp(config);

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: '#',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: '<your-tos-url>',
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
    window.location.assign('<your-privacy-policy-url>');
  },
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      console.log("signInSuccess");
      ui.reset();
      return false;
    }
  }
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);


function processForm(form){
  var message = document.getElementById("inputMessage").value;
  saveMessage(message);
  console.log(form);
  console.log('message: '+message);

  return false;
}
function saveMessage(message){
  var messageObject = {
    message: message
  };

  firebase.database().ref('message').push().set(messageObject)
    .then(function(snapshot) {
      success(); // some success method
    }, function(error) {
      console.log('error' + error);
      error(); // some error method
    });
}
function success(){
}
function error (){
}



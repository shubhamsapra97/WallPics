var dialog , user;
var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;

    $(".login-id").hide();
    $("#downloadBtn").hide();
    $("#deleteBtn").hide();
    $(".addOnsclose").hide();
    $("#cardLove").hide();
    dialog = document.querySelector('#login-dialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.close();
  } else {
    // No user is signed in.
    $(".login-id").show();
    $("#loginProgress").hide();
    $("#signupBtn").show();
    $("#loginBtn").show();
    dialog = document.querySelector('#login-dialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
  }
});
/* Login Process */

$("#anome").click(
  function(){
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  } else {
    // [START authanon]
    firebase.auth().signInAnonymously().catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/operation-not-allowed') {
        alert('You must enable Anonymous auth in the Firebase Console.');
      } else {
        console.error(error);
      }
      // [END_EXCLUDE]
    });
    // [END authanon]
  }
  document.getElementById('quickstart-sign-in').disabled = true;
}
);

$("#google").click(function(){

firebase.auth().signInWithPopup(provider).then(function(result) {
// This gives you a Google Access Token. You can use it to access the Google API.
var token = result.credential.accessToken;
// The signed-in user info.
var user = result.user;

console.log(user);
// ...
}).catch(function(error) {
// Handle Errors here.
var errorCode = error.code;
var errorMessage = error.message;
// The email of the user's account used.
var email = error.email;
// The firebase.auth.AuthCredential type that was used.
var credential = error.credential;
// ...
});

});

$("#fb").click(
  function(){

      if (!firebase.auth().currentUser) {
        // [START createprovider]
        var provider = new firebase.auth.FacebookAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('user_birthday');
        // [END addscopes]
        // [START signin]
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // [START_EXCLUDE]

          // [END_EXCLUDE]
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // [START_EXCLUDE]
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
          } else {
            console.error(error);
          }
          // [END_EXCLUDE]
        });
        // [END signin]
      }
  }
);

$("#loginBtn").click(
  function(){
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();

    if(email !== "" && password !== ""){
      $("#loginProgress").show();
      $("#loginBtn").hide();
      $("#signupBtn").hide();

      firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error){
        $("#loginError").show().text(error.message);
        $("#loginProgress").hide();
        $("#loginBtn").show();
      });
    }
  }
);

/*Sign UP Process*/
$("#signupBtn").click(
  function(){
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();
    if(email !== "" && password !== ""){

      $("#loginProgress").show();
      $("#loginBtn").hide();
      $("#signupBtn").hide();

      firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error){
        $("#loginError").show().text(error.message);
        $("#loginProgress").hide();
        $("#loginBtn").show();
      });
    }

  });

/*Logout process*/

$("#signoutBtn").click(
  function(){
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }, function(error) {
    // An error happened.
    alert(error.message);
    });
    }
);

$("#addBtn").click(
  function(){
    var dialog = document.querySelector('#addBtn-dialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
  }
);

function dialogClose(){
  var dialog = document.querySelector('#addBtn-dialog');
  if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
  dialog.close();
  uploader.value=0;
}

function addOnsClose(){
  $("#downloadBtn").hide();
  $("#deleteBtn").hide();
  $(".addOnsclose").hide();
}

var uploader = document.getElementById('uploader');
var fileBtn = document.getElementById('fileButton');

fileBtn.addEventListener('change' , function(e){

  //get file
  var file = e.target.files[0];

  //create storage ref
  var storageRef = firebase.storage().ref('catty/' + file.name);

  var  uploadmetadata={
      cacheControl: "max-age=" + (60*60*24*365)
  };

  //upload file
  var task = storageRef.put(file,uploadmetadata);

  //update progress bar
  task.on('state_changed',
    function progress(snapshot){
      var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader.value = percentage;
    },

    function error(err){
      alert("Error!!");
    },

    function complete(event){

        // var metadata = task.snapshot.metadata;
        // var fileRecord = {
        //   downloadURL: task.snapshot.downloadURL,
        //   metadata = {
        //
        //   }
        // }

        // Get the download URL
        var Url;
        storageRef.getDownloadURL().then(function(url) {
          $("#myimg").append("<img id='imgSize' src="+url+"</img>");
        });

      }
    )
});

var item;
var img = document.getElementById('myimg');
img.addEventListener('click' , function(e){
  item = e.target;
  $("#downloadBtn").show();
  $("#deleteBtn").show();
  $(".addOnsclose").show();
});

var download = document.getElementById('downloadBtn');
var i,j;
download.addEventListener('click',function(){
    var res = item.src.slice(69,82);

    var l = res.length;
    for(i=0;i<l;i++){
        if(res[i]==='%'){
            j=i;
            break;
        }
    }

    var name = res.slice((j+3),(l+1));
    var storage = firebase.storage();

    var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/b/bucket/o/catty%20'+name);
console.log(httpsReference);
    // var storageRef = firebase.storage().ref('catty/' + name);

    httpsReference.getDownloadURL().then(function(url) {
      // console.log(url);
      //   document.getElementsById("hi").setAttribute("href", url);
      var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function(event) {
    var blob = xhr.response;
  };
  xhr.open('GET', url);
  xhr.send();

    }).catch(function(error) {
      switch (error.code) {
         case 'storage/object_not_found':
           alert("File doesn't exist");
           break;

         case 'storage/unauthorized':
           alert("You don't have permission to access the object");
           break;

         case 'storage/canceled':
           alert("Upload Cancelled");
           break;

         case 'storage/unknown':
           alert("Unknown error occurred, inspect the server response");
           break;
        }

    });

})

$("#deleteBtn").click(
  function(){

    var res = item.src.slice(69,82);

    var l = res.length;
    for(i=0;i<l;i++){
        if(res[i]==='%'){
            j=i;
            break;
        }
    }

    var name = res.slice((j+3),(l+1));

    var storageRef = firebase.storage().ref('catty/' + name);

    // // Delete the file
    storageRef.delete().then(function() {
      alert("File deleted successfully!");
    }).catch(function(error) {
      alert("Uh-oh, an error occurred!");
    });
    item.style.display = 'none';
    $("#downloadBtn").hide();
    $("#deleteBtn").hide();
    $(".addOnsclose").hide();
  }
);

/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
    $(".mdl-layout__header").hide();
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
    $(".mdl-layout__header").show();
}

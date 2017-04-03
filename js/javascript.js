var dialog , user , displayName , photoURL , email , uid , imageCount=0 , c=0,f=0;

// $(document).ready(function(){
//
//   });
(function(){

    $(".button-collapse").sideNav();

    $('.button-collapse').sideNav({
     menuWidth: 300, // Default is 300
     edge: 'left', // Choose the horizontal origin
     closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
     draggable: true // Choose whether you can drag to open on touch screens
   }
 );

 $('.material-card').materialCard({
  icon_close: 'fa-chevron-left',
  icon_open: 'fa-thumbs-o-up',
  icon_spin: 'fa-spin-fast',
  card_activator: 'click' // or hover
});


 var hell = firebase.database().ref().child("myimages");
 hell.on('child_added', function(snapshot) {
  //  $(".image").attr("src" , snapshot.val());
  $("#myimg").append("<img class='materialboxed' id='" + imageCount + "'src="+snapshot.val()+"</img>");
  $('.materialboxed').materialbox();
  //  $("#"+imageCount).attr("class","materialboxed");
 }, function (error) {
    alert("Error: " + error.code);
 });
})();

firebase.database().ref("imageCount").on('value',function(snapshot) {
      var q = (Number)(snapshot.value);
     // imageCount = q;
     // if(imageCount>0){
     //   imageCount++;
     // }
});

// ADDING FUNCTIONALITIES.....

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $("#login-page").hide();
    $("#downloadBtn").hide();
    $("#deleteBtn").hide();
    $(".addOnsclose").hide();

    // if(user.uid == "VReENzNYOdV9LiFtxoA60M9adzp2"){
    //   $("#addBtn").show();
    // }
    // else{
    //   $("#addBtn").hide();
    // }

    dialog = document.querySelector('#login-dialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.close();

    dialog = document.querySelector('#signupdialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.close();
  } else {

    $("#login-page").show();
    $("#signupBtn").show();
    $("#loginBtn").show();

    dialog = document.querySelector('#login-dialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
  }
});

$("#signupoption").click(function(){
  $("#login-dialog").hide();

  dialog = document.getElementById('signupdialog');
  if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
  dialog.showModal();

});

$("#loginBtn").click(
  function(){
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();

    if(email !== "" && password !== ""){
    //  $("#loginProgress").show();
      $("#loginBtn").hide();
      $("#signupBtn").hide();
      $("#login-dialog").removeClass('animated ' + 'fadeIn');
      $('#login-dialog').addClass('animated fadeOut');

      firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error){

        $("#loginError").show().text(error.message);
        $("#login-dialog").removeClass('animated ' + 'fadeOut');
        $('#login-dialog').addClass('animated shake');
        $("#loginProgress").show();
        $("#loginBtn").show();
      });
    }
  }
);

/*Sign UP Process*/
$("#signupBtn").click(
  function(){
    var email = $("#loginEmail1").val();
    var password = $("#loginPassword1").val();


    if(email !== "" && password !== ""){

      $("#loginProgress").show();
      $("#loginBtn").hide();
      $("#login-dialog").removeClass('animated ' + 'fadeIn');
      $('#login-dialog').addClass('animated fadeOut');

      firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error){

        $("#loginError").show().text(error.message);
        $("#login-dialog").removeClass('animated ' + 'fadeOut');
        $('#login-dialog').addClass('animated shake');
        $("#loginProgress").hide();
        $("#loginBtn").hide();
        $("#signinoption").hide();
      });

    }
  });

  // social login

  var provider = new firebase.auth.GoogleAuthProvider();

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
    // document.getElementById('quickstart-sign-in').disabled = true;
  }
  );

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


  // social login ends

  $("#signoutBtn").click(
    function(){
      firebase.auth().signOut().then(function() {
          console.log("logged out");
          $("#login-dialog").removeClass('animated ' + 'fadeOut');
          $('#login-dialog').addClass('animated fadeIn');
      }, function(error) {
          console.log("error occured");
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

  var item;
  // var img = document.getElementById('myimg');
  // img.addEventListener('click' , function(e){
  //   item = e.target.id;
  //   $("#downloadBtn").show();
  //   $("#deleteBtn").show();
  //   $(".addOnsclose").show();
  // });

  // ADDED FUNCTIONALITIES.....

  // ADDING FIREBASE RELATED FUNCTIONALITIES.......

  fileButton.addEventListener('change' , function(e){

    f = imageCount+1;
    imagecount = imageCount.toString();

    var firebaseRef = firebase.database().ref("imageCount/").set(f);

    //get file
    var file = e.target.files[0];

    //create storage ref
    var storageRef = firebase.storage().ref('catty/' + imagecount);

  //  var ref = firebase.database().ref().child("catty");

    //upload file
    var task = storageRef.put(file);

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

          // Get the download URL
          var Url;

          storageRef.getDownloadURL().then(function(url) {

            var firebaseRef = firebase.database().ref();
            firebaseRef.child("myimages").child("images"+imagecount).set(url);
            $('.materialboxed').materialbox();

            imageCount++;

          });

        }
      )
  });

  var href = firebase.database().ref("myimages");

  href.on('child_removed', function(oldChildSnapshot) {

     imageCount--;
     var firebaseRef = firebase.database().ref("imageCount/").set(imageCount);

     var l = oldChildSnapshot.key.length;
     var a = oldChildSnapshot.key.slice(6,l+1);

     var reffy = firebase.storage().ref("catty/" + a.toString());

     reffy.delete().then(function() {
       alert("File deleted successfully!");
     }).catch(function(error) {
       alert("Uh-oh, an error occurred!");
     });

     var m = ('"#"+imageCount').toString();


  }, function (error) {
     console.log("Error: " + error.code);
  });


  $("#deleteBtn").click(
    function(){

      var storageRef = firebase.storage().ref('catty/' + item.id);

      f=f-1;
      var firebaseRef = firebase.database().ref("imageCount/").set(f);

      // // Delete the file
      storageRef.delete().then(function() {
        alert("File deleted successfully!");
      }).catch(function(error) {
        alert("Uh-oh, an error occurred!");
      });
      // item.style.display = 'none';
      $("#downloadBtn").hide();
      $("#deleteBtn").hide();
      $(".addOnsclose").hide();


      var a = "images"+item;

      firebase.database().ref().child("myimages").child(a).remove();
      alert("database deleted");

    }
  );

  $("#downloadBtn").click(function(e){
      alert(item);
      var c = item.toString();
      $("#downloading").attr("download" , item);
      $("#downloading").attr("href" , $("#"+c).attr('src'));
      $("#downloading").attr("title" , item);
      alert(item.name);
      $("#image").attr('src',k.slice(0,k.length-5));
  });

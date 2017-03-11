var dialog , user , displayName , photoURL , email , uid , imageCount=0;
var provider = new firebase.auth.GoogleAuthProvider();

(function(){

    var hell = firebase.database().ref().child("myimages");

    hell.on('child_added', function(snapshot) {

      $("#myimg").append("<img id='" + imageCount + "'src="+snapshot.val()+"</img>");

      //$("#myimg").append("<img id='" + imageCount + "'class='" + materialboxed  +  "'src="+snapshot.val()+"</img>");

      array.push(snapshot.val());

    }, function (error) {
       console.log("Error: " + error.code);
    });

    var chell = firebase.database().ref().child("imageCount");

    chell.on('value', function(snapshot) {

        imageCount = snapshot.val();

    }, function (error) {
       console.log("Error: " + error.code);
    });
})();

// var hey =   hell = firebase.database().ref().child("myimages");
// hey.on('child_removed' , function(snapshot){
//
//     var snappy = snapshot.val();
//     var a = snappy.slice(77,78);
//
//     $("#a").remove();
//
//
// });



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    // displayName = user.displayName;
    // email = user.email;
    // emailVerified = user.emailVerified;
    // photoURL = user.photoURL;
    // isAnonymous = user.isAnonymous;
    // uid = user.uid;
    // providerData = user.providerData;

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

    dialog = document.querySelector('#signupdialog');
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

$("#signupoption").click(function(){
  $("#login-dialog").hide();

  dialog = document.getElementById('signupdialog');
  if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
  dialog.showModal();

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
        $("#loginProgress").show();
        $("#loginBtn").show();
        $("#login-dialog").hide();

      });
    }
  }
);

/*Sign UP Process*/
$("#signupBtn").click(
  function(){
    var email = $("#loginEmail1").val();
    var password = $("#loginPassword1").val();
    displayName = $("#loginName").val();



    if(email !== "" && password !== ""){

      $("#loginProgress").show();
      $("#loginBtn").hide();

      firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error){

        $("#loginError").show().text(error.message);
        $("#loginProgress").hide();
        $("#loginBtn").hide();
        $("#signinoption").hide();
      });

    }
  });

/*Logout process*/

$("#signoutBtn").click(
  function(){
    firebase.auth().signOut().then(function() {
        console.log("logged out");
    }, function(error) {
        console.log("error occured");
    });
    }
);

// window.onbeforeunload = function(){
//
//
// };

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













var c=0,f=0;
var imagecount = '';
fileBtn.addEventListener('change' , function(e){

  f = Number(imageCount);
  f++;

  var firebaseRef = firebase.database().ref("imageCount/").set(f);

  //get file
  var file = e.target.files[0];

  imagecount = imageCount.toString();

  //create storage ref
  var storageRef = firebase.storage().ref('catty/' + imagecount);

//  var ref = firebase.database().ref().child("catty");



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

          c = Number(imageCount);

          $("#myimg").append("<img class='" + materialboxed + "'id='" + imagecount + "'src='"+url+"'</img>");

        //  alert(ref.length);

          var k = "images"+imagecount;
          //alert(k);

          // var xxx = {};
          // xxx[k] = url;


          var firebaseRef = firebase.database().ref();
          firebaseRef.child("myimages").child(k).set(url);



          // ref.on("child_added", function(snapshot) {
          //   var newPost = snapshot.val();
          //   alert(newPost);
          // });

          c = c+1;

          imageCount = c.toString();

          // firebase.database().ref("myimages").ref(k).set({
          //   // username: displayName,
          //   // email: email,
          //    image : url
          // });
          //alert("database added");
        });

      }
    )
});












var href = firebase.database().ref().child("myimages");

href.on('child_removed', function(oldChildSnapshot) {

   c--;
   var firebaseRef = firebase.database().ref("imageCount/").set(c);
   imageCount = c;

   //$("#a").attr("display" , "none");
  //  var k = snapshot.parent().val();
  //  alert(k);
  //  alert("deleted from db !!");
   //$("#myimg").append("<img id='" + imageCount + "'src="+snapshot.val()+"</img>");

   var snappy = oldChildSnapshot.val();

   var a = snappy.slice(77,78);

   var u = a.toString();

   var reffy = firebase.storage().ref("catty/" + u);

   alert(u);

   reffy.delete().then(function() {
     alert("File deleted successfully!");
   }).catch(function(error) {
     alert("Uh-oh, an error occurred!");
   });

   alert(document.getElementById('a').src);

   //$("#u").style.display = 'none';


}, function (error) {
   console.log("Error: " + error.code);
});



var item;
var img = document.getElementById('myimg');
img.addEventListener('click' , function(e){
  item = e.target;
  $("#downloadBtn").show();
  $("#deleteBtn").show();
  $(".addOnsclose").show();
});

//var download = document.getElementById('downloadBtn');
//var i,j;
// download.addEventListener('click',function(){
//     var res = item.src.slice(69,82);
//
//     var l = res.length;
//     for(i=0;i<l;i++){
//         if(res[i]==='%'){
//             j=i;
//             break;
//         }
//     }
//
//     var name = res.slice((j+3),(l+1));
//     var storage = firebase.storage();
//
//     var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/b/bucket/o/catty%20'+name);
// console.log(httpsReference);
//     // var storageRef = firebase.storage().ref('catty/' + name);
//
//     httpsReference.getDownloadURL().then(function(url) {
//       // console.log(url);
//       //   document.getElementsById("hi").setAttribute("href", url);
//       var xhr = new XMLHttpRequest();
//   xhr.responseType = 'blob';
//   xhr.onload = function(event) {
//     var blob = xhr.response;
//   };
//   xhr.open('GET', url);
//   xhr.send();
//
//     }).catch(function(error) {
//       switch (error.code) {
//          case 'storage/object_not_found':
//            alert("File doesn't exist");
//            break;
//
//          case 'storage/unauthorized':
//            alert("You don't have permission to access the object");
//            break;
//
//          case 'storage/canceled':
//            alert("Upload Cancelled");
//            break;
//
//          case 'storage/unknown':
//            alert("Unknown error occurred, inspect the server response");
//            break;
//         }
//
//     });
//
// })

$("#deleteBtn").click(
  function(){

    // var res = item.src.slice(69,82);
    //
    // var l = res.length;
    // for(i=0;i<l;i++){
    //     if(res[i]==='%'){
    //         j=i;
    //         break;
    //     }
    // }
    //
    // var name = res.slice((j+3),(l+1));

    var storageRef = firebase.storage().ref('catty/' + item.id);

    f=f-1;
    var firebaseRef = firebase.database().ref("imageCount/").set(f);

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

    var a = "images"+item.id;

    firebase.database().ref().child("myimages").child(a).remove();
    alert("database deleted");

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

if($("body").data("title") === "start-page") {

  $("#in").click(function(){
    window.location = "login.html";
  });

  $("#up").click(function(){
    window.location = "signup.html";
  });

  // $(document).ready(function(){
  $(function(){
    $('.slider').slider({
      indicators: false,
      height: 550,
      interval: 4500
    });
 });

}

if($("body").data("title") === "login"){

    (function(){

    //Main Page Onload Event
      $("document").ready(function(){
        $('.slider').slider({
          indicators: false,
          height: 417
        });
      });
    });

  //loginBtn Functionality
  $(".loginBtn").click(function(){
      var email = $("#loginEmail").val();
      var password = $("#loginPassword").val();

      if(email !== "" && password !== ""){
        $("#login-dialog").removeClass('animated ' + 'fadeIn');
        $('#login-dialog').addClass('animated fadeOut');


        firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error){
          $("#loginError").show().text(error.message);
          $(".loginBtn").css("background-color" , "red");
          $(".img-cover").css("-webkit-filter" , "hue-rotate(0deg)");
          $(".img-cover").css("filter" , "hue-rotate(0deg)");
          $("#login-dialog").removeClass('animated ' + 'fadeOut');
          $('#login-dialog').addClass('animated shake');
        });
      }
    }
  );

  /*Sign UP Process*/
  $(".signupBtn").click(
    function(){
      var email = $("#loginEmail1").val();
      var password = $("#loginPassword1").val();

      if(email !== " " && password !== " "){

        firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error){

          $("#loginError").show().text(error.message);
          $("#signupBtn").css("background-color" , "red");
          $("#signupdialog").removeClass('animated ' + 'fadeOut');
          $('#signupdialog').addClass('animated shake');
        });
      }
    });

    var provider = new firebase.auth.GoogleAuthProvider();

  //Guest User Login
    $("#anome").click(
      function(){
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        // [START authanon]
        window.location = "main-page.html";
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
    }
    );

    //Facebook Login
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
              window.location = "main-page.html";
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

    //Google Login
    $("#google").click(function(){

    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    window.location = "main-page.html";

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

    //Auth State Change Event
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        window.location = "main-page.html";

        // if(user.uid != "sEraSr95SNg3kekjlfVEt39s9Il2" ){
        //   $("#addBtn").show();
        // }
        // else{
        //   $("#addBtn").hide();
        // }
      } else {
          console.log("hello");
      }
    });
}























if($("body").data("title") === "main-page") {

  var dialog , user , displayName , photoURL , email , uid , imageCount=0 , c=0 , item;

  //Cards
  var cardy = function(imgSrc, county , y , x){

      var row = document.createElement('div');
      $(row).addClass('row adjust');
      var col = document.createElement('div');
      $(col).addClass('s4');
      var card = document.createElement('div');
      $(card).addClass('card');

      var cardImg = document.createElement('div');
      $(cardImg).addClass('card-image');
      var img = document.createElement('img');
      $(img).attr('src',imgSrc);
      $(img).attr('id', county);

      $(img).attr('class' , 'materialboxed');
      var cardCont = document.createElement('div');

      var div = document.createElement('div');
      var a = document.createElement('a');
      var i = document.createElement('i');

      $(div).addClass("fixed-action-btn horizontal");
      $(a).addClass("btn-floating btn-small red");

      $(i).addClass("small material-icons");
      $(i).html("mode_edit");

      var ul = document.createElement('ul');
      $(ul).attr("id" , "ul");
      $(ul).css("width" , "110");

      var a3 = document.createElement('a');
      $(a3).addClass("downloady");
      $(a3).attr("id" , imgSrc);

      $(a3).attr("download" , " ");
      $(a3).attr("href" , " ");
      $(a3).attr("title" , " ");

      var li1 = document.createElement('li');
      var li2 = document.createElement('li');
      $(li2).addClass("share");
      $(li2).attr("id" , imgSrc);

      var a1 = document.createElement('a');
      var a2 = document.createElement('a');

      $(a1).addClass("btn-floating red");

      var i1 = document.createElement('i');
      $(i1).attr("class" , "material-icons");
      $(i1).html("file_download");

      $(a2).addClass("btn-floating green");

      var i2 = document.createElement('i');
      $(i2).attr("class" ,"material-icons");
      $(i2).html("favorite");

      $(cardImg).append(img);

      $(a1).append(i1);
      $(li1).append(a1);
      $(a3).append(li1);

      $(a2).append(i2);
      $(li2).append(a2);

      $(ul).append(a3).append(li2);

      $(a).append(i);
      $(div).append(a).append(ul);

      $('img').on('load',function(){
        $(".preloader").hide();
        setTimeout(function(){ $(cardCont).append(div); }, 1000);
      });

      $(card).append(cardImg).append(cardCont);
      $(col).append(card);
      $(row).append(col);
      $("#myimg").append(row);
  };

  //NewChild Added event
  function db(){``
    var hell = firebase.database().ref().child("myimages");
    hell.on('child_added', function(snapshot) {

     var a = snapshot.val();
     var countId = snapshot.key.slice(6,snapshot.key.length);

     //Fb share link
     var w= a.slice(8,a.length).replace(/[\/]/g,'%2F');
     var m = w.replace(/[&]/g,'%26');
     var n = m.replace(/[?]/g,'%3F');
     var e = n.replace(/[=]/g,'%3D');
     var h = e.slice(0,78);
     var q = e.slice(78,e.length);
     var r = "https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2F" + h + "52" + q + "&layout=button_count&size=small&mobile_iframe=true&appId=1822902874638854&width=68&height=20";

     //cardy function called
     cardy(snapshot.val() , countId , r , a);
     imageCount++;

     $('.materialboxed').materialbox();
    }, function (error) {
       alert("Error: " + error.code);
    });

    //Retrieving value of imageCount from database
    firebase.database().ref().child("imageCount/").once("value", function(snap) {
       imageCount = (Number)(snap.val());
    });

    console.log("pics added");
  }

  //Auth State Change Event
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
       db();
    } else {

    }
  });

  //SignOut Btn Functionality
  $("#signoutBtn").click(
    function(){
      firebase.auth().signOut().then(function() {
          console.log("logged out");
          window.location = "loading-page.html";
          $('#login-dialog').removeClass('animated fadeOut');
          $('#login-dialog').addClass('animated fadeIn');
      }, function(error) {
          console.log("error occured");
      });
      }
  );




  //Download Btn Event Listener
  $(document).on("click", ".downloady", function (ev) {
       $(".downloady").attr("download" , "item.jpg");
       $(".downloady").attr("href" , (this.id));
       $(".downloady").attr("title" , "item.jpg");
  });

  //FB share button
  $(document).on("click", ".share", function (ev) {
    FB.ui({
      method: 'share',
      display: 'popup',
      href: (this.id),
    }, function(response){});
  });

  //Scroll To Top
  $(".navvy").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  //Sidenav
  function sidenav(){
    $(".button-collapse").sideNav();

    $('.button-collapse').sideNav({
       menuWidth: 300, // Default is 300
       edge: 'left', // Choose the horizontal origin
       closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
       draggable: true // Choose whether you can drag to open on touch screens
     });
  }

  //Main Page Onload Event
  $("document").ready(function(){
    sidenav();
  });


  //AddBtn Dialog Box
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

  //Database Functionality
  fileButton.addEventListener('change' , function(e){

    var f = imageCount+1;
    imagecount = imageCount.toString();

    var firebaseRef = firebase.database().ref("imageCount/").set(f);

    //get file
    var file = e.target.files[0];

    //create storage ref
    var storageRef = firebase.storage().ref('catty/' + imagecount);

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

            firebase.database().ref().child("myimages").child("images"+imagecount).set(url);

          });

        }
      )
  });

  //Child Removed Event
  var href = firebase.database().ref("myimages");

  href.on('child_removed', function(oldChildSnapshot) {

     imageCount--;
     var firebaseRef = firebase.database().ref("imageCount/").set(imageCount);

     var a = oldChildSnapshot.key.slice(6,oldChildSnapshot.key.length+1);

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

}

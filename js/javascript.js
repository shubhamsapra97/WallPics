var dialog, user, displayName, photoURL, email, uid, imageCount = 0,c = 0,item;

// CARDS
var cardy = function(imgSrc, county, y, x) {
    var row = document.createElement('div');
    $(row).addClass('row');
    var col = document.createElement('div');
    $(col).addClass('s4');
    var card = document.createElement('div');
    $(card).addClass('card');
    var cardImg = document.createElement('div');
    $(cardImg).addClass('card-image');
    var img = document.createElement('img');
    $(img).attr('src', imgSrc);
    $(img).attr('id', county);
    $(img).attr('class', 'materialboxed');

    var cardCont = document.createElement('div');
    var div = document.createElement('div');
    var a = document.createElement('a');
    var i = document.createElement('i');
    $(div).addClass("fixed-action-btn");
    $(div).addClass("horizontal");
    $(a).addClass("btn-floating");
    $(a).addClass("btn-small");
    $(a).addClass("red");
    $(i).addClass("small");
    $(i).addClass("material-icons");
    $(i).html("mode_edit");
    var ul = document.createElement('ul');
    $(ul).attr("id", "ul");
    $(ul).css("width", "110");
    var a3 = document.createElement('a');
    $(a3).addClass("downloady");
    $(a3).attr("id", imgSrc);
    $(a3).attr("download", " ");
    $(a3).attr("href", " ");
    $(a3).attr("title", " ");
    var li1 = document.createElement('li');
    var li2 = document.createElement('li');
    $(li2).addClass("share");
    $(li2).attr("id", imgSrc);
    var a1 = document.createElement('a');
    var a2 = document.createElement('a');
    $(a1).addClass("btn-floating");
    $(a1).addClass("red");
    var i1 = document.createElement('i');
    $(i1).attr("class", "material-icons");
    $(i1).html("file_download");
    $(a2).addClass("btn-floating");
    $(a2).addClass("green");
    var i2 = document.createElement('i');
    $(i2).attr("class", "material-icons");
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
    setTimeout(function() {
        $(cardCont).append(div);
    }, 3000);
    $(card).append(cardImg).append(cardCont);
    $(col).append(card);
    $(row).append(col);
    $("#myimg").append(row);
};

// Download button functionality
$(document).on("click", ".downloady", function(ev) {
    $(".downloady").attr("download", "item");
    $(".downloady").attr("href", (this.id));
    $(".downloady").attr("title", "item");
});

// FB Share button functionality
$(document).on("click", ".share", function(ev) {
    FB.ui({
        method: 'share',
        display: 'popup',
        href: (this.id),
    }, function(response) {});
});

//Scroll to top by clicking on wallpics logo
$(".navvy").click(function() {
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
    return false;
});

//Sidenav functionality
function sidenav() {
    $(".button-collapse").sideNav();
    $('.button-collapse').sideNav({
        menuWidth: 300,
        edge: 'left',
        closeOnClick: true,
        draggable: true
    });
}

//main page onload
$("#main-page").ready(function() {
    sidenav();
    $('.slider').slider({
        indicators: false,
        height: 417
    });
});

//retrieving data from db
function db() {
    var hell = firebase.database().ref().child("myimages");
    hell.on('child_added', function(snapshot) {
        var a = snapshot.val();
        var countId = snapshot.key.slice(6, snapshot.key.length);
        var w = a.slice(8, a.length).replace(/[\/]/g, '%2F');
        var m = w.replace(/[&]/g, '%26');
        var n = m.replace(/[?]/g, '%3F');
        var e = n.replace(/[=]/g, '%3D');
        var h = e.slice(0, 78);
        var q = e.slice(78, e.length);
        var r = "https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2F" + h + "52" + q + "&layout=button_count&size=small&mobile_iframe=true&appId=1822902874638854&width=68&height=20";
        cardy(snapshot.val(), countId, r, a);
        imageCount++;
        $('.materialboxed').materialbox();
    }, function(error) {
        alert("Error: " + error.code);
    });
    firebase.database().ref().child("imageCount/").once("value", function(snap) {
        imageCount = (Number)(snap.val());
    });
    console.log("pics added");
}

//state changed event listener
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        db();
        $("#login-page").hide();
        $("#loginImage").removeClass('fadeInLeftBig');
        if (user.uid != "sEraSr95SNg3kekjlfVEt39s9Il2") {
            $("#addBtn").show();
        } else {
            $("#addBtn").hide();
        }
        dialog = document.querySelector('#login-dialog');
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.close();
        dialog = document.querySelector('#signupdialog');
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.close();
    } else {
        $("#login-page").show();
        dialog = document.querySelector('#login-dialog');
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.showModal();
    }
});

// takes to sign up dialog box
$("#signupoption").click(function() {
    dialog = document.querySelector('#login-dialog');
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.close();
    dialog = document.getElementById('signupdialog');
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
});

//takes to sign in dialog box
$("#signinoption").click(function() {
    dialog = document.querySelector('#signupdialog');
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.close();
    dialog = document.getElementById('login-dialog');
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
});

//Sign in Process
$("#loginBtn").click(function() {
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();
    if (email !== "" && password !== "") {
        $("#login-page").empty();
        $("#login-dialog").removeClass('animated ' + 'fadeIn');
        $('#login-dialog').addClass('animated fadeOut');
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            $("#loginError").show().text(error.message);
            $("#login-dialog").removeClass('animated ' + 'fadeOut');
            $('#login-dialog').addClass('animated shake');
            $("#loginBtn").show();
        });
    }
});

//Sign up Process
$("#signupBtn").click(function() {
    var email = $("#loginEmail1").val();
    var password = $("#loginPassword1").val();
    if (email !== " " && password !== " ") {
        $("#login-dialog").removeClass('animated ' + 'fadeIn');
        $('#signupdialog').addClass('animated fadeOut');
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            $("#loginError").show().text(error.message);
            $("#signupdialog").removeClass('animated ' + 'fadeOut');
            $('#signupdialog').addClass('animated shake');
        });
    }
});

//Guest User Login
var provider = new firebase.auth.GoogleAuthProvider();
$("#anome").click(function() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    } else {
        firebase.auth().signInAnonymously().catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/operation-not-allowed') {
                alert('You must enable Anonymous auth in the Firebase Console.');
            } else {
                console.error(error);
            }
        });
    }
});

//FB login
$("#fb").click(function() {
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('user_birthday');
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different auth provider for that email.');
            } else {
                console.error(error);
            }
        });
    }
});

//Google login
$("#google").click(function() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(user);
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
});

//Signout Process
$("#signoutBtn").click(function() {
    firebase.auth().signOut().then(function() {
        console.log("logged out");
        $("#myimg").empty();
        $('#login-dialog').removeClass('animated fadeOut');
        $('#login-dialog').addClass('animated fadeIn');
    }, function(error) {
        console.log("error occured");
    });
});

//Upload button dialog box
$("#addBtn").click(function() {
    var dialog = document.querySelector('#addBtn-dialog');
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
});

function dialogClose() {
    var dialog = document.querySelector('#addBtn-dialog');
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.close();
    uploader.value = 0;
}

//Database
fileButton.addEventListener('change', function(e) {
    var f = imageCount + 1;
    imagecount = imageCount.toString();
    var firebaseRef = firebase.database().ref("imageCount/").set(f);
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('catty/' + imagecount);
    var task = storageRef.put(file);
    task.on('state_changed', function progress(snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage;
    }, function error(err) {
        alert("Error!!");
    }, function complete(event) {
        var Url;
        storageRef.getDownloadURL().then(function(url) {
            firebase.database().ref().child("myimages").child("images" + imagecount).set(url);
        });
    })
});

//Child removed Event
var href = firebase.database().ref("myimages");
href.on('child_removed', function(oldChildSnapshot) {
    imageCount--;
    var firebaseRef = firebase.database().ref("imageCount/").set(imageCount);
    var a = oldChildSnapshot.key.slice(6, oldChildSnapshot.key.length + 1);
    var reffy = firebase.storage().ref("catty/" + a.toString());
    reffy.delete().then(function() {
        alert("File deleted successfully!");
    }).catch(function(error) {
        alert("Uh-oh, an error occurred!");
    });
    var m = ('"#"+imageCount').toString();
}, function(error) {
    console.log("Error: " + error.code);
});

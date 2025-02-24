window.fbAsyncInit = function() {
  FB.init({
      appId      : '573796805620045',
      cookie     : true,
      xfbml      : true,
      version    : 'v12.0'
  });
  FB.AppEvents.logPageView();   
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));




function startFacebookLogin() {
  FB.login(function(response) {
      if (response.authResponse) {
          checkLoginState();
      } else {
          console.log('User cancelled login or did not fully authorize.');
      }
  }, {scope: 'public_profile,email'});
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
  if (response.status === 'connected') {
      console.log('Logged in.');
      FB.api('/me', function(response) {
          console.log('Successful login for: ' + response.name);
      });
  } else {
      console.log('Not authenticated.');
  }
}


  
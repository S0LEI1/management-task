function checkJWTAndRemoveElement() {
  const jwtToken = localStorage.getItem('accessToken');
  if (jwtToken) {
    const islLogin = document.getElementById('is-login');
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
      loginButton.remove();
    }
    if (islLogin) {
      islLogin.remove();
    }
  }
}
window.onload = checkJWTAndRemoveElement();

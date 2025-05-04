document.addEventListener('DOMContentLoaded', () => {
  // Define interface for form data

  // Function to get form values
  function getLoginFormData() {
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');

    if (!phoneInput || !passwordInput) {
      console.error('Form inputs not found');
      return null;
    }

    return {
      phone: phoneInput.value,
      password: passwordInput.value,
    };
  }

  // Add event listener for form submission
  document
    .getElementById('login-button')
    ?.addEventListener('click', async (event) => {
      event.preventDefault();
      const formData = getLoginFormData();
      console.log(formData.phone);
      if (formData) {
        try {
          const response = await fetch('http://localhost:8080/v1/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Required for JSON payload
              'x-api-key':
                'e9cfd41055a34d77d8211a7a127449e1b865f68d66acb441641ab9c1f799184c80904f5f6c293509a46bafb8d04fe86d368df010db72c327c06708762770ba10',
            },
            body: JSON.stringify({
              password: formData.password,
              phone: formData.phone,
            }),
          });

          if (!response.ok) {
            console.log('Cannot login:', response.status, response.statusText);
            throw new Error('Login failed');
          }

          const data = await response.json();
          console.log(data);
          if (data.metadata) {
            localStorage.setItem(
              'accessToken',
              data.metadata.tokens.accessToken
            );
            localStorage.setItem(
              'refreshToken',
              data.metadata.tokens.refreshToken
            );
            localStorage.setItem('userID', data.metadata.user._id);
            console.log(localStorage.getItem('accessToken'));
            console.log(localStorage.getItem('userID'));
            console.log(localStorage.getItem('refreshToken'));
          }
          window.location.href = '../browse-jobs.html';
        } catch (error) {
          console.error('Error during login:', error.message);
        }
      } else {
        console.log('Cannot login: Invalid form data');
      }
    });
});

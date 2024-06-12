document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      let valid = true;

      document.getElementById("login-email-error").textContent = "";
      document.getElementById("login-password-error").textContent = "";

      if (!validateEmail(email)) {
        document.getElementById("login-email-error").textContent =
          "Please enter a valid email.";
        valid = false;
      }

      if (password.length < 6) {
        document.getElementById("login-password-error").textContent =
          "Password must be at least 6 characters long.";
        valid = false;
      }

      if (valid) {
        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");

        if (email === storedEmail && password === storedPassword) {
          window.location.href = "home.html";
        } else {
          alert("Invalid email or password");
        }
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;
      const confirmPassword = document.getElementById(
        "register-confirm-password"
      ).value;

      let valid = true;

      document.getElementById("register-email-error").textContent = "";
      document.getElementById("register-password-error").textContent = "";
      document.getElementById("register-confirm-password-error").textContent =
        "";

      if (!validateEmail(email)) {
        document.getElementById("register-email-error").textContent =
          "Please enter a valid email.";
        valid = false;
      }

      if (password.length < 6) {
        document.getElementById("register-password-error").textContent =
          "Password must be at least 6 characters long.";
        valid = false;
      }

      if (password !== confirmPassword) {
        document.getElementById("register-confirm-password-error").textContent =
          "Passwords do not match.";
        valid = false;
      }

      if (valid) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);

        window.location.href = "index.html";
      }
    });

    document
      .getElementById("register-password")
      .addEventListener("input", function () {
        const password = this.value;
        const errorMessage = document.getElementById("register-password-error");
        if (password.length < 6) {
          errorMessage.textContent =
            "Password must be at least 6 characters long.";
        } else {
          errorMessage.textContent = "";
        }
      });
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

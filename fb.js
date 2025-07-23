document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login_form");
  const signupForm = document.querySelector(".Sign_Up");

  const loginInput = document.querySelector(".login_input");
  const loginPassword = document.querySelector(".login_password");
  const loginBtn = document.querySelector(".Login");
  const loginMsg = document.querySelector(".masg");

  const signName = document.querySelector(".sign_name");
  const signEmail = document.querySelector(".sign_email");
  const signPass = document.querySelector(".sign_password");
  const cnfPass = document.querySelector(".cnfm_password");
  const signBtn = document.querySelector(".signup_btn");
  const signMsg = document.querySelector(".masgbox");

  const backBtn = document.querySelector(".backbtn");
  const createBtn = document.querySelector(".new_acount");

  // Toggle forms
  createBtn.addEventListener("click", () => {
    loginForm.style.display = "none";
    signupForm.style.display = "flex";
  });

  backBtn.addEventListener("click", () => {
    signupForm.style.display = "none";
    loginForm.style.display = "flex";
  });

  // Signup
  signBtn.addEventListener("click", async () => {
    if (
      !signName.value ||
      !signEmail.value ||
      !signPass.value ||
      !cnfPass.value
    ) {
      signMsg.textContent = "Please fill in all fields.";
      signMsg.style.color = "red";
      return;
    }

    if (signPass.value !== cnfPass.value) {
      signMsg.textContent = "Passwords do not match.";
      signMsg.style.color = "red";
      return;
    }

    try {
      const res = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signName.value,
          email: signEmail.value,
          password: signPass.value,
        }),
      });

      const data = await res.json();
      signMsg.textContent = data.message;
      signMsg.style.color = res.ok ? "green" : "red";

      if (res.ok) {
        signName.value = "";
        signEmail.value = "";
        signPass.value = "";
        cnfPass.value = "";
      }
    } catch (err) {
      signMsg.textContent = "Network error";
      signMsg.style.color = "red";
    }
  });

  // Login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!loginInput.value || !loginPassword.value) {
      loginMsg.textContent = "Please enter both fields.";
      loginMsg.style.color = "red";
      return;
    }

    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginInput.value,
          password: loginPassword.value,
        }),
      });

      const data = await res.json();
      loginMsg.textContent = data.message;
      loginMsg.style.color = res.ok ? "green" : "red";

      if (res.ok) {
        loginInput.value = "";
        loginPassword.value = "";
        // Optionally redirect
        // window.location.href = "dashboard.html";
      }
    } catch (err) {
      loginMsg.textContent = "Network error";
      loginMsg.style.color = "red";
    }
  });
});

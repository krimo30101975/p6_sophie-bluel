document.addEventListener("DOMContentLoaded", () => {
  const authLink = document.querySelector(".a_login");
  const token = localStorage.getItem("authToken");

  if (authLink) {
    authLink.style.fontSize = "1em";
    authLink.style.fontFamily = "Work Sans";

    if (token) {
      authLink.textContent = "logout";
      authLink.style.fontSize = "1.2em";
      authLink.href = "#";
      authLink.addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.removeItem("authToken");
        window.location.reload();
      });
    } else {
      authLink.textContent = "login";
      authLink.href = "login.html";
    }
  }

  // Gestion du formulaire de connexion
  const form = document.querySelector("form");
  if (!form) return;

  const emailInput = document.querySelector("#email");
  const passInput = document.querySelector("#password");
  const messageContainer = document.createElement("div");
  messageContainer.style.marginTop = "10px";
  form.appendChild(messageContainer);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    messageContainer.textContent = "";
    emailInput.style.border = "";
    passInput.style.border = "";

    const email = emailInput.value.trim();
    const password = passInput.value;

    if (!email || !password) {
      messageContainer.textContent = "Veuillez remplir tous les champs.";
      messageContainer.style.color = "red";
      return;
    }

    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        authLink.textContent = "logout";
        authLink.href = "#";

        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      } else {
        const errorMessage = data.message ? data.message.toLowerCase() : "";
        messageContainer.textContent = "Identifiants incorrects.";
        messageContainer.style.color = "red";

        if (errorMessage.includes("password")) {
          passInput.style.border = "2px solid red";
        } else if (errorMessage.includes("user not found") || errorMessage.includes("email")) {
          emailInput.style.border = "2px solid red";
        }
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
      messageContainer.textContent = "Une erreur est survenue. Veuillez réessayer.";
      messageContainer.style.color = "red";
    }
  });
});
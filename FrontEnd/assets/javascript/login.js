document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.querySelector("#email");
  const passInput = document.querySelector("#pass");

  // Conteneur pour afficher les messages d'erreur
  const messageContainer = document.createElement("div");
  messageContainer.style.marginTop = "10px";
  form.appendChild(messageContainer);

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêcher l'envoi réel du formulaire

    // Réinitialiser les styles des inputs
    emailInput.style.border = "";
    passInput.style.border = "";
    messageContainer.textContent = "";

    const email = emailInput.value.trim();
    const password = passInput.value;

    if (!email || !password) {
      messageContainer.textContent = "Veuillez remplir tous les champs.";
      messageContainer.style.color = "red";
      return;
    }

    const loginData = { email, password };

    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log("Réponse du serveur :", data); // <-- Ajout pour voir les erreurs retournées

      if (response.ok) {
        messageContainer.textContent = "Connexion réussie !";
        messageContainer.style.color = "green";

        // Stocker le token dans localStorage
        localStorage.setItem("authToken", data.token);

        // Rediriger vers la page d'accueil après 2 secondes
        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
      } else {
        // Vérifier si l'API renvoie un message d'erreur clair
        const errorMessage = data.message ? data.message.toLowerCase() : "";

        if (errorMessage.includes("password")) {
          messageContainer.textContent = "Identifiants incorrects.";
          passInput.style.border = "2px solid red";
        } else if (errorMessage.includes("user not found") || errorMessage.includes("email")) {
          messageContainer.textContent = "Adresse e-mail incorrecte.";
          emailInput.style.border = "2px solid red";
        } else {
          messageContainer.textContent = "Identifiants incorrects.";
        }

        messageContainer.style.color = "red";
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
      messageContainer.textContent = "Une erreur est survenue. Veuillez réessayer.";
      messageContainer.style.color = "red";
    }
  });
});

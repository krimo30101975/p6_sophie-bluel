document.addEventListener("DOMContentLoaded", () => {
  const authLink = document.querySelector(".a_link");
  authLink.style = "font-size : 1em; font-family : 'Work Sans';";
  if (!authLink) { // Vérifie si l'élément existe
    console.error("🚨 Erreur : L'élément .a_link est introuvable !");
    return;
  }
  const token = localStorage.getItem("authToken"); // Vérifie si l'utilisateur est connecté (présence du token)
  if (token) {
    authLink.textContent = "Logout"; // Change "Login" en "Logout"
    authLink.href = "#"; // Empêche la redirection
    authLink.addEventListener("click", (event) => { // Ajoute un événement pour la déconnexion
      event.preventDefault(); // Empêche le changement de page
      //console.log("🚪 Déconnexion...");
      localStorage.removeItem("authToken"); // Supprime le token
      window.location.reload(); // Rafraîchit la page
    });
  } else {
    //console.log("❌ Aucun utilisateur connecté.");
    authLink.textContent = "Login"; // Remet le texte à "Login"
    authLink.href = "/FrontEnd/login.html"; // Redirection vers la page de connexion
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.querySelector("#email");
  const passInput = document.querySelector("#password");
  const messageContainer = document.createElement("div");// Conteneur pour afficher les messages d'erreur
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
      //console.log("Données envoyées :", loginData);
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      console.log("Statut HTTP :", response.status);
      console.log("Réponse brute :", response);
      const data = await response.json();
      console.log("Réponse JSON :", data);
      //console.log("Réponse du serveur :", data); // Ajout pour voir les erreurs retournées
      if (response.ok) {
        localStorage.setItem("authToken", data.token); // Stocker le token dans localStorage

        const authLink = document.querySelector(".a_link");
        if (authLink) {
          authLink.textContent = "Logout"; // Changer le texte du lien
          authLink.href = "#"; // Désactiver le lien vers login
        }
        setTimeout(() => {// Rediriger vers la page d'accueil après 1 secondes
          window.location.href = "index.html";
        }, 1000);
      } else {
        const errorMessage = data.message ? data.message.toLowerCase() : "";// Vérifier si l'API renvoie un message d'erreur clair
        if (errorMessage.includes("password")) {
          messageContainer.textContent = "Identifiants incorrects.";
          passInput.style.border = "2px solid red";
        } else if (errorMessage.includes("user not found") || errorMessage.includes("email")) {
          messageContainer.textContent = "Identifiants incorrects.";
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

document.addEventListener("DOMContentLoaded", () => {
  // Sélection du lien d'authentification (connexion/déconnexion)
  const authLink = document.querySelector(".a_login");
  const token = localStorage.getItem("authToken");// Récupération du token d'authentification
  // Vérifier si l'utilisateur est connecté et s'il est sur la page de connexion
  if (localStorage.getItem("authToken") && window.location.pathname.includes("login.html")) {
    window.location.replace("index.html"); // Redirige vers la page d'accueil
  }


  if (authLink) {
    authLink.style.fontSize = "1.2em";
    authLink.style.fontFamily = "Work Sans";

    if (token) {
      // L'utilisateur est connecté : affichage du bouton "logout"
      authLink.textContent = "logout";
      authLink.style.fontSize = "1.2em";
      authLink.href = "#";
      authLink.addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.removeItem("authToken"); // Suppression du token
        window.location.reload(); // Rechargement de la page
      });
    } else {
      // L'utilisateur n'est pas connecté : affichage du bouton "login"
      authLink.textContent = "login";
      authLink.href = "login.html";
    }
  }

  // Sélection du formulaire de connexion
  const form = document.querySelector("form");
  if (!form) return; // Si aucun formulaire n'est trouvé, on quitte la fonction

  const emailInput = document.querySelector("#email");
  const passInput = document.querySelector("#password");

  // Création d'un conteneur pour afficher les messages d'erreur
  const messageContainer = document.createElement("div");
  messageContainer.style.marginTop = "10px";
  form.appendChild(messageContainer);

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    messageContainer.textContent = ""; // Réinitialisation du message d'erreur
    emailInput.style.border = "";
    passInput.style.border = "";

    const email = emailInput.value.trim(); // Suppression des espaces autour de l'email
    const password = passInput.value;

    if (!email || !password) {
      // Vérification que tous les champs sont remplis
      messageContainer.textContent = "Veuillez remplir tous les champs.";
      messageContainer.style.color = "red";
      return;
    }

    try {
      // Envoi des identifiants à l'API pour vérification
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // Conversion de la réponse en JSON

      if (response.ok) {
        // Authentification réussie
        localStorage.setItem("authToken", data.token); // Stockage du token (⚠️ à éviter pour des raisons de sécurité)
        authLink.textContent = "logout";
        authLink.href = "#";

        setTimeout(() => {
          window.location.href = "index.html"; // Redirection vers la page d'accueil après 1 seconde
        }, 1000);
      } else {
        // Gestion des erreurs d'identification
        const errorMessage = data.message ? data.message.toLowerCase() : "";
        messageContainer.textContent = "Erreur dans l’identifiant ou le mot de passe";
        messageContainer.style.color = "red"; // Mise en évidence du champ email

        if (errorMessage.includes("password")) {
          passInput.style.border = "2px solid red"; // Mise en évidence du champ mot de passe
        } else if (errorMessage.includes("user not found") || errorMessage.includes("email")) {
          emailInput.style.border = "2px solid red";
        }
      }
    } catch (error) {
      // Gestion des erreurs réseau ou serveur
      console.error("Erreur lors de la requête :", error);
      messageContainer.textContent = "Une erreur est survenue. Veuillez réessayer.";
      messageContainer.style.color = "red";
    }
  });
});
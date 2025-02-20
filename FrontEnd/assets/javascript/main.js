/* FONCTION ASYNCHRONE POUR RECUPERER DES "WORKS" ( DES DONNEES, COMME DES PROJETS OU DES TACHES ) */

async function getWorks(filter) {
    document.querySelector(".gallery").innerHTML = "";
    const url = "http://localhost:5678/api/works"; // Déclaration de l'URL de l'API qui sera appelée
  
    try {
      const response = await fetch(url); // Effectue une requête HTTP GET vers l'URL
  
      // Vérifie si la réponse est valide (code HTTP 200-299)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`); // Si ce n'est pas le cas, lève une erreur avec le code de statut
      }

      const json = await response.json(); // Convertit la réponse JSON en un objet JavaScript exploitable
      if (filter) {
        const filtred = json.filter((data) => data.categoryId === filter);
        for (let i = 0; i < filtred.length; i++) {
          setFigure(filtred[i]);
        }
      } else {
        for (let i = 0; i < json.length; i++) {
            setFigure(json[i]);
          }
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error.message); // Capture et affiche toute erreur survenue lors de la requête ou du traitement
    } finally {
      console.log("Requête terminée"); // Ce bloc est exécuté quoi qu'il arrive (qu'il y ait une erreur ou non)
    }
}
getWorks();
 // une fonction pour récupérer les datas images
function setFigure(data) {
    const figure = document.createElement("figure");
    figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title}>
                    <figcaption>${data.title}</figcaption>`; 
    document.querySelector(".gallery").append(figure);
}

// Fonction asynchrone pour récupérer des "categories" (des données de categories photos)
async function getCategories() {
    const url = "http://localhost:5678/api/categories"; // Déclaration de l'URL de l'API qui sera appelée
  
    try {
      const response = await fetch(url); // Effectue une requête HTTP GET vers l'URL
  
      // Vérifie si la réponse est valide (code HTTP 200-299)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`); // Si ce n'est pas le cas, lève une erreur avec le code de statut
      }

      const json = await response.json(); // Convertit la réponse JSON en un objet JavaScript exploitable
      for (let i = 0; i < json.length; i++) {
        setFilter(json[i])
      }

    } catch (error) {
      console.error("Erreur lors de la requête :", error.message); // Capture et affiche toute erreur survenue lors de la requête ou du traitement
    } finally {
      console.log("Requête terminée"); // Ce bloc est exécuté quoi qu'il arrive (qu'il y ait une erreur ou non)
    }
}
getCategories();

function setFilter(data) {
    console.log(data);
    const div = document.createElement("div");
    div.cassName = data.id;
    div.addEventListener("click", () => getWorks(data.id));
    div.innerHTML = `${data.name}`; 
    document.querySelector(".filtreGallery").append(div);
}
document.querySelector(".tous").addEventListener("click", () => getWorks());

const input = document.querySelector("input");
input.dataset.id = "1";
console.log(input);

// changer la couleur en selecteur
document.addEventListener("DOMContentLoaded", () => {
  const filtreGallery = document.querySelector(".filtreGallery");

  // Vérifier si l'élément existe
  if (!filtreGallery) {
    console.error("L'élément .filtreGallery est introuvable !");
    return;
  }

  // Sélectionner tous les enfants directs de .filtreGallery
  const children = filtreGallery.querySelectorAll("div");

  // Vérifier s'il y a des enfants et activer le premier par défaut
  if (children.length > 0) {
    children[0].classList.add("active");
  }

  // Gestion du clic pour activer/désactiver les filtres
  filtreGallery.addEventListener("click", (event) => {
    if (event.target !== filtreGallery && event.target.tagName === "DIV") {
      // Recalcule la liste des enfants au moment du clic, au cas où l'HTML a changé
      const children = filtreGallery.querySelectorAll("div");

      // Supprime la classe active de tous les enfants
      children.forEach(c => c.classList.remove("active"));

      // Ajoute la classe active au nouvel élément cliqué
      event.target.classList.add("active");
    }
  });
});


/* CHANGEMENT DE DIV EDIT DE DISPLAY NONE EN FLEX */

function displayAdminMode() {
  if (localStorage.authToken) {
    console.log("ok");
    const editBanner = document.createElement("div");
    editBanner.className = "mode__edit";
    editBanner.innerHTML = '<p><a href="./modal.html" class="js__modal"><i class="fa-regular fa-pen-to-square"></i> Mode édition</a></p>';
    document.body.prepend(editBanner);
  }
}

displayAdminMode();

/* MODAL */
// const apenModal = function (e) {
//   e.preventDefault();
//   const target = document.querySelector(e.target.getAttribute("href"));
//   target.style.display = null;
//   target.removeAttribute("aria-hidden")
//   target.setAttribute("aria-modal", true)
// };

// document.querySelectorAll(".js__modal").forEach((a) => {
//   a.addEventListener("click", apenModal);
// })




//document.addEventListener("DOMContentLoaded", () => {
  // Bouton Modifier
  //const editButton = document.createElement("button");
//   editButton.textContent = "Modifier";
//   editButton.style.marginLeft = "10px";
//   const title = document.querySelector("#portfolio h2");
//   title.appendChild(editButton);

//   // Création de la modale
//   const modal = document.createElement("div");
//   modal.classList.add("modal");
//   modal.style.width = "50%";
//   modal.style.height = "50%";
//   modal.style.position = "fixed";
//   modal.style.top = "50%";
//   modal.style.left = "50%";
//   modal.style.transform = "translate(-50%, -50%)";
//   modal.style.backgroundColor = "white";
//   modal.style.padding = "20px";
//   modal.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.2)";
//   modal.style.display = "none";
//   modal.style.overflow = "auto";

//   // Bouton de fermeture
//   const closeButton = document.createElement("span");
//   closeButton.textContent = "×";
//   closeButton.style.float = "right";
//   closeButton.style.cursor = "pointer";
//   modal.appendChild(closeButton);

//   // Titre de la modale
//   const titleModal = document.createElement("h2");
//   titleModal.textContent = "Galerie photo";
//   modal.appendChild(titleModal);

//   // Ligne de séparation
//   const hr = document.createElement("hr");
//   modal.appendChild(hr);

//   // Conteneur de la galerie
//   const galleryContainer = document.createElement("div");
//   galleryContainer.classList.add("modal-gallery");
//   modal.appendChild(galleryContainer);

//   // Récupérer et afficher les images dans la modale
//   function loadGallery() {
//       galleryContainer.innerHTML = "";
//       const galleryImages = document.querySelectorAll(".gallery img");
//       galleryImages.forEach((img) => {
//           const imgWrapper = document.createElement("div");
//           imgWrapper.style.position = "relative";
//           imgWrapper.style.display = "inline-block";
//           imgWrapper.style.margin = "10px";

//           const newImg = img.cloneNode(true);
//           imgWrapper.appendChild(newImg);

//           const deleteIcon = document.createElement("span");
//           deleteIcon.innerHTML = "🗑️";
//           deleteIcon.style.position = "absolute";
//           deleteIcon.style.top = "5px";
//           deleteIcon.style.right = "5px";
//           deleteIcon.style.cursor = "pointer";
//           deleteIcon.style.background = "red";
//           deleteIcon.style.color = "white";
//           deleteIcon.style.borderRadius = "50%";
//           deleteIcon.style.padding = "5px";
//           imgWrapper.appendChild(deleteIcon);

//           galleryContainer.appendChild(imgWrapper);
//       });
//   }

//   // Bouton Ajouter une image
//   const addButton = document.createElement("button");
//   addButton.textContent = "Ajouter une image";
//   modal.appendChild(addButton);

//   // Formulaire d'ajout d'image
//   const form = document.createElement("form");
//   form.innerHTML = `
//       <label>Sélectionner une image :</label>
//       <input type="file" accept="image/*"><br>
//       <label>Titre :</label>
//       <input type="text" placeholder="Titre de l'image"><br>
//       <label>Catégorie :</label>
//       <select>
//           <option value="1">Nature</option>
//           <option value="2">Technologie</option>
//           <option value="3">Architecture</option>
//       </select><br>
//       <button type="submit">Valider</button>
//   `;
//   modal.appendChild(form);

//   // Ajout de la modale au corps du document
//   document.body.appendChild(modal);

//   // Gestion des événements
//   editButton.addEventListener("click", () => {
//       loadGallery();
//       modal.style.display = "block";
//   });

//   closeButton.addEventListener("click", () => {
//       modal.style.display = "none";
//   });
// });



// document.addEventListener("DOMContentLoaded", () => {
//   const editButton = document.createElement("button");
//   editButton.textContent = "Modifier";
//   editButton.style.marginLeft = "10px";
//   const title = document.querySelector("#portfolio h2");
//   title.appendChild(editButton);

//   const modal = document.createElement("div");
//   modal.classList.add("modal");
//   modal.style.width = "50%";
//   modal.style.height = "50%";
//   modal.style.position = "fixed";
//   modal.style.top = "50%";
//   modal.style.left = "50%";
//   modal.style.transform = "translate(-50%, -50%)";
//   modal.style.backgroundColor = "white";
//   modal.style.padding = "20px";
//   modal.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.2)";
//   modal.style.display = "none";

//   const closeButton = document.createElement("span");
//   closeButton.textContent = "×";
//   closeButton.style.float = "right";
//   closeButton.style.cursor = "pointer";
//   modal.appendChild(closeButton);

//   const titleModal = document.createElement("h2");
//   titleModal.textContent = "Galerie photo";
//   modal.appendChild(titleModal);

//   const galleryContainer = document.createElement("div");
//   galleryContainer.classList.add("modal-gallery");
//   modal.appendChild(galleryContainer);

//   const galleryImages = document.querySelectorAll(".gallery img");
//   galleryImages.forEach((img) => {
//     const imgWrapper = document.createElement("div");
//     imgWrapper.style.position = "relative";
//     imgWrapper.style.display = "inline-block";
//     imgWrapper.style.margin = "10px";

//     const newImg = img.cloneNode(true);
//     imgWrapper.appendChild(newImg);

//     const deleteIcon = document.createElement("span");
//     deleteIcon.innerHTML = "🗑️";
//     deleteIcon.style.position = "absolute";
//     deleteIcon.style.top = "5px";
//     deleteIcon.style.right = "5px";
//     deleteIcon.style.cursor = "pointer";
//     deleteIcon.style.background = "red";
//     deleteIcon.style.color = "white";
//     deleteIcon.style.borderRadius = "50%";
//     deleteIcon.style.padding = "5px";
//     imgWrapper.appendChild(deleteIcon);

//     galleryContainer.appendChild(imgWrapper);
//   });

//   const hr = document.createElement("hr");
//   modal.appendChild(hr);

//   const addButton = document.createElement("button");
//   addButton.textContent = "Ajouter une image";
//   modal.appendChild(addButton);

//   const addModal = document.createElement("div");
//   addModal.classList.add("modal");
//   addModal.style.width = "50%";
//   addModal.style.height = "50%";
//   addModal.style.position = "fixed";
//   addModal.style.top = "50%";
//   addModal.style.left = "50%";
//   addModal.style.transform = "translate(-50%, -50%)";
//   addModal.style.backgroundColor = "white";
//   addModal.style.padding = "20px";
//   addModal.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.2)";
//   addModal.style.display = "none";

//   const backButton = document.createElement("span");
//   backButton.textContent = "←";
//   backButton.style.float = "left";
//   backButton.style.cursor = "pointer";
//   addModal.appendChild(backButton);

//   const addTitle = document.createElement("h2");
//   addTitle.textContent = "Ajouter une image";
//   addModal.appendChild(addTitle);

//   const form = document.createElement("form");
//   form.innerHTML = `
//     <label for="image">Sélectionner une image :</label>
//     <input type="file" id="image" name="image" accept="image/*">
//     <label for="title">Titre :</label>
//     <input type="text" id="title" name="title">
//     <label for="category">Catégorie :</label>
//     <select id="category" name="category">
//       <option value="1">Catégorie 1</option>
//       <option value="2">Catégorie 2</option>
//     </select>
//     <button type="submit">Valider</button>
//   `;
//   addModal.appendChild(form);

//   document.body.appendChild(modal);
//   document.body.appendChild(addModal);

//   editButton.addEventListener("click", () => {
//     modal.style.display = "block";
//   });

//   closeButton.addEventListener("click", () => {
//     modal.style.display = "none";
//   });

//   addButton.addEventListener("click", () => {
//     modal.style.display = "none";
//     addModal.style.display = "block";
//   });

//   backButton.addEventListener("click", () => {
//     addModal.style.display = "none";
//     modal.style.display = "block";
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const editButton = document.createElement("button");
//   editButton.textContent = "Modifier";
//   editButton.style.marginLeft = "10px";
//   const title = document.querySelector("#portfolio h2");
//   title.appendChild(editButton);

//   const modal = document.createElement("div");
//   modal.classList.add("modal");
//   modal.style.width = "50%";
//   modal.style.height = "50%";
//   modal.style.position = "fixed";
//   modal.style.top = "50%";
//   modal.style.left = "50%";
//   modal.style.transform = "translate(-50%, -50%)";
//   modal.style.backgroundColor = "white";
//   modal.style.padding = "20px";
//   modal.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.2)";
//   modal.style.display = "none";
//   modal.style.overflow = "hidden";

//   const closeButton = document.createElement("span");
//   closeButton.textContent = "×";
//   closeButton.style.float = "right";
//   closeButton.style.cursor = "pointer";
//   modal.appendChild(closeButton);

//   const titleModal = document.createElement("h2");
//   titleModal.textContent = "Galerie photo";
//   modal.appendChild(titleModal);

//   const galleryContainer = document.createElement("div");
//   galleryContainer.classList.add("modal-gallery");
//   galleryContainer.style.display = "grid";
//   galleryContainer.style.gridTemplateColumns = "repeat(auto-fit, minmax(100px, 1fr))";
//   galleryContainer.style.gap = "10px";
//   galleryContainer.style.justifyContent = "center";
//   galleryContainer.style.alignItems = "center";
//   galleryContainer.style.height = "calc(100% - 80px)";
//   modal.appendChild(galleryContainer);

//   function loadGalleryImages() {
//     galleryContainer.innerHTML = "";
//     const galleryImages = document.querySelectorAll(".gallery img");
//     galleryImages.forEach((img) => {
//       const imgWrapper = document.createElement("div");
//       imgWrapper.style.position = "relative";
//       imgWrapper.style.width = "100%";
//       imgWrapper.style.height = "100%";
//       imgWrapper.style.display = "flex";
//       imgWrapper.style.alignItems = "center";
//       imgWrapper.style.justifyContent = "center";

//       const newImg = img.cloneNode(true);
//       newImg.style.width = "100%";
//       newImg.style.height = "auto";
//       newImg.style.objectFit = "cover";
//       imgWrapper.appendChild(newImg);

//       const deleteIcon = document.createElement("span");
//       deleteIcon.innerHTML = "🗑️";
//       deleteIcon.style.position = "absolute";
//       deleteIcon.style.top = "5px";
//       deleteIcon.style.right = "5px";
//       deleteIcon.style.cursor = "pointer";
//       deleteIcon.style.background = "red";
//       deleteIcon.style.color = "white";
//       deleteIcon.style.borderRadius = "50%";
//       deleteIcon.style.padding = "5px";
//       imgWrapper.appendChild(deleteIcon);

//       galleryContainer.appendChild(imgWrapper);
//     });
//   }

//   const hr = document.createElement("hr");
//   modal.appendChild(hr);

//   const addButton = document.createElement("button");
//   addButton.textContent = "Ajouter une image";
//   modal.appendChild(addButton);

//   document.body.appendChild(modal);

//   editButton.addEventListener("click", () => {
//     loadGalleryImages();
//     modal.style.display = "block";
//   });

//   closeButton.addEventListener("click", () => {
//     modal.style.display = "none";
//   });
// });



// document.addEventListener("DOMContentLoaded", () => {
//   const editButton = document.createElement("button");
//   editButton.textContent = "Modifier";
//   editButton.style.marginLeft = "10px";
//   const title = document.querySelector("#portfolio h2");
//   title.appendChild(editButton);

//   const modalOverlay = document.createElement("div");
//   modalOverlay.style.position = "fixed";
//   modalOverlay.style.top = "0";
//   modalOverlay.style.left = "0";
//   modalOverlay.style.width = "100%";
//   modalOverlay.style.height = "100%";
//   modalOverlay.style.background = "rgba(0, 0, 0, 0.7)";
//   modalOverlay.style.display = "none";
//   modalOverlay.style.justifyContent = "center";
//   modalOverlay.style.alignItems = "center";

//   const modal = document.createElement("div");
//   modal.style.width = "630px";
//   modal.style.height = "688px";
//   modal.style.backgroundColor = "white";
//   modal.style.borderRadius = "10px";
//   modal.style.padding = "20px";
//   modal.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.2)";
//   modal.style.display = "flex";
//   modal.style.flexDirection = "column";
//   modal.style.alignItems = "center";
//   modal.style.position = "relative";

//   const closeButton = document.createElement("span");
//   closeButton.textContent = "×";
//   closeButton.style.position = "absolute";
//   closeButton.style.top = "10px";
//   closeButton.style.right = "10px";
//   closeButton.style.cursor = "pointer";
//   modal.appendChild(closeButton);

//   const titleModal = document.createElement("h2");
//   titleModal.textContent = "Galerie photo";
//   modal.appendChild(titleModal);

//   const galleryContainer = document.createElement("div");
//   galleryContainer.style.display = "grid";
//   galleryContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(100px, 1fr))";
//   galleryContainer.style.gap = "10px";
//   galleryContainer.style.width = "100%";
//   galleryContainer.style.height = "80%";
//   galleryContainer.style.overflow = "hidden";
//   galleryContainer.style.padding = "10px";
//   modal.appendChild(galleryContainer);

//   async function loadImages() {
//     const response = await fetch("http://localhost:5678/api/works");
//     const json = await response.json();
//     galleryContainer.innerHTML = "";
//     json.forEach((data) => {
//       const imgWrapper = document.createElement("div");
//       imgWrapper.style.position = "relative";
//       imgWrapper.style.display = "flex";
//       imgWrapper.style.justifyContent = "center";
//       imgWrapper.style.alignItems = "center";
//       imgWrapper.style.overflow = "hidden";
//       imgWrapper.style.borderRadius = "5px";

//       const newImg = document.createElement("img");
//       newImg.src = data.imageUrl;
//       newImg.alt = data.title;
//       newImg.style.width = "100%";
//       newImg.style.height = "100%";
//       newImg.style.objectFit = "cover";

//       const deleteIcon = document.createElement("span");
//       deleteIcon.innerHTML = "🗑️";
//       deleteIcon.style.position = "absolute";
//       deleteIcon.style.top = "5px";
//       deleteIcon.style.right = "5px";
//       deleteIcon.style.cursor = "pointer";
//       deleteIcon.style.background = "red";
//       deleteIcon.style.color = "white";
//       deleteIcon.style.borderRadius = "50%";
//       deleteIcon.style.padding = "5px";

//       imgWrapper.appendChild(newImg);
//       imgWrapper.appendChild(deleteIcon);
//       galleryContainer.appendChild(imgWrapper);
//     });
//   }

//   const addButton = document.createElement("button");
//   addButton.textContent = "Ajouter une image";
//   modal.appendChild(addButton);

//   modalOverlay.appendChild(modal);
//   document.body.appendChild(modalOverlay);

//   editButton.addEventListener("click", () => {
//     modalOverlay.style.display = "flex";
//     loadImages();
//   });

//   closeButton.addEventListener("click", () => {
//     modalOverlay.style.display = "none";
//   });
// });



document.addEventListener("DOMContentLoaded", () => {
  // Crée une modale (boîte de dialogue) et lui applique des styles CSS pour l'affichage
  const modal = document.createElement("div");
  modal.classList.add("modal"); // Ajoute une classe CSS pour la modale
  modal.style.width = "630px"; // Définit la largeur de la modale
  modal.style.height = "688px"; // Définit la hauteur de la modale
  modal.style.position = "fixed"; // La position est fixe pour être toujours visible, même quand on fait défiler la page
  modal.style.top = "50%"; // Centre la modale verticalement
  modal.style.left = "50%"; // Centre la modale horizontalement
  modal.style.transform = "translate(-50%, -50%)"; // Permet de centrer parfaitement la modale
  modal.style.backgroundColor = "white"; // Donne un fond blanc à la modale
  modal.style.padding = "20px"; // Ajoute un peu d'espace autour du contenu
  modal.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.2)"; // Ajoute une ombre pour faire ressortir la modale
  modal.style.borderRadius = "10px"; // Arrondit les coins de la modale
  modal.style.display = "none"; // Cache la modale par défaut
  modal.style.overflow = "hidden"; // Évite que le contenu dépasse de la modale

  // Crée un arrière-plan sombre (overlay) qui apparaît lorsque la modale est ouverte
  const overlay = document.createElement("div");
  overlay.style.position = "fixed"; // Fixe l'overlay en position fixe
  overlay.style.top = "0"; // Couvre toute la hauteur de la fenêtre
  overlay.style.left = "0"; // Couvre toute la largeur de la fenêtre
  overlay.style.width = "100vw"; // Largeur de 100% de la fenêtre
  overlay.style.height = "100vh"; // Hauteur de 100% de la fenêtre
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Fond sombre avec un peu de transparence
  overlay.style.display = "none"; // Cache l'overlay par défaut
  overlay.appendChild(modal); // Ajoute la modale dans l'overlay
  document.body.appendChild(overlay); // Ajoute l'overlay au corps du document

  // Crée un bouton pour fermer la modale (une croix en haut à droite)
  const closeButton = document.createElement("span");
  closeButton.textContent = "×"; // Affiche la croix "×"
  closeButton.style.float = "right"; // Place le bouton à droite
  closeButton.style.cursor = "pointer"; // Change le curseur pour indiquer qu'on peut cliquer
  closeButton.addEventListener("click", () => {
      modal.style.display = "none"; // Cache la modale lorsque l'on clique sur la croix
      overlay.style.display = "none"; // Cache l'overlay
  });
  modal.appendChild(closeButton); // Ajoute le bouton à la modale

  // Crée le titre de la modale
  const titleModal = document.createElement("h2");
  titleModal.textContent = "Galerie photo"; // Définit le titre
  modal.appendChild(titleModal); // Ajoute le titre à la modale

  // Crée un conteneur pour la galerie d'images
  const galleryContainer = document.createElement("div");
  galleryContainer.classList.add("modal-gallery"); // Ajoute une classe CSS
  galleryContainer.style.display = "grid"; // Utilise un affichage en grille pour les images
  galleryContainer.style.gridTemplateColumns = "repeat(auto-fit, minmax(100px, 1fr))"; // Organise les images dans des colonnes qui s'adaptent
  galleryContainer.style.gap = "10px"; // Espace entre les images
  galleryContainer.style.maxHeight = "500px"; // Limite la hauteur de la galerie
  galleryContainer.style.overflowY = "auto"; // Permet de défiler si nécessaire
  modal.appendChild(galleryContainer); // Ajoute le conteneur à la modale

  // Fonction pour charger les images depuis une API
  async function loadGallery() {
      const response = await fetch("http://localhost:5678/api/works"); // Fait une requête pour récupérer les données des images
      const images = await response.json(); // Parse la réponse en JSON
      galleryContainer.innerHTML = ""; // Vide le conteneur de la galerie avant de charger de nouvelles images
      images.forEach((imgData) => {
          const imgWrapper = document.createElement("div");
          imgWrapper.style.position = "relative"; // Positionne chaque image
          const img = document.createElement("img");
          img.src = imgData.imageUrl; // Définit la source de l'image
          img.style.width = "100%"; // La largeur de l'image s'adapte au conteneur
          img.style.height = "auto"; // La hauteur s'ajuste automatiquement
          imgWrapper.appendChild(img); // Ajoute l'image au conteneur
          galleryContainer.appendChild(imgWrapper); // Ajoute l'image à la galerie
      });
  }
  loadGallery(); // Charge les images lors de l'initialisation

  // Crée une ligne horizontale sous le titre
  const hr = document.createElement("hr");
  modal.appendChild(hr);

  // Crée un bouton pour ajouter une image
  const addButton = document.createElement("button");
  addButton.textContent = "Ajouter une image";
  modal.appendChild(addButton);

  // Crée un conteneur pour le formulaire d'ajout d'image (initialement caché)
  const formContainer = document.createElement("div");
  formContainer.style.display = "none"; // Cache le formulaire au début
  modal.appendChild(formContainer);

  // Crée un bouton pour revenir à la galerie
  const backButton = document.createElement("button");
  backButton.textContent = "← Retour";
  backButton.style.display = "none"; // Cache le bouton au départ
  backButton.addEventListener("click", () => {
      formContainer.style.display = "none"; // Cache le formulaire
      galleryContainer.style.display = "grid"; // Affiche la galerie
      backButton.style.display = "none"; // Cache le bouton de retour
      titleModal.textContent = "Galerie photo"; // Restaure le titre
  });
  modal.appendChild(backButton);

  // Affiche le formulaire et cache la galerie lorsqu'on clique sur "Ajouter une image"
  addButton.addEventListener("click", () => {
      galleryContainer.style.display = "none"; // Cache la galerie
      formContainer.style.display = "block"; // Affiche le formulaire
      backButton.style.display = "block"; // Affiche le bouton de retour
      titleModal.textContent = "Ajout photo"; // Change le titre
  });

  // Crée un bouton "Modifier" pour ouvrir la modale
  const editButton = document.createElement("button");
  editButton.textContent = "Modifier";
  editButton.style.marginLeft = "10px"; // Ajoute un petit espace à gauche du bouton
  document.querySelector("#portfolio h2").appendChild(editButton); // Ajoute le bouton dans le titre de la section "Portfolio"

  // Lorsque l'on clique sur "Modifier", la modale s'affiche
  editButton.addEventListener("click", () => {
      modal.style.display = "block"; // Affiche la modale
      overlay.style.display = "block"; // Affiche l'overlay
      loadGallery(); // Recharge les images dans la galerie
  });
});

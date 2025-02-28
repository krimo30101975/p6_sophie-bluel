// fonction  pour récupérer les travaux ( projets ) 
async function getWorks(filter) {
  document.querySelector(".gallery").innerHTML = ""; // Vide la galerie avant de charger de nouvelles images
  const url = "http://localhost:5678/api/works"; // Déclaration de l'URL de l'API
  try {
    const response = await fetch(url); // Effectue une requête HTTP GET vers l'URL
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const json = await response.json();
    
    // Filtrage des projets selon la catégorie sélectionnée
    const filteredWorks = filter ? json.filter((data) => data.categoryId === filter) : json;
    filteredWorks.forEach(setFigure);
  } catch (error) {
    console.error("Erreur lors de la requête :", error.message);
  }
}
getWorks();

// Fonction pour afficher une image dans la galerie
function setFigure(data) {
  const figure = document.createElement("figure");; // Crée une balise figure
  figure.innerHTML = `<img src="${data.imageUrl}" alt="${data.title}"><figcaption>${data.title}</figcaption>`; 
  document.querySelector(".gallery").append(figure); // Ajoute l'image dans la galerie
}

// fonction pour récupérer les cathegories 
async function getCategories() {
  const url = "http://localhost:5678/api/categories"; // Déclaration de l'URL de l'API qui sera appelée
  try {
    const response = await fetch(url); // Effectue une requête HTTP GET vers l'URL

    // Vérifie si la réponse est valide (code HTTP 200-299)
    if (!response.ok) throw new Error(`Response status: ${response.status}`); // Si ce n'est pas le cas, lève une erreur avec le code de statut
    const json = await response.json(); // Convertit la réponse JSON en un objet JavaScript exploitable
    json.forEach(setFilter);
  } catch (error) {
    console.error("Erreur lors de la requête :", error.message);
  }
}
getCategories();

// Fonction pour afficher les filtres de catégories
function setFilter(data) {
  const div = document.createElement("div"); // Crée un élément div
  div.className = "filter";
  div.dataset.id = data.id;
  div.addEventListener("click", () => getWorks(data.id)); // Ajoute un événement de filtrage au clic
  div.innerHTML = `${data.name}`; 
  document.querySelector(".filtreGallery").append(div);
}

document.querySelector(".tous").addEventListener("click", () => getWorks());
const input = document.querySelector("input");//
input.dataset.id = "1";//

// changer la couleur en selecteur
document.addEventListener("DOMContentLoaded", () => {
  const filtreGallery = document.querySelector(".filtreGallery");
  if (!filtreGallery) {  // Vérifier si l'élément existe
    console.error("L'élément .filtreGallery est introuvable !");
    return;
  }
  // Sélectionner tous les enfants directs de .filtreGallery
  const children = filtreGallery.querySelectorAll("div");
  // Vérifier s'il y a des enfants et activer le premier par défaut
  if (children.length > 0) {
    children[0].classList.add("active");
  }
  filtreGallery.addEventListener("click", (event) => {  // Gestion du clic pour activer/désactiver les filtres
    if (event.target !== filtreGallery && event.target.tagName === "DIV") {
      // Recalcule la liste des enfants au moment du clic, au cas où l'HTML a changé
      const children = filtreGallery.querySelectorAll("div");
      // Supprime la classe active de tous les enfants
      children.forEach(c => c.classList.remove("active"));
      // Ajoute la classe active au nouvel élément cliqué
      event.target.classList.add("active");
    }
  });
  function displayFiltreGallery() {
    if (localStorage.authToken) {
      filtreGallery.style = "display : none";
    }
  }
  displayFiltreGallery();
});

// Fonction pour récupérer la taille des images de la galerie
function getGalleryImageSize() {
  const firstImage = document.querySelector(".gallery img"); // Choisir la première image dans la galerie

  // Vérifie si l'image existe et retourne sa taille
  if (firstImage) {
    return {
      width: firstImage.width,
      height: firstImage.height
    };
  }
  return { width: 0, height: 0 }; // Retourne 0, 0 si aucune image n'existe dans la galerie
}

// Fonction pour afficher le mode édition si l'utilisateur est connecté " éddit banner ""
function displayAdminMode() {
  if (localStorage.authToken) {
    const editBanner = document.createElement("div");
    editBanner.className = "mode__edit";
    editBanner.innerHTML = '<p><i class="fa-regular fa-pen-to-square"></i> Mode édition</p>';
    document.body.prepend(editBanner);
  }
}
displayAdminMode();

// Fonction pour créer la Modale
document.addEventListener("DOMContentLoaded", () => {
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal__overlay";
  modalOverlay.style = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.3); display: none; justify-content: center; align-items: center;";
  document.body.append(modalOverlay);
  //
  // Fonction pour créer la Modale galerie
  function closeModal(modal) {
    modal.remove(); // Supprime la modale actuelle
    if (!document.querySelector(".modal")) {
      modalOverlay.style.display = "none"; // Cache l'overlay si plus de modale ouverte
    }
  }
  function createGalleryModal() {
    modalOverlay.style.display = "flex";
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.style.cssText = "width: 610px; height: 688px; background-color: white; border-radius: 10px; padding: 40px 80px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); display: flex; flex-direction: column; justify-content: space-between; align-items: center; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);";

    // Bouton fermeture
    const closeButton = document.createElement("span");
    closeButton.className = "closeButton";
    closeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    closeButton.style = "position: absolute; top: 22px; right: 29px; cursor: pointer; font-size: 20px;";
    closeButton.addEventListener("click", () => closeModal(modal));

    const title = document.createElement("h2");
    title.textContent = "Galerie photo";
    title.style = "fontSize : 26px; font-family : 'Work Sans'; font-weight : 400; color : black; margin : 30px 0;";

    const galleryContainer = document.createElement("div");
    galleryContainer.className = "gallery-container";
    galleryContainer.style = "display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; width: 100%; overflow-y: auto; max-height: 400px; margin: 20px 0 20px 0;";

    // Fonction pour mettre à jour la galerie dans la modale
    function updateModalGallery() {
      createGalleryModal(); // Recharger les images dans la modale
    }
    async function loadImages() {
      // vérifions si un token est disponible dans localStorage
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        alert("Token d'authentification manquant ou expiré.");
        return;
      }
      const response = await fetch("http://localhost:5678/api/works");
      if (!response.ok) throw new Error("Erreur lors de la récupération des images");
      const json = await response.json();

      galleryContainer.innerHTML = "";// Vide la galerie avant de recharger les images

      json.forEach((data) => {
        // Conteneur de l'image
        const imgWrapper = document.createElement("div");
        imgWrapper.className = "image-wrapper";
        imgWrapper.style.position = "relative"; // Permet de positionner l'icône corbeille
        // Image
        const newImg = document.createElement("img");
        newImg.src = data.imageUrl;
        newImg.alt = data.title;
        newImg.style = "width: 100%; object-fit: cover;";

        // bouton corbeille image
        const deleteIcon = document.createElement("div");
        deleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteIcon.className = "delete-icon";
        deleteIcon.style = "position: absolute; top: 5px; right: 5px; width: 17px; height: 17px; display: flex; justify-content: center; align-items: center; font-size: 10px; cursor: pointer; background: black; color: white;";

        // Événement pour supprimer l'image
        deleteIcon.addEventListener("click", async () => {
          const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cette image ?");
          if (confirmDelete) {
            try {
              const response = await fetch(`http://localhost:5678/api/works/${data.id}`, {
                method: "DELETE",
                headers: {
                  "Authorization": `Bearer ${authToken}`, // Ajoute le token à la requête DELETE
                },
              });
              if (!response.ok) {
                throw new Error("Erreur lors de la suppression de l'image.");
              }
              imgWrapper.remove(); // Supprime l'image de la modale

              await getWorks(); // Recharge la galerie sans recharger la page
              updateModalGallery(); // Met à jour la galerie dans la modale
            } catch (error) {
              console.error(error.message);
              alert("Une erreur est survenue lors de la suppression.");
            }
          }
        });
        // Ajoute l'image et l'icône de suppression dans le wrapper
        imgWrapper.appendChild(newImg);
        imgWrapper.appendChild(deleteIcon);
        galleryContainer.appendChild(imgWrapper);// Ajoute l'image complète à la galerie
      });
    }

    loadImages();

    /** LIGNE HORIZONTALE **/
    const separationHr = document.createElement("hr");
    separationHr.style = "width: 100%; margin: 50px 0 40px 0";

    // bouton vers le formulaire
    const addButton = document.createElement("button");
    addButton.textContent = "Ajouter une image";
    addButton.className = "add-button";
    addButton.style = "display : flex; align-items : center; justify-content : center; cursor : pointer; color : white; background : rgba(29, 97, 84, 1); border : none; border-radius : 60px; width : 237px; height : 38px";
    addButton.addEventListener("click", () => {
      closeModal(modal);
      createFormModal();
    });
    modal.append(closeButton, title, galleryContainer, separationHr, addButton);
    modalOverlay.append(modal);
  }
  // Fonction pour créer la Modale Formulaire
  function createFormModal() {
    modalOverlay.style.display = "flex";
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.style.cssText = "width: 610px; height: 688px; background-color: white; border-radius: 10px; padding: 40px 80px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); display: flex; flex-direction: column; justify-content: space-between; align-items: center; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);";

    // Bouton retour
    const backButton = document.createElement("span");
    backButton.className = "backButton";
    backButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    backButton.style = "position: absolute; top: 10px; left: 10px; cursor: pointer; font-size: 20px; background: none; border: none;";
    backButton.addEventListener("click", () => {
      closeModal(modal);
      createGalleryModal();
    });

    // Bouton fermeture
    const closeButton = document.createElement("span");
    closeButton.className = "closeButton";
    closeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    closeButton.style = "position: absolute; top: 22px; right: 29px; cursor: pointer; font-size: 20px;";
    closeButton.addEventListener("click", () => closeModal(modal));

    const sectionTitle = document.createElement("h2");
    sectionTitle.textContent = "Ajout photo";
    sectionTitle.style = "fontSize : 26px; font-family : 'Work Sans'; font-weight : 400; color : black; margin : 30px 0;";

    const form = document.createElement("form");
    form.className = "add-image-form";
    form.style.cssText = "width: 420px; height: 500px; display: flex; flex-direction: column; justify-content: space-between; align-items: center;"
    
    // Conteneur pour l’image
    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";
    imageContainer.style = "display : flex; flex-direction: column; justify-content: space-around; align-items: center; width : 420px; height : 169px; border-radius : 3px; background-color : rgba(232, 241, 246, 1)";
    const imageIcon = document.createElement("i");
    imageIcon.className = "fa-regular fa-image"; // Icône paysage
    imageIcon.style = "width: 76px; height : 76px; font-size : 68px; color : rgba(185, 197, 204, 1);";
    const previewImage = document.createElement("img");
    previewImage.className = "preview-image";
    previewImage.style.display = "none";
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.id = "fileInput"; // Ajout de l'ID
    fileInput.name = "image"; // Ajout du name
    fileInput.style.display = "none";
    fileInput.required = true;
    const uploadLabel = document.createElement("label");
    uploadLabel.setAttribute("for", "fileInput"); // Lier le label à l'input
    uploadLabel.className = "upload-label";
    uploadLabel.textContent = "+ Ajouter photo";
    //uploadLabel.appendChild(fileInput);
    uploadLabel.style = "display : flex; align-items : center; justify-content : center; cursor : pointer; font-Size : 14px; font-family : 'Work Sans'; font-weight : 500; color : rgba(48, 102, 133, 1); background : rgba(203, 214, 220, 1); border : none; border-radius : 60px; width : 237px; height : 38px;";
    const uploadParagraph = document.createElement("p");
    uploadParagraph.textContent = "JPG, PNG : 4mo max";
    uploadParagraph.style = "font-Size : 10px; font-family : 'Work Sans'; font-weight : 400; color : rgba(68, 68, 68, 1);";

    // Prévisualisation de l’image
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewImage.src = e.target.result;
          previewImage.style.display = "block";
          previewImage.style.height = "100%"; // Image prend toute la hauteur
          imageIcon.style.display = "none";
          uploadLabel.style.display = "none";
          uploadParagraph.style.display = "none";
        };
        reader.readAsDataURL(file);
      }
      checkFormValidity();
    });
    imageContainer.append(imageIcon, previewImage, uploadLabel, uploadParagraph, fileInput);

    // Champ titre
    const titleContainer = document.createElement("div");
    titleContainer.className = "input-container";
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "titleInput");
    titleLabel.textContent = "Titre";
    titleLabel.style = "font-Size : 14px; font-family : 'Work Sans'; font-weight : 500; color : rgba(61, 61, 61, 1);";
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "titleInput"; 
    titleInput.style = "font-Size : 14px; font-family : 'Work Sans'; font-weight : 500; color : rgba(61, 61, 61, 1); width : 100%; height : 51px; border : none; box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1)";
    titleInput.required = true;
    style = "width : 100%; height : 51px; border : none; box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1)">
    titleContainer.append(titleLabel, titleInput);

    // Sélection de la catégorie
    const categoryContainer = document.createElement("div");
    categoryContainer.className = "input-container";
    const categoryLabel = document.createElement("label");
    categoryLabel.setAttribute("for", "categorySelect");
    categoryLabel.textContent = "Catégorie";
    const categorySelect = document.createElement("select");
    categorySelect.id = "categorySelect"; // Ajout de l'ID
    categorySelect.name = "category"; // Ajout du name
    categorySelect.required = true;
    categorySelect.style = "font-Size : 14px; font-family : 'Work Sans'; font-weight : 500; color : rgba(61, 61, 61, 1); width : 100%; height : 51px; border : none; box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1)";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Choisir une catégorie";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    categorySelect.appendChild(defaultOption);  

    async function loadCategories() {  // Ajout des catégories depuis l'API
      try {
        const response = await fetch("http://localhost:5678/api/categories");
        if (!response.ok) throw new Error("Erreur lors de la récupération des catégories");
        const categories = await response.json();

        categorySelect.innerHTML = "";
        categorySelect.appendChild(defaultOption);

        categories.forEach(category => {
          const option = document.createElement("option");
          option.value = category.id;
          option.textContent = category.name;
          categorySelect.appendChild(option);
        });
      } catch (error) {
        console.error(error.message);
      }
    }
    loadCategories();
    // LIGNE HORIZONTALE
    const separationHr = document.createElement("hr");
    separationHr.style = "width: 100%; margin: 50px 0 40px 0";
    // BOUTON VALIDER 
    const submitButton = document.createElement("button");
    submitButton.innerText = "Valider";
    submitButton.id = "submitButton"; // Ajout de l'ID
    submitButton.type = "submit";
    submitButton.disabled = true; // Désactivé au début
    submitButton.style = "font-Size : 14px; font-family : 'Syne'; font-weight : 500;display :margin : 0, auto; flex; align-items : center; justify-content : center; cursor : pointer; color : white; border : none; border-radius : 60px; width : 237px; height : 38px;";
    submitButton.style.backgroundColor = "rgba(167, 167, 167, 1)"; // Gris par défaut
    submitButton.style.color = "white";

    function checkFormValidity() {  // Vérification du formulaire avant validation
      if (fileInput.files.length > 0 && titleInput.value.trim() !== "" && categorySelect.value !== "") {
        submitButton.style.backgroundColor = "rgba(29, 97, 84, 1)";
        submitButton.disabled = false;
      } else {
        submitButton.style.backgroundColor = "rgba(203, 214, 220, 1)";
        submitButton.disabled = true;
      }
    }
  // Vérification du formulaire avant validation
    form.append(imageContainer, titleLabel, titleInput, categoryLabel, categorySelect, separationHr, submitButton);

    titleInput.addEventListener("input", checkFormValidity);
    categorySelect.addEventListener("change", checkFormValidity);
  
    submitButton.addEventListener("click", async (event) => { // Événement sur le bouton submit
      event.preventDefault();
  
      // Vérification des champs
      if (!fileInput.files[0] || !titleInput.value || !categorySelect.value) {
        alert("Veuillez remplir tous les champs avant de soumettre.");
        return;
      }

      // Récupérer la taille des images de la galerie
      const { width, height } = getGalleryImageSize();

      const formData = new FormData();
      formData.append("image", fileInput.files[0]);
      formData.append("title", titleInput.value.trim());
      formData.append("category", categorySelect.value);
      try {
        const response = await fetch("http://localhost:5678/api/works", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de l'envoi du formulaire.");
        }
        closeModal(modal);
        
        await getWorks(); // Recharge la galerie après l'ajout

        // Une fois les données rechargées, tu dois appliquer la taille des images
        const newImage = document.createElement("img");
        newImage.src = URL.createObjectURL(fileInput.files[0]);
    
        // Appliquer la taille récupérée à la nouvelle image
        newImage.style.width = `${width}px`;
        newImage.style.height = `${height}px`;
        createGalleryModal();
      } catch (error) {
        console.error(error.message);
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    });

    modal.append(backButton, closeButton, sectionTitle, form);
    modalOverlay.append(modal);
    document.body.appendChild(modalOverlay);
  
    return modalOverlay;
  }

  // Bouton pour ouvrir la Modale Galerie
  const editButton = document.createElement("button");
  editButton.className = "edit__button";
  editButton.innerHTML = '<p><i class="fa-regular fa-pen-to-square"></i> Modifier</p>';
  editButton.style = "margin-left: 10px; border: none; background-color: white; cursor: pointer;";
  editButton.addEventListener("click", createGalleryModal); // Ajouter un événement au bouton

  document.querySelector("#portfolio h2").appendChild(editButton);
});

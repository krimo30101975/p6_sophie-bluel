// ========================= CONFIGURATION =========================
const config = {
  api: {
    works: "http://localhost:5678/api/works",
    categories: "http://localhost:5678/api/categories"
  },
  selectors: {
    gallery: ".gallery",
    filterGallery: ".filtreGallery",
    portfolioTitle: "#portfolio h2"
  },
  elements: {
    gallery: null,
    filterGallery: null,
    portfolioTitle: null,
    modalOverlay: null
  },
  styles: {
    image: "width: 100%; height: auto; object-fit: cover;",
    editButton: "margin: 70px 0 50px 10px; border: none; background-color: white; cursor: pointer;",
    modalOverlay: "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.3); display: none; justify-content: center; align-items: center;",
    modal: "width: 610px; height: 688px; background-color: white; border-radius: 10px; padding: 40px 80px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); display: flex; flex-direction: column; justify-content: space-between; align-items: center; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);",
    modalTitle: "margin-top: 0; text-align: center;",
    closeButton : "position: absolute; top: 22px; right: 29px; cursor: pointer; font-size: 20px;",
    backButton : "position: absolute; top: 22px; left: 29px; cursor: pointer; font-size: 20px;",
    title : "font-size: 26px; font-family: 'Work Sans'; font-weight: 400; color: black; margin: 20px 0;",
    galleryContainer : "display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; width: 100%; overflow-y: auto; max-height: 688px; margin: 20px 0;",
    deleteIcon : "position: absolute; top: 5px; right: 5px; width: 17px; height: 17px; display: flex; justify-content: center; align-items: center; font-size: 10px; cursor: pointer; background: black; color: white;",
    separationHr : "width: 100%; margin: 50px 0 40px 0;",
    addButton : "font-size: 14px; font-family: 'Syne'; font-weight: 500; display: flex; align-items: center; justify-content: center; cursor: pointer; color: white; background: rgba(29, 97, 84, 1); border: none; border-radius: 60px; width: 237px; height: 38px;",
    newImg : "width: 100%; object-fit: cover;",
    sectionTitle : "font-size: 26px; font-family: 'Work Sans'; font-weight: 400; color: black; margin: 30px 0;",
    form : "width: 100%; height: 500px; display: flex; flex-direction: column; justify-content: space-between;",
    imageContainer : "display: flex; flex-direction: column; justify-content: space-around; align-items: center; width: 100%; height: 169px; border-radius: 3px; background-color: rgba(232, 241, 246, 1);",
    imageIcon : "padding-top: 15px; font-size: 76px; color: rgba(185, 197, 204, 1);",
    uploadInfo : "font-size: 10px; font-family: 'Work Sans'; font-weight: 400; padding-bottom: 15px; color: rgba(68, 68, 68, 1);",
    previewImage : "display: none; height: 100%;",
    uploadLabel : "display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 14px; font-family: 'Work Sans'; font-weight: 500; color: rgba(48, 102, 133, 1); background: rgba(203, 214, 220, 1); border: none; border-radius: 60px; width: 237px; height: 38px;",
    titleLabel : "margin-top: 20px; font-size: 14px; line-height: 16.42px; font-family: 'Work Sans'; font-weight: 500; color: rgba(61, 61, 61, 1); background-color: white !important; outline: none;",
    titleInput : "font-size: 14px; font-family: 'Work Sans'; font-weight: 500; color: rgba(61, 61, 61, 1); width: 100%; height: 51px; border: none; box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1); background-color: white !important; outline: none; appearance: none; -webkit-appearance: none;",
    categoryLabel : "margin-top: 20px; font-size: 14px; line-height: 16.42px; font-family: 'Work Sans'; font-weight: 500; color: rgba(61, 61, 61, 1);",
    categorySelect : "font-size: 14px; font-family: 'Work Sans'; font-weight: 500; color: rgba(61, 61, 61, 1); width: 100%; height: 51px; border: none; box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);",
    submitButton : "font-size: 14px; font-family: 'Syne'; font-weight: 500; display: flex; align-items: center; justify-content: center; cursor: pointer; color: white; background: rgba(167, 167, 167, 1); border: none; border-radius: 60px; width: 237px; height: 32px; transform: translate(45%, 0%);",
  },
  classes: {
    filter: "filter",
    active: "active",
    modeEdit: "mode__edit",
    editButton: "edit__button",
    modalOverlay : "modal__overlay",
    modal : "modal",
    closeButton : "closeButton",
    galleryContainer : "gallery-container",
    imgWrapper : "image-wrapper",
    deleteIcon : "delete-icon",
    addButton : "add-button",
    form : "add-image-form",
    imageContainer : "image-container",
    imageIcon : "fa-regular fa-image",
    uploadLabel : "upload-label",
    previewImage : "preview-image",
    titleContainer : "input-container",
    categoryContainer : "input-container",
  }
};

// ========================= INIT AU CHARGEMENT =========================
document.addEventListener("DOMContentLoaded", () => {
  // Sélections DOM regroupées ici
  config.elements = {
    gallery: document.querySelector(config.selectors.gallery),
    filterGallery: document.querySelector(config.selectors.filterGallery),
    portfolioTitle: document.querySelector(config.selectors.portfolioTitle)
  };

  getWorks();
  getCategories();
  setupTousFilter();
  setupFilterActiveStyle();
  hideFiltersIfLoggedIn();
  displayAdminBanner();
});

// ========================= 1. VARIABLES GLOBALES =========================
const gallery = document.querySelector(".gallery");
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.querySelector(".closeModalBtn");
const addPhotoBtn = document.querySelector(".addPhotoBtn");
const formContainer = document.querySelector(".formContainer");
const uploadSection = document.querySelector(".uploadSection");
const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const titleInput = document.getElementById("titleInput");
const categorySelect = document.getElementById("categorySelect");
const addProjectBtn = document.getElementById("addProjectBtn");


// ========================= CHARGEMENT DES PROJETS =========================
async function getWorks(filter) {
  config.elements.gallery.innerHTML = "";
  try {
    const response = await fetch(config.api.works);
    if (!response.ok) throw new Error(`Statut : ${response.status}`);
    const works = await response.json();
    const filtered = filter ? works.filter(work => work.categoryId === filter) : works;
    filtered.forEach(createFigure);
  } catch (error) {
    console.error("Erreur chargement des travaux :", error.message);
  }
}

// ========================= AFFICHAGE DES FIGURES =========================
function createFigure(data) {
  const figure = document.createElement("figure");
  figure.style = config.styles.figure;
  figure.innerHTML = `<img src="${data.imageUrl}" alt="${data.title}" style="${config.styles.image}"><figcaption>${data.title}</figcaption>`;
  config.elements.gallery.appendChild(figure);
}

// ========================= CHARGEMENT DES CATÉGORIES =========================
async function getCategories() {
  try {
    const response = await fetch(config.api.categories);
    if (!response.ok) throw new Error(`Statut : ${response.status}`);
    const categories = await response.json();
    categories.forEach(createFilter);
  } catch (error) {
    console.error("Erreur chargement catégories :", error.message);
  }
}

// ========================= CRÉATION DES FILTRES =========================
function createFilter(category) {
  const div = document.createElement("div");
  div.className = config.classes.filter;
  div.dataset.id = category.id;
  div.textContent = category.name;
  div.addEventListener("click", (e) => {
    getWorks(category.id);
    setActiveFilter(e.target);
  });
  config.elements.filterGallery.appendChild(div);
}

// ========================= FILTRE "TOUS" =========================
function setupTousFilter() {
  const divTous = document.createElement("div");
  divTous.className = config.classes.filter;
  divTous.textContent = "Tous";
  divTous.addEventListener("click", (e) => {
    getWorks();
    setActiveFilter(e.target);
  });
  config.elements.filterGallery.prepend(divTous);
}

// ========================= STYLE FILTRES ACTIFS =========================
function setActiveFilter(clickedElement) {
  const filters = config.elements.filterGallery.querySelectorAll(`.${config.classes.filter}`);
  filters.forEach(f => f.classList.remove(config.classes.active));
  clickedElement.classList.add(config.classes.active);
}

function setupFilterActiveStyle() {
  const filters = config.elements.filterGallery?.querySelectorAll("div") || [];
  if (filters.length > 0) filters[0].classList.add(config.classes.active);
}

// ========================= AFFICHAGE/ MASQUAGE FILTRES =========================
function hideFiltersIfLoggedIn() {
  if (localStorage.authToken) {
    config.elements.filterGallery.style.display = "none";
  }
}

// ========================= MODE ADMIN =========================
function displayAdminBanner() {
  if (localStorage.authToken) {
    const banner = document.createElement("div");
    banner.className = config.classes.modeEdit;
    banner.innerHTML = '<p><i class="fa-regular fa-pen-to-square"></i> Mode édition</p>';
    document.body.prepend(banner);
  }
}

// ========================= MODALE OVERLAY =========================
document.addEventListener("DOMContentLoaded", () => {

  config.elements.portfolioTitle = document.querySelector(config.selectors.portfolioTitle);
  
  function createElement(tag, className = "", styleString = "", innerHTML = "") {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (styleString) Object.assign(element.style, styleToObject(styleString));
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
  }
  
  function styleToObject(styleString) {
    const styleObj = {};
    if (typeof styleString !== "string") return styleObj;
    styleString.split(";").forEach(style => {
      const [key, value] = style.split(":").map(s => s.trim());
      if (key && value) {
        // camelCase pour compatibilité avec element.style
        const camelKey = key.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
        styleObj[camelKey] = value;
      }
    });
    return styleObj;
  }

  const createOverlay = () => {
    let overlay = document.getElementById("modalOverlay");
    if (overlay) overlay.remove();
    overlay = createElement("div", config.classes.modalOverlay, config.styles.modalOverlay);
    overlay.id = "modalOverlay";
    document.body.appendChild(overlay);
    config.elements.modalOverlay = overlay;
    return overlay;
  };

  const modalOverlay = createOverlay();

  const closeModal = () => {
    modalOverlay.innerHTML = "";
    modalOverlay.style.display = "none";
  };

  const createCloseButton = () => {
    const btn = createElement("span", config.classes.closeButton, config.styles.closeButton, '<i class="fa-solid fa-xmark"></i>');
    btn.addEventListener("click", closeModal);
    return btn;
  };

  // ========================= MODALE GALERIE =========================
  function createGalleryModal () {
    modalOverlay.innerHTML = "";
    modalOverlay.style.display = "flex";
    const modal = createElement("div", config.classes.modal, config.styles.modal);
    modalOverlay.onclick = (e) => {
      if (e.target === modalOverlay) closeModal();
    };

    const title = createElement("h2", "", config.styles.title);
    title.textContent = "Galerie photo";
    const galleryContainer = createElement("div", config.classes.galleryContainer, config.styles.galleryContainer);

    // Fonction pour charger les images dans la galerie
    const loadImages = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return alert("Token manquant.");
      try {
        const res = await fetch(config.api.works);
        const images = await res.json();
        galleryContainer.innerHTML = "";
        images.forEach(data => {
          const wrapper = createElement("div", config.classes.imgWrapper, "position: relative;");
          const img = document.createElement("img");
          img.src = data.imageUrl;
          img.alt = data.title;
          img.dataset.id = data.id;
          const deleteIcon = createElement("div", config.classes.deleteIcon, config.styles.deleteIcon, '<i class="fa-solid fa-trash-can"></i>');
          deleteIcon.addEventListener("click", async () => {
            if (confirm("Supprimer cette image ?")) {
              try {
                const del = await fetch(`${config.api.works}/${data.id}`, {
                  method: "DELETE",
                  headers: { Authorization: `Bearer ${token}` }
                });
                if (del.ok) {
                  wrapper.remove();

                  await getWorks(); // Recharge la galerie sans recharger la page
                  closeModal();
                }
              } catch (err) {
                alert("Erreur suppression.");
              }
            }
          });
          wrapper.append(img, deleteIcon);
          galleryContainer.appendChild(wrapper);
          document.querySelector(".modal");
        });
      } catch (err) {
        console.error(err.message);
      }
    };
    loadImages();

    const addButton = createElement("button", config.classes.addButton, config.styles.addButton);
    addButton.textContent = "Ajouter une image";
    addButton.onclick = () => createFormModal();

    modal.append(createCloseButton(), title, galleryContainer, createElement("hr", "", config.styles.separationHr), addButton);
    modalOverlay.appendChild(modal);
  };

  // ========================= MODALE FORM =========================
  function createFormModal () {
    modalOverlay.innerHTML = "";
    modalOverlay.style.display = "flex";
    const modal = createElement("div", config.classes.modal, config.styles.modal);

    const backButton = createElement("span", "", config.styles.backButton, '<i class="fa-solid fa-arrow-left"></i>');
    backButton.onclick = () => {
      closeModal();
      createGalleryModal();
    };

    const closeButton = createCloseButton();
    const sectionTitle = createElement("h2", "", config.styles.sectionTitle);
    sectionTitle.textContent = "Ajout photo";
    const form = createElement("form", config.classes.form, config.styles.form);

    const imageContainer = createElement("div", config.classes.imageContainer, config.styles.imageContainer);
    const imageIcon = createElement("i", config.classes.imageIcon, config.styles.imageIcon);
    const previewImage = createElement("img", config.classes.previewImage, config.styles.previewImage);
    previewImage.style.display = "none";

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.id = "fileInput";
    fileInput.name = "image"; // Ajout du name
    fileInput.style.display = "none";

    const uploadLabel = createElement("label", config.classes.uploadLabel, config.styles.uploadLabel);
    uploadLabel.textContent = "+ Ajouter photo";
    uploadLabel.setAttribute("for", "fileInput"); // Lier le label à l'input

    const uploadInfo = document.createElement("p");
    uploadInfo.textContent = "jpg, png : 4mo max";
    uploadInfo.style = config.styles.uploadInfo;

    // Prévisualisation de l’image
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          previewImage.src = evt.target.result;
          previewImage.style.display = "block";
          imageIcon.style.display = uploadLabel.style.display = uploadInfo.style.display = "none";
        };
        reader.readAsDataURL(file);
      }
      checkFormValidity();
    };

    imageContainer.append(imageIcon, previewImage, uploadLabel, uploadInfo, fileInput);

    // Champ titre
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "titleInput");
    titleLabel.textContent = "Titre";
    titleLabel.style = config.styles.titleLabel;

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "titleInput";
    titleInput.style = config.styles.titleInput;
    titleInput.required = true;

    // Sélection de la catégorie
    const categoryLabel = document.createElement("label");
    categoryLabel.setAttribute("for", "categorySelect");
    categoryLabel.textContent = "Catégorie";
    categoryLabel.style = config.styles.categoryLabel;

    const categorySelect = document.createElement("select");
    categorySelect.id = "categorySelect";
    categorySelect.name = "category"; // Ajout du name
    categorySelect.required = true;
    categorySelect.style = config.styles.categorySelect;

    const defaultOpt = new Option("", "", true, true);
    defaultOpt.disabled = true;
    categorySelect.appendChild(defaultOpt);

    const loadCategories = async () => { // Ajout des catégories depuis l'API
      try {
        const res = await fetch(config.api.categories);
        const cats = await res.json();
        categorySelect.innerHTML = "";
        categorySelect.appendChild(defaultOpt);
        cats.forEach(cat => categorySelect.appendChild(new Option(cat.name, cat.id)));
      } catch (err) {
        console.error(err.message);
      }
    };
    loadCategories();

    // BOUTON VALIDER 
    const submitButton = document.createElement("button");
    submitButton.textContent = "Valider";
    submitButton.id = "submitButton"; // Ajout de l'ID
    submitButton.type = "submit";
    submitButton.disabled = true; // Désactivé au début
    submitButton.style = config.styles.submitButton;

    // Vérification du formulaire avant validation
    const checkFormValidity = () => {
      submitButton.disabled = !(fileInput.files[0] && titleInput.value && categorySelect.value);
      submitButton.style.backgroundColor = submitButton.disabled ? "rgba(203, 214, 220, 1)" : "rgba(29, 97, 84, 1)";
    };

    [titleInput, categorySelect].forEach(el => el.addEventListener("input", checkFormValidity));

    submitButton.onclick = async (e) => {
      e.preventDefault();
      if (!fileInput.files[0] || !titleInput.value || !categorySelect.value) return alert("Champs requis");

      const formData = new FormData();
      formData.append("image", fileInput.files[0]);
      formData.append("title", titleInput.value.trim());
      formData.append("category", categorySelect.value);
      try {
        const res = await fetch(config.api.works, {
          method: "POST",
          body: formData,
          headers: { Authorization: `Bearer ${localStorage.authToken}` }
        });
        if (!res.ok) throw new Error("Échec ajout");

        await getWorks();
        createGalleryModal();
        closeModal();
      } catch (err) {
        alert("Erreur ajout image");
      }
    };

    form.append(imageContainer, titleLabel, titleInput, categoryLabel, categorySelect, createElement("hr", "", config.styles.separationHr), submitButton);
    modal.append(backButton, closeButton, sectionTitle, form);
    modalOverlay.appendChild(modal);
  };

  function displayAdminEdit() {
    if (localStorage.authToken && config.elements.portfolioTitle) {
      const editButton = createElement("button", config.classes.editButton, config.styles.editButton, '<i class="fa-regular fa-pen-to-square"></i> Modifier');
      editButton.onclick = createGalleryModal;
      config.elements.portfolioTitle.appendChild(editButton);
    }
  }

  displayAdminEdit();
});

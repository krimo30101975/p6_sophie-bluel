// Fonction asynchrone pour récupérer des "works" (des données, comme des projets ou des tâches)
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

// changer la couleur en select
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



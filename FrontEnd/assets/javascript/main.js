// Fonction asynchrone pour récupérer des "works" (des données, comme des projets ou des tâches)
async function getWorks() {
    const url = "http://localhost:5678/api/works"; // Déclaration de l'URL de l'API qui sera appelée
  
    try {
      const response = await fetch(url); // Effectue une requête HTTP GET vers l'URL
  
      // Vérifie si la réponse est valide (code HTTP 200-299)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`); // Si ce n'est pas le cas, lève une erreur avec le code de statut
      }

      const json = await response.json(); // Convertit la réponse JSON en un objet JavaScript exploitable

      console.log(json);

      for (let i = 0; i < json.length; i++) {
        setFigure(json[i])
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
  

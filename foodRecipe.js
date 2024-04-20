document.addEventListener("DOMContentLoaded", () => {
  // Fetch recipes when the page loads
  // console.log("recipes");

  fetchRecipes();
});

async function fetchRecipes() {
  try {
    const response = await fetch("https://recipe-app-backend-25fu.onrender.com/getRecipes");
    const recipes = await response.json();
    // console.log(recipes);
    // Display recipes on the UI
    displayRecipes(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

function displayRecipes(recipes) {
  const recipeListElement = document.getElementById("recipeList");

  // Assuming each recipe has a 'recipe_title' property
  const recipeItems = recipes.map(
    (recipe) => `
    <div class="item">
        <h4>Recipe Title</h4>
        <p>${recipe.recipe_title}</p>
        <h4>Recipe ingredient</h4>
         <p>${recipe.ingredient}</p>
        <h4>Recipe instructions</h4>
        <p>${recipe.instructions}</p>
    </div>`
  );

  // Update the UI with the list of recipes
  recipeListElement.innerHTML = recipeItems.join("");
}

document.addEventListener("DOMContentLoaded", () => {
  // Fetch recipe details and populate the form
  const recipeId = getRecipeIdFromURL();
  fetchRecipeDetails(recipeId);

  // Attach event listener to the form submission
  document.getElementById("editForm").addEventListener("submit", updateRecipe);
});

async function fetchRecipeDetails(recipeId) {

  try {
    const response = await fetch(
      `https://recipe-app-backend-25fu.onrender.com/getRecipe/${recipeId}`
    );
    const recipe = await response.json();


    // Populate the form with recipe details
    document.getElementById("recipeId").value = recipe.id;
    document.getElementById("editTitle").value = recipe.recipe_title;
    document.getElementById("editIngredients").value = recipe.ingredient;
    document.getElementById("editInstructions").value = recipe.instructions;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
  }
}

async function updateRecipe(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  try {
    await fetch(
      `https://recipe-app-backend-25fu.onrender.com/${formData.get(
        "recipeId"
      )}`,
      {
        method: "POST", // Use POST for form submissions
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          editTitle: formData.get("editTitle"),
          editIngredients: formData.get("editIngredients"),
          editInstructions: formData.get("editInstructions"),
        }),
      }
    );

    // Redirect or navigate back to the recipe list page after update
    window.location.href = "add.html"; // Update the URL as needed
  } catch (error) {
    console.error("Error updating recipe:", error);
  }
}
function getRecipeIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

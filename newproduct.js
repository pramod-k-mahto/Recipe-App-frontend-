async function AddData() {
  event.preventDefault();
  const recipeTitle = document.getElementById("recipeTitle").value;
  const ingredients = document.getElementById("ingredients").value;
  const instructions = document.getElementById("instructions").value;
  const data = {
    recipeTitle,
    ingredients,
    instructions,
  };

  try {
    const response = await fetch(
      "https://recipe-app-backend-25fu.onrender.com/submit-recipe",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    document.getElementById("recipeForm").reset();
    if (response.status == 200) {
      console.log("done");
      window.location.href = "add.html";
    }
  } catch (error) {
    console.error("Error submitting recipe:", error);
  }
}

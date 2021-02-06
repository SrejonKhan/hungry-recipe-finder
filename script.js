let x;
fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken').
    then(response => response.json()).
    then(json =>
    {
        const resultGroupDiv = document.getElementById("result-groups");
        
        for (let i = 0; i < json.meals.length; i++) { 
            const meal = json.meals[i];
            const card = document.createElement("div");
            card.className = "col";
            const cardInnerHTML = `<div class="card recipe-card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
            </div>`;
            card.innerHTML = cardInnerHTML;
            resultGroupDiv.appendChild(card);
            card.addEventListener("click", () => showRecipe(meal));
        }
    });

function showRecipe(recipe) { 
    console.log(recipe);
    const recipeDiv = document.getElementById("individual-recipe");
    recipeDiv.style.display = "block";

    const recipeThumbnail = document.getElementById("individual-recipe-image");
    recipeThumbnail.src = recipe.strMealThumb;

    const recipeTitle = document.getElementById("individual-recipe-title");
    recipeTitle.innerText = recipe.strMeal;

    const recipeIngredientsList = document.getElementById("individual-recipe-ingredients");

    for (let i = 0; i < 20; i++) { 
        if (Object.prototype.hasOwnProperty.call(recipe, "strIngredient" + (i + 1))) { 
            const ingredientItem = document.createElement("li");
            ingredientItem.innerText = recipe['strIngredient' + (i + 1)];         
            recipeIngredientsList.appendChild(ingredientItem);
        }

    }
}    

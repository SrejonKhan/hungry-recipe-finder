const searchInput = document.getElementById("search-inputfield");
const searchButton = document.getElementById("search-button");

const recipeDiv = document.getElementById("individual-recipe");


searchButton.addEventListener("click", () => fetchRecipes(searchInput.value));

function fetchRecipes(keyword) { 
fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`).
    then(response => response.json()).
    then(json =>
    {
        const resultGroupDiv = document.getElementById("result-groups");
        resultGroupDiv.innerHTML = "";
     
        const notFoundDiv = document.getElementById("not-found-div");
        notFoundDiv.style.display = "none";

        recipeDiv.style.display = "none";
        
        if (json.meals == null || json.meals.length == 0) { 
            notFoundDiv.style.display = "block";
            return;
        }
        
        for (let i = 0; i < json.meals.length; i++) { 
            const meal = json.meals[i];
            const card = document.createElement("div");
            card.className = "col";
            const cardInnerHTML = `<div class="card recipe-card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
            <div class="card-body text-center">
              <h5 class="card-title recipe-card-title">${meal.strMeal}</h5>
            </div>`;
            card.innerHTML = cardInnerHTML;
            resultGroupDiv.appendChild(card);
            card.addEventListener("click", () => showIndividualRecipe(meal));
        }
    });
}

function showIndividualRecipe(recipe) { 
    console.log(recipe);
    recipeDiv.style.display = "block";

    const recipeThumbnail = document.getElementById("individual-recipe-image");
    recipeThumbnail.src = recipe.strMealThumb;

    const recipeTitle = document.getElementById("individual-recipe-title");
    recipeTitle.innerText = recipe.strMeal;

    const recipeIngredientsList = document.getElementById("individual-recipe-ingredients");
    recipeIngredientsList.innerHTML = "";
    for (let i = 0; i < 20; i++) { 
        if (Object.prototype.hasOwnProperty.call(recipe, "strIngredient" + (i + 1))) { 
            if (recipe['strIngredient' + (i + 1)].length <= 0)
                continue;
            const ingredientItem = document.createElement("li");
            ingredientItem.innerText = recipe['strIngredient' + (i + 1)];         
            recipeIngredientsList.appendChild(ingredientItem);
        }
    }
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

}    

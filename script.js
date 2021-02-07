const searchInput = document.getElementById("search-inputfield");
const searchButton = document.getElementById("search-button");

const recipeDiv = document.getElementById("individual-recipe");

//Search Button Event
searchButton.addEventListener("click", () => fetchRecipes(searchInput.value));


//Fetch Recipes according to keywords
function fetchRecipes(keyword) { 
fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`).
    then(response => response.json()).
    then(json =>
    {
        const resultGroupDiv = document.getElementById("result-groups");
        resultGroupDiv.innerHTML = ""; //clear cards parent
     
        const notFoundDiv = document.getElementById("not-found-div");
        notFoundDiv.style.display = "none"; //hide not found div

        recipeDiv.style.display = "none"; //hide individual recipe

        document.getElementById("footer").style.bottom = 0; //set footer bottom to 0

        //Return and show not found if meals collection is empty
        if (json.meals == null || json.meals.length == 0) { 
            notFoundDiv.style.display = "block";
            return;
        }
        
        //Show all meals to cards
        json.meals.forEach(meal => {
            //Create Card
            const card = document.createElement("div");
            card.className = "col";

            const cardInnerHTML = `<div class="card recipe-card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
            <div class="card-body text-center">
              <h5 class="card-title recipe-card-title">${meal.strMeal}</h5>
            </div>`;

            card.innerHTML = cardInnerHTML;
            resultGroupDiv.appendChild(card); //Append to parent div
            
            //Add click event to each card for individual details
            card.addEventListener("click", () => showIndividualRecipe(meal));
        });

        //Set footer bottom to auto to match with contents
        if (json.meals.length >= 8) {
            document.getElementById("footer").style.bottom = "auto";
         }
    });
}

//Show Individual Recipe Details
function showIndividualRecipe(recipe) { 
    
    recipeDiv.style.display = "block"; //show individual recipe div

    //set recipe thumbnail
    const recipeThumbnail = document.getElementById("individual-recipe-image");
    recipeThumbnail.src = recipe.strMealThumb; 

    //set recipe title
    const recipeTitle = document.getElementById("individual-recipe-title");
    recipeTitle.innerText = recipe.strMeal;

    //set recipe ingredients and measurement
    const recipeIngredientsList = document.getElementById("individual-recipe-ingredients");
    recipeIngredientsList.innerHTML = "";

    //loop through all ingredient and measure props
    for (let i = 0; i < 20; i++) { 
        if (Object.prototype.hasOwnProperty.call(recipe, "strIngredient" + (i + 1))) { 
            
            //check if following props has value
            if (recipe['strIngredient' + (i + 1)].length <= 0)
                continue;
            
            //set ingredient to list item
            const ingredientItem = document.createElement("li");
            ingredientItem.innerText = recipe['strMeasure' + (i + 1)] + " " + recipe['strIngredient' + (i + 1)];         
            recipeIngredientsList.appendChild(ingredientItem); //append to parent
        }
    }
    document.documentElement.scrollTop = 0; // Scroll to top for better User Experience
    document.getElementById("footer").style.bottom = "auto"; //set footer bottom attrib to auto
    
}    

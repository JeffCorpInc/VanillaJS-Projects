const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("submit"); 
const randomBtn = document.getElementById("random-btn");
const resultHeading = document.getElementById("result-heading");
const mealsContainer = document.getElementById("all-meals");
const mealsInfo = document.getElementById("meal-info");


//Function to Search Meals
function searchMeal(e){
    
    e.preventDefault();                                                                           //buitl-in feature to prevent page from loading on search
    
    //storing User searched Data
    const userSearchData = searchBar.value;                                                       //storing user search data using .value

    //Fetching Data using user search
    if (userSearchData.trim()) {                                                                  //trim removes whitespaces
        
        resultHeading.innerHTML = `<p>Search Results for ' ${userSearchData} '</p>`;

        fetch(`www.themealdb.com/api/json/v1/1/search.php?s=${userSearchData}`)
        .then(res => res.json()).then( data => {
            
            resultHeading.innerHTML= `<h3>Search Ressults for '${userSearchData}'</h3>`;

            if (data.meals === null) {
                resultHeading.innerHTML = `<p> No Keywords for ' ${userSearchData} '. Please Try Different keyword</p>`
            } 
            else {
                mealsContainer.innerHTML = data.meals.map(meal =>{
                        
                        `<div class="meal" >
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        </div>`
                    }
                )
            }
        });

    } else {

        alert("Please Enter the relevent Keywords")
    }
}




//EventListeners
//1-Search Button
searchBtn.addEventListener("submit" , searchMeal);
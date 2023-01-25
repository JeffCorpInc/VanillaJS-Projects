const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("submit"); 
const randomBtn = document.getElementById("random-btn");
const resultHeading = document.getElementById("result-heading");
const mealContainer = document.getElementById("meals");
const mealsInfo = document.getElementById("meal-info");


//Function to Search Meals
function searchMeal(e){
    
    e.preventDefault();                                                                          //buitl-in feature to prevent page from loading on search
    
    //storing User searched Data
    const term = searchBar.value;                                                                //storing user search data using .value
    
    //Fetching Data using user search
    if (term.trim()) {                                                                           //trim removes whitespaces
        
        //Fetching and displaying data in DOM -- image and info
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json()).then( data => {

                console.log(data);
                resultHeading.innerHTML = `<p>Search Result For '${term}':</p>`                 // showing text below search bar
                if (data.meals === null){
                    resultHeading.innerHTML = `<p>No Result For '${term}'. Try Different Keywords</p>`
                }
                else{
                    mealContainer.innerHTML = data.meals.map( meal =>                           //hamne custom html5 ka ek attribute use kiya or fetched data me se item ki id utha li
                                                                                                 
                         `                               
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <div class="meal-info" data-mealID="${meal.idMeal}">                    
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                        `
                    )
                    .join("");                                                                  //.join will convert array into string with empty strings.
                }
            }
        );

    } else {
        alert("Please Enter the relevent Keywords")
    }

    //clearing search after previous searched
    searchBar.value="";                                                                         //it'll clear search bar after previous searched 
}

//EventListeners

//1-Search Button
searchBtn.addEventListener("submit" , searchMeal);

//2- When clicking on meal 
mealContainer.addEventListener("click", e => {
    const meandetails = e.path.find( item => {
        console.log(item);
    });
});
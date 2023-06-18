//Getting Dom elements

//Card Container
const cardCnt = document.getElementById("card-container");

//navigations
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const currentCard = document.getElementById("current-card");

//Add card Conatiner
const addCardCnt = document.getElementById("add-card-cnt");
const addCardBtn = document.getElementById("add-card-btn");
const closeCard = document.getElementById("close-card");
const answer = document.getElementById("answer");
const question = document.getElementById("question");
const submitQA = document.getElementById("submit-card");
//Clear button
const clearBtn = document.getElementById("clear-btn");



//Current Card on the screen                                             //You can see which card is active on the screen out of total
let ActiveCard = 0;

//Collection of Cards
const CardPool = [];                                                     //we will store our multiple cards here in this array

//Card Data
const cardData = getCardData();

//Functions:

//1 Function to all create card on screen
function cardMakerFunc(){                                                //we will add high order array method on cardData Array to create card multiple time using ForEach             
    cardData.forEach((data,index) => createCard(data,index));            //data ko use krke ham array ke data ko edit karsakte index ko use karke array ke index value ko use kar sakte 
};

//2 function to create a card
function createCard(data,index) {                                        //hamne div banakr class add kardi dono jo html me ki thi or card ka structure banadiya 
    
    //create div and add class for the card
    const cardStructure = document.createElement('div');
    cardStructure.classList.add('card');
    //check for the index 0 and assign class 'active'
    if( index === 0 ){
        cardStructure.classList.add('active');
    }
    //create innerHTML for the card
    cardStructure.innerHTML =
    `
    <div class="card-inner">
        <div class="card-front">
            <p>${data.question}</p>
        </div>
        <div class="card-back">
            <p>${data.answer}</p>
        </div>
    </div>
    `;


    //Eventisteners
    //1 -EventListneres to flip card
    cardStructure.addEventListener('click', () => {
        cardStructure.classList.toggle('show-ans');
    });

    //pushing newly created card into CardPool Array
    CardPool.push(cardStructure)                                        //jab bhi hamara card create hoga multiple time using for each method, card automatically cardpool me push hogae ga 
    //add card to the screen/dom
    cardCnt.appendChild(cardStructure);
    //Display the current card and total no of card available in dom
    updateCurrentCardTextArea();
};

//3 Function to display current card / total card
function updateCurrentCardTextArea(){
    currentCard.innerHTML = `<p>${ActiveCard +1}/${CardPool.length}</p>`
}

//4 Getting card data from local storage 
function  getCardData(){
    
    const cards = JSON.parse(localStorage.getItem('cards'));    //Json.Parse local storage se data lekr use Array me convert kardeta he 
    return cards === null ? [] : cards;                       //hamne condition di agr cardBackup me data null he to empty array return karde warna cardBackup ka data return kare
}


// 5. Function to save card data to local storage
function saveCardData(cards) {
    // Save card data to local storage
    localStorage.setItem('cards', JSON.stringify(cards));
    // Reload window
    window.location.reload();
}


cardMakerFunc();




//2 - Eventlistener for next card button
nextBtn.addEventListener("click", ()=>{
    //hide the current card and move to left
    CardPool[ActiveCard].className = 'card left';                       //className is overwrite hota he 
    //increment to move to next card
    ActiveCard++;
    //to stop Active Card from incrementing again n again we apply this logic
    if (ActiveCard > CardPool.length -1) {
        ActiveCard = CardPool.length -1;
    }
    //display new card
    CardPool[ActiveCard].className = 'card active';
    //update the current card number
    updateCurrentCardTextArea();
})

//3 - Eventlistener for prev card button
prevBtn.addEventListener("click", ()=>{
    //hide the current card and move to left
    CardPool[ActiveCard].className = 'card right';                       //className is overwrite hota he 
    //increment to move to next card
    ActiveCard--;
    //to stop Active Card from incrementing again n again we apply this logic
    if (ActiveCard < 0) {
        ActiveCard = 0;
    }
    //display new card
    CardPool[ActiveCard].className = 'card active';
    //update the current card number
    updateCurrentCardTextArea();
})

//4 EventListener to show window for add card
addCardBtn.addEventListener('click' , () => {
    addCardCnt.classList.add('show');
})

//5 Eventlistener to close the addcardCnt window
closeCard.addEventListener('click' , ()=>{
    addCardCnt.classList.remove('show');
})


// 6. Event Listener for creating a new card
submitQA.addEventListener('click', () => {
    // Get the user inputs from the text fields
    const questionInput = question.value;
    const answerInput = answer.value;
    // Check to make sure inputs are not null
    if ( questionInput.trim() && answerInput.trim() ) {
        // Create a new object using the user inputs
        const newCard = { question: questionInput, answer: answerInput }
        // Using the newCard object, create a card element using the createCard function
        createCard(newCard);
        // Reset form fields
        question.value = '';
        answer.value = '';
        // Hide form after submit
        addCardCnt.classList.remove('show');
        // Add the new card object to the cardsData array
        cardData.push(newCard);
        // Save data to local storage and reload page
        saveCardData(cardData);
    }
})


// 7. Event listener to clear all cards
clearBtn.addEventListener('click', () => {
    // Remove data from local storage
    localStorage.clear();
    // Clear the card container of all contents
    cardCnt.innerHTML = '';
    // Reload the window
    window.location.reload;
    // Update the current card number
    currentCard.innerHTML = `<p></p>`
})
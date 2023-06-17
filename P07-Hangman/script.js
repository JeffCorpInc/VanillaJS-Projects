//getting Element by ID
const words = document.getElementById("word");
const WrongWords = document.getElementById("wrong-letter");
const popup = document.getElementById("popup-container");
const message = document.getElementById("win-lose");
const restart = document.getElementById("reset");
const slider = document.getElementById("sliding-cont");

const hangmanParts = document.querySelectorAll(".skeliton");

//Array Of Words
const wordPool = ["javascript" , "computer" , "germany" , "lamborghini" , "ferarri"];

//Selecting Random word from the pool
let wordSelect = wordPool[Math.floor(Math.random() * wordPool.length)]; 

//array to check the input of the user 
const correctwords = [];       //"a","u","o","i","e","g",
const wrongword = [];


//function to display the the word on the screen
function displayWord(){
    words.innerHTML = ` ${wordSelect.split("").map(                                                   //.map me span ke andr correctwrods arahe hn 
        
        letter => `<span class="letter">${correctwords.includes(letter) ? letter : " " }</span>`      //it return true or false and using turnery opreator we can give condition
        
       ).join('')                                                                                     //it will convert array into string again
    }`;

   const wordTextLetter = words.innerText.replace(/\n/g , " ");                                      //replace(jisko replace krna he , jis se karna he) //(/\n/) new line regex= regular expression
 
   // If you win
   if (wordTextLetter === wordSelect){
    
    message.innerText = 'You Win!';
    popup.style.display ='flex';
   }
};

displayWord();

//function to display notification
function shownotification(){

    slider.classList.add("show");

    setTimeout( ()=> {slider.classList.remove("show");} , 2000);                                    //first value is function and second value is time 
}

//function to update wrong letters
function updatewrongletter(){
    
    //to show the wrong letters
    WrongWords.innerHTML = `${wrongword.length > 0 ? `<p>Wrong Gusses</p>` : ""} ${wrongword.map(
        
            letter => `<span>${letter}</span>`
        
        )
    }`;

    //to show the parts of hangman on every wrong word
    hangmanParts.forEach( (part , index ) => {

            const errors = wrongword.length;
            if (index < errors) {

                part.style.display = 'block';
            }
            else{
                part.style.display = 'none';
            }
        }
    );

    //display popup if lose
    if (wrongword.length === hangmanParts.length) {
        message.innerText = 'You Lost!';
        popup.style.display = 'flex';
    }
}







//event handlers
//1- for keyboard
window.addEventListener("keydown" , e => {                                                          //keydown will return alphabet ascii code

        if (e.key >= 65 && e.key <= 90){
            
            const letter = e.key;                                                                   //.key will return orignal alphabat key
            if (wordSelect.includes(letter)) {                                                      //we'll check if wordselect me letter he ya nhi
                
                if (!correctwords.includes(letter)) {                                               //agr correctletter me letter nhi he to push krdo letter
                    
                    correctwords.push(letter);
                    displayWord();
                }
                else {                                                                              //warna notification show karado
                    shownotification();   
                }
            }
            else{
                if(!wrongword.includes(letter)){
    
                    wrongword.push(letter);
                    updatewrongletter();
                }
                else{
                    shownotification(); 
                }
            }
        }
    }
);

//2- to restart
restart.addEventListener("click" , ()=>{

        //emtying array using splice
        correctwords.splice(0);
        wrongword.splice(0);

        //getting new word from the pool
        wordSelect = wordPool[Math.floor(Math.random() * wordPool.length)]; 

        //clearing the wrong letter div
        updatewrongletter();

        //hide the popup
        popup.style.display = 'none';
    }
)
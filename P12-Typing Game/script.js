//Getting DOM Elements from HTML
const settingBtn = document.getElementById('setting-btn');
const settings = document.getElementById('settings');
const settingForm = document.getElementById('setting-form');
const difficulty = document.getElementById('difficulty');

const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');

const word = document.getElementById('word');
const text = document.getElementById('text');

const endGameCnt = document.getElementById('endgame-cnt');

//List of words
const wordList = [
    'Ephemeral',	'Extravagant',	'Zephyr',	'Scrumptious',	'Quintessential',	'Serendipity',	'Chrysanthemum',	'Nostalgia',	'Pneumonia',	'Anarchy',	'Ophthalmology',	'Hippopotamus',	'Paradox',	'Rhinoceros',	'Rhythm',	'Bouquet',	'Exquisite',	'Absurd',	'Confidential',	'Enigma',	'Euphoria',	'Galaxy',	'Gargoyle',	'Luminous',	'Melancholy',	'Mysterious',	'Oblivion',	'Ornament',	'Prestigious',
];

//Initialize Variables
//1- Initialize word
let randomWord;

//2- Initialize time
let time = 15;

//3- Initialize score
let score = 0;

//4- Initialize difficulty
let Dlevel = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : 'easy';   //do conditions write ki ke agr storage me kuch nhi he to null local storage se write karde warna easy karde

difficulty.value = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : 'easy';

//on page load foucus on text area, it will foucus on the input area
text.focus();

//start countdown
const timeInterval = setInterval(updateTime, 1000);                              //after every second ye updateTime wale function ko edit karta rhe ga 

//functions
//1-To generate random word 
function generateRandomWord(){
    return wordList[ Math.floor(Math.random() * wordList.length) ];              //math.random generate random number in decimal, math.floor round off decimals
}                                                                                //is function se hamne random words generate kiye hein take ek const me store krke dom me show kara sake

//2-function to add random word to dom
function addWordDOM(){
    randomWord = generateRandomWord();                                           //randomword me hamne generateRandomWord ka function add karwadiya or UI me update karwadiya 
    word.innerHTML = randomWord;                    
}


//3-function to update score
function updateScore(){                                                         //hamne score variable me increment karwadiya pehle uske bad dom ko update kardiya incremnet se or listener me call karwadiya
    score++;
    scoreElement.innerHTML = score;
}

//function when time is up
function gameOver(){

    //adding content to endgame container 
    endGameCnt.innerHTML = `
        <h1>Your Time has Over! Try Again</h1>
        <p>Your score is ${score} </p>
        <button onclick="window.location.reload()">Play Again</button> 
    `                                                                          //button will reload the screen

    //display endgame Container
    endGameCnt.style.display = 'flex'
}

//5-function to update time on dom
function updateTime(){
    
    //decrement time by 1sec
    time--;

    //adding to dom
    timeElement.innerHTML = `${time}s`;

    //check if time has expired, clearing it by clearInterval
    if ( time === 0 ){
        clearInterval(timeInterval);

        gameOver();
    }
}

addWordDOM();

//eventlistners
//1- On text input area
text.addEventListener("input",(e)=>{                                             
    
    //getting input from user
    const typedText = e.target.value;

    //Check if word is correct
    if ( typedText === randomWord ){
        
        //dis[laying new word after typing
        addWordDOM();

        //clearing input area after changing word
        e.target.value = '';

        //update score
        updateScore();
      
        //add more time after every correct word based on difficulty
        if (difficulty==="easy") {
            time += 10;
        }
        if (difficulty==="medium") {
            time += 6;
        }
        else {
            time += 4;
        }

        //update time
        updateTime();
    }
    
})

//2- To hide the settings by clicking setting button
settingBtn.addEventListener('click', ()=>{
    settings.classList.toggle('hide');                                  //toggle will change classlist after every click on settings
})

//3- when changing the difficulty setting
settingForm.addEventListener('change', (e)=>{
    const Level = e.target.value;
    localStorage.setItem("difficulty",Level)
})
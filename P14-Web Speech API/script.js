// getting DOM elements

const toggleBtn = document.getElementById("toggle-btn");
const toggledWindow = document.getElementById("custom-text");
const closeBtn = document.getElementById("close-div");
const voiceSelect = document.getElementById("voiceSelect");
const customText = document.getElementById("text-area");
const readBtn = document.getElementById("read-btn");
const main = document.getElementById("main")


// Arrays

// Array 1 
const imgData = [
    {
        image: './images/Angry.jpg',
        text:  'I am feeling Angry'
    },
    {
        image: './images/hungry.jpg',
        text:  'I am feeling Hungry'
    },
    {
        image: './images/laughing.jpg',
        text:  'I am feeling Happy'
    },
    {
        image: './images/running.jpg',
        text:  'I run every morning'
    },
    {
        image: './images/thirsty.jpg',
        text:  'I drink a litre everyday'
    },
];


// Array 2
// array for voices which we will get from API
let vioces = [];

// Creating boxed for every object in the array using ForEach method
imgData.forEach(creatBoxes);



// Functions

//1 Funtion to creat boxes
function creatBoxes(dataOBJ){
    
    //Creating Div for the image grid
    const box = document.createElement('div');
    //getting img and text from the object
    const { image , text } = dataOBJ;
    //creating class on new div
    box.classList.add('box');
    //adding image inside box div
    box.innerHTML =
    `
    <img src="${image}" alt=${text}/>
    <p class="imageInfo">${text}</p>

    `
    //add event for speaking test

    box.addEventListener('click', ()=>{
        setMessage(text);
        speakText();
    })

    // add new box to dom
    main.appendChild(box);
}

// initializze speech synthesis
const message = new SpeechSynthesisUtterance();

// 2 Function to get voice API data and update it to the array
function populateVoiceList(){
    if (typeof speechSynthesis === "undefined") {
      return;
    }
  
    const voices = speechSynthesis.getVoices();
  
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
  
      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }
  
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      document.getElementById("voiceSelect").appendChild(option);
    }
}
  
populateVoiceList();
if (typeof speechSynthesis !== "undefined" && speechSynthesis.onvoiceschanged !== undefined){
    speechSynthesis.onvoiceschanged = populateVoiceList;
};

// 3 Set message for speech synthesis
function setMessage(text){
    message.text = text;
}

// 4 function to speak the text
function speakText(){
    speechSynthesis.speak(message);
}

// // 5 Function to change the new voice
// function setVoice(e){
//     message.voice
// }

// EventListeners


// 1 toggle button -- custom text window popup
toggleBtn.addEventListener('click',() =>{
    toggledWindow.classList.add('show');
})

// 2 toggled window close button
closeBtn.addEventListener('click', ()=>{
    toggledWindow.classList.remove('show');
})

// 3 eventlistener to change voice
speechSynthesis.addEventListener('voiceschanged', populateVoiceList)
// voiceSelect.addEventListener('change', setVoice)

// 4 EventListenere for custon text
readBtn.addEventListener('click', ()=>{
    
    setMessage(customText.value);
    speakText();
})
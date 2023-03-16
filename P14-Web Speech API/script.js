// getting DOM elements

const toggleBtn = document.getElementById("toggle-btn");
const toggledWindow = document.getElementById("custom-text");
const closeBtn = document.getElementById("close-div");
const selectVoices = document.getElementById("voices");
const customText = document.getElementById("text-area");
const readBtn = document.getElementById("read-btn");
const main = document.getElementById("main")

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

// Creating boxed for every object in the array using ForEach method
imgData.forEach(creatBoxes);

// Functions
// Funtion to creat boxes
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
    // add new box to dom
    main.appendChild(box);
}
// getting DOM elements
// Header
const formControl = document.getElementById("form");
const searchBox = document.getElementById('search');
// Results Div
const results = document.getElementById('results');
// Navigation box
const pagination = document.getElementById('pagination');

//Base URL for the api
const api = 'https://api.lyrics.ovh';



// Eventlisteners

// 1- search Box 
formControl.addEventListener('submit', e => {
    //prevent page from reload
    e.preventDefault();

})
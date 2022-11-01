const movieSelect = document.getElementById("movie");
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".seatRows .seat:not(.occupied)");
const count = document.getElementById("count");
const totalPrice = document.getElementById("total");    
const ticketPrices = +totalPrice.value ;                                         //+ will convert the string into number

//EventListner On Container class
container.addEventListener("click",a=>{
console.log("clicked",a.target)
})                                      

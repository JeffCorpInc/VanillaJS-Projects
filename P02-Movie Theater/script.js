const movieSelect = document.getElementById("movie");
const container = document.querySelector("container");
const seats = document.querySelector(".seatRows .seat:not(.occupied)");
const count = document.getElementById("count");
const totalPrice = document.getElementById("total");    
const ticketPrices = +totalPrice.value ;                                         //+ will convert the sring into number

//EventListner On Container class
container.addEventListener("click",function(event){
        console.log(event.target);
    }
)                                          
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".seatRows .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");  
const movieSelect = document.getElementById("Movie");                                           //movieSelect me ham "Movie" id ko save kar rhe hn or ticketPrice me ham movieSelect.value ko save kar rhe 
let ticketPrice = +movieSelect.value;                                                           //+ will convert the string into number

//EventListner On Container class
container.addEventListener("click", e=>{

        if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){    //"classList", list ko show kre gi or "contain" me ham class ko define kare ge to perform task 
           
            e.target.classList.toggle("selected");                                              //2 ways to select - add -  toggle ..toggle will select and deselect but add only add once where remove is used to deselect
            updatingCount();                                                                    //classList me selected name ki class ko add kiya he using toggle 
            
        }                                                                                      
    }
)                                      
//EventListner on Movie select 
movieSelect.addEventListener("change" , e => {                                                  //change dropdown ke liye use kiya jata he..option change pr hame ticketPrice ko change krna he 

        ticketPrice = +e.target.value;                                                          //ticketPrice ko hame update krna he... e.target.value se ham ticketPrice me value get krlenge 
        updatingCount();                                                                        //hame count bhi change krwana tha isliye hamne updatecounting wo wapis call kiya 
    }
)

//function for counts
function updatingCount(){
    
    const seatselected = document.querySelectorAll(".seatRows .seat.selected");                 //ham is syntax me selected seats ko get karna chah rhe hn using querySelector
    const seatcount = seatselected.length;                                                      //nodeList creat hoti he querySelector se
    
    const seatIndex = [...seatselected].map(seat=>{                                            //convering seatSelected NodeList into Array...spread(...)opreator

        return [...seats].indexOf(seat)                                                         //ham seats ko array me return karwa rhe hn 
    })                                                                                          //map is a higher order array method..It execute function on array and also return array                                   
    
    count.innerText = seatcount;                                                                 //count.innerText me pehle 0 tha laikin hamne uski value ko seatcount se change krdiya...jiski waja se count me change aya 
    total.innerText = ticketPrice * seatcount;
}

//
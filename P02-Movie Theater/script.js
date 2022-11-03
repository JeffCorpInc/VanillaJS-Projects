const container = document.querySelector(".container");
const seats = document.querySelectorAll(".seatRows .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");  
const movieSelect = document.getElementById("Movie");                                           //movieSelect me ham "Movie" id ko save kar rhe hn or ticketPrice me ham movieSelect.value ko save kar rhe 
let ticketPrice = +movieSelect.value;                                                           //+ will convert the string into number

populateUI();

//EventListner On """"Container"""" class
container.addEventListener("click", e=>{

        if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){    //"classList", list ko show kre gi or "contain" me ham class ko define kare ge to perform task 
           
            e.target.classList.toggle("selected");                                              //2 ways to select - add -  toggle ..toggle will select and deselect but add only add once where remove is used to deselect
            updatingCount();                                                                    //classList me selected name ki class ko add kiya he using toggle 
        }                                                                                      
    }
)                                      
//EventListner on """"Movie"""" Class
movieSelect.addEventListener("change" , e => {                                                  //change dropdown ke liye use kiya jata he..option change pr hame ticketPrice ko change krna he 

        ticketPrice = +e.target.value;                                                          //ticketPrice ko hame update krna he... e.target.value se ham ticketPrice me value get krlenge 
        updatingCount();                                                                        //hame count bhi change krwana tha isliye hamne updatecounting wo wapis call kiya 
        movieData(e.target.selectedIndex , e.target.value);                                     //selectedIndex is used to return the index of selected item in a dropdown list
    }
)

//Functions to show """""movieData"""""
function movieData (movieIndex , moviePrice){
   
    localStorage.setItem("Movie Selected" , movieIndex);
    localStorage.setItem("Movie Price" , moviePrice);
}


//Pull data from LocalStorage to UI
function populateUI(){

    const UIupdate =JSON.parse(localStorage.getItem("Seats Selected"));                      //json.parse is a inverse of json.stringify..it returns array
    
    if (UIupdate !== null && UIupdate > 0){                                                  //is condition me ham null data nhi lena chah rhe or data 0 se bara ho tab hi return kre values
                                                                      
    }
}

//function for """counts"""
function updatingCount(){
    
    const seatselected = document.querySelectorAll(".seatRows .seat.selected");                 //ham is syntax me selected seats ko get karna chah rhe hn using querySelector
    const seatcount = seatselected.length;                                                      //nodeList create hoti he querySelector se
    
    const seatIndex = [...seatselected].map(seat=>{                                            //converting seatSelected NodeList into Array...spread(...)opreator

        return [...seats].indexOf(seat)                                                         //ham seats ko array me return karwa rhe hn 
    })                                                                                          //map is a higher order array method..It execute function on array and also return array                                   
    
    localStorage.setItem("Seats Selected" , JSON.stringify(seatIndex));                          //"setItem(key, value)" se ham data local storage me save karwate hn.....JSON.stringify array ko string me change krta...ham seatIndex ko string me change kr rhe 

    count.innerText = seatcount;                                                                 //count.innerText me pehle 0 tha laikin hamne uski value ko seatcount se change krdiya...jiski waja se count me change aya 
    total.innerText = ticketPrice * seatcount;
}


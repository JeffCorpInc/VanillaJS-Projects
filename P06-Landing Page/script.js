//getting elements by DOM
const toggle = document.getElementById("toggle");
const openbtn = document.getElementById("open");
const closebtn = document.getElementById("close");
const modalWindow = document.getElementById("modal");

//adding eventListeners
// 1- toggle button 
toggle.addEventListener("click" , () => {

       document.body.classList.toggle("show-nav");
    }
)

// 2- open modal
openbtn.addEventListener("click" , () =>{

        modal.classList.add("show-modal")
    }
)

// 3- close modal
closebtn.addEventListener("click" , () =>{

    modal.classList.remove("show-modal")
    }
)

// 4- close modal 2
window.addEventListener("click" , e =>{

        e.target === modal ? modal.classList.remove("show-modal") : false
    }
)
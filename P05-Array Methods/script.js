//getting Data Usin DOM:
const mainDocs = document.getElementById("main");
const addUser = document.getElementById("add-user");
const doubleMoneyB = document.getElementById("double-money");
const showMillB = document.getElementById("show-mill");
const sortB = document.getElementById("sort");
const totalB = document.getElementById("cal-total");

//Data Array to show names and net wealth
let UserData =[];                                                                                //yaha pr hame fetch kiya wa data show karana he...fetched data ko extract krke 



//function to double the money
function doubleWorth(){                                                                          //it will return the existing array in the form of another array

    UserData = UserData.map( items =>{                                                            //isme ham UserData ke object wealth ko update karahe hn by xing by 2
        
        return {...items, Wealth: items.Wealth *2};                                                //... spread op se hamne itme ko get kiya usme wealth ko update krdiya

    });
    updateData();
}

//function to show only millionaires
function showMills(){
    
    UserData = UserData.filter( items => items.Wealth > 1000000);
    
    updateData();
}

//function to sort the money in ascending order
function sortMoney(){                                                                            //Sort is used to arrange string data alphabatically 

    UserData.sort( (a , b) => b.Wealth - a.Wealth);                                              // a-b increasing order,,,,,b-a decreasing order
    updateData();
}

//function to calculate the total worth of people
function totalWorth(){                                                                           //Reducewill return singal value by reducing array

    const totalNetWorth = UserData.reduce(

        (acc,wor) => (acc += wor.Wealth) , 0
    );
    
    const addNetWorthElement = document.createElement("div");                                    //creating div 
    addNetWorthElement.innerHTML = `<h3>Total Net Worth <strong>${(totalNetWorth)}</strong></h3>`//adding h3 element inside div element
    mainDocs.appendChild(addNetWorthElement);                                                    //adding element inside the mainDocs element in HTML
    
}

//Function to Fetch data (randomuser.me/api)
async function randomuser(){                                                                     //async makes a function to return a promise....similar to .then method 
                                                                                         
    const res = await fetch("https://randomuser.me/api");                                        //await makes a function wait for the promise
    const data = await res.json();                                                               //yaha hamne awati use kiya or fetched data ko wait karwakr const me store krdiya 

    const GetuserData = data.results[0];                                                         //awaiting data me se jo json me store tha waha se hamne or specific data nikala in the form of array
    const newdata = {                                                                            //uske bad hamne GetuserData me se names nikal kr storeUserData me as an object add krdya
        Name:  `${GetuserData.name.first} ${GetuserData.name.last}`,
        Wealth: `${Math.round(Math.random()*1000000)}`
    };
    addData(newdata);
}
randomuser();
randomuser();
randomuser();

//Function to push Data Into USERDATA constant
function addData(newdata){                                                                        //we are adding data using push into our empty array from the fetched data

    UserData.push(newdata);                                                                       //ab data array me store horaha he har fetch ke through..ab hame array ke data 
    updateData();                                                                                 //ko UI me show karana he 
}

//function to update UI
function updateData(showData = UserData){

    mainDocs.innerHTML = '<h2><strong>Names</strong> Net Worth</h2>';
    
    showData.forEach(items => {

        const element = document.createElement("div");                                             //we have created div 
        element.classList.add("name");                                                             //we have assigned div a class called name
        
        element.innerHTML = `<strong>${items.Name}</strong> ${(items.Wealth)}`;                    //element ke andr html add krdi 
        mainDocs.appendChild(element);                                                             //or html ko appendChild ke through mainDocs me switch krdiya
        
    });
}

// function to change the wealth format into real currency format
function CurrFormat(num) {
    return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}



//Event Listeners

//1-add user 
addUser.addEventListener('click', randomuser);

//2-double the money
doubleMoneyB.addEventListener("click" ,doubleWorth);

//3-sort the money
sortB.addEventListener("click" , sortMoney);

//4-show millionaires
showMillB.addEventListener("click" , showMills);

//5-calculate total value
totalB.addEventListener("click" , totalWorth);
const currOne = document.getElementById("C1");
const currTwo = document.getElementById("C2");
const amtOne = document.getElementById("amount-one");
const amtTwo = document.getElementById("amount-two");
const change = document.getElementById("flip");
const rates = document.getElementById("rate");

//functions to fetch data
function fetchData(){                                                                               // we are fetching data through Get method..there is alot of ways to access
    const currCode1 = currOne.value;                                                                //status code 200(satisfied)..300(redirect)...400(error)...500(server side)
    const currCode2 = currTwo.value;                                                                //status code 200(satisfied)..300(redirect)...400(error)...500(server side)
    
    fetch(`https://v6.exchangerate-api.com/v6/b8c1d80deb44994c5a791a29/latest/${currCode1}`)
        .then(res => res.json())
        .then(data => {
            
            //getting data
            const exchangeRates = data.conversion_rates[currCode2];
            //update screen rates
            rates.innerText = `1 ${currCode1} = ${exchangeRates} ${currCode2}`;

            //updating currency two
            amtTwo.value = (amtOne.value * exchangeRates).toFixed(2);                               //tofixed will show only two digits depending on parameter
        });
}                                                                                                    //this is how we fetch data from the file 

function flip(){

    const temp = currOne.value;
    currOne.value = currTwo.value;
    currTwo.value = temp;
}

//event Listeners
currOne.addEventListener("change", fetchData);
currOne.addEventListener("change", fetchData);
amtOne.addEventListener("input", fetchData);
amtTwo.addEventListener("input", fetchData);
change.addEventListener("click" , flip);

fetchData();
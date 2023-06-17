//DOM Elements 

const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");

//Dummy Transactons
const dummyTransactions = [];

let Transactions = dummyTransactions;

//function to update balance, income and expense box
function updateBEI(){

    //create array transaction amount from the trasaction array
    const Arrayamounts = Transactions.map( transaction => transaction.Amount);

    //calculate total balance 
    const total = Arrayamounts.reduce((acc,amount) => (acc += amount), 0).toFixed(2);

    //calculate income
    const income = Arrayamounts.filter(amount => amount > 0).reduce((acc,amount) => (acc += amount), 0).toFixed(2);

    //calculate income
    const expense = Arrayamounts.filter(amount => amount < 0).reduce((acc,amount) => (acc += amount), 0).toFixed(2);

    //update BEI
    balance.innerText = `${total}`
    money_plus.innerText = `${income}`
    money_minus.innerText = `${expense}`
}

//function to remove history
function deleteTransaction(Id){

    Transactions = Transactions.filter( transaction => transaction.Id != Id);
    init();
}

//function to display transaction in transaction history tab 
function addtransactionUI(transaction){
    //classify if expense or income 
    const type = transaction.Amount > 0 ? '+' : '-';                              //using turnery opreator we answer two conditons true and false (true:false) 

    //creating element
    const item = document.createElement('li');

    //adding class
    item.classList.add( transaction.Amount > 0 ? 'plus' : 'minus');

    //adding HTML
    item.innerHTML = `
        ${transaction.description}
        <span>${type}${Math.abs(transaction.Amount)}</span>                      
        <button class="delete-btn" onclick="deleteTransaction(${transaction.Id})">X</button>
    `;                                                                            //Math.abs() will change the sign of the value 

    list.appendChild(item);                                                       //append child is used to display created HTML
};

//function to generate ID
function generateID(){

    return Math.floor(Math.random() * 100000000);                                 //math floor will alwasy round off and return highest integer
}

//function to add new trasaction through form
function addNewtransaction(e){

    e.preventDefault();

    if (description.value.trim() === '' || amount.value.trim() === '' ){
      
        alert("Please enter valid Description and Amount");
    } 
    else {
        const transaction ={
              
            Id: generateID(),
            description: description.value,
            Amount: +amount.value
        }
        
        Transactions.push(transaction);

        addtransactionUI(transaction);
        updateBEI();

        description.value = '';
        amount.value = '';
    };
};


//function to initialize app 
function init(){
    list.innerHTML = "";
    Transactions.forEach(addtransactionUI);
    updateBEI();
    
};
init();

//eventlistner for form submit
form.addEventListener("submit", addNewtransaction);
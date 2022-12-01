//DOM Elements 

const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");

//Dummy Transactons

const dummyTransactions = [
    { Id: 1 , Description: "Salary" , Amount: 125000 },
    { Id: 2 , Description: "Bills" , Amount: -25000 },
    { Id: 3 , Description: "Shopping" , Amount: -40000 },
    { Id: 4 , Description: "profit" , Amount: 50000 }
];
let Transactions = dummyTransactions;

//function to update balance, income and expense box
function updateBEI(){

    //create array transaction amount from the trasaction array
    const Arrayamounts = Transactions.map( transaction => transaction.Amount);
    console.log(Arrayamounts);

    //calculate total balance 
    const total = Arrayamounts.reduce((acc,amount) => (acc += amount), 0).toFixed(2);
    console.log(total);

    //calculate income
    const income = Arrayamounts.filter(amount => amount > 0).reduce((acc,amount) => (acc += amount), 0).toFixed(2);
    console.log(income);                                                           //ye Arrayamounts ko filter karaha he or sirf 0 se bari values ko show karaha he                                                              

    //calculate income
    const expense = Arrayamounts.filter(amount => amount < 0).reduce((acc,amount) => (acc += amount), 0).toFixed(2);
    console.log(expense);

    //update BEI
    balance.innerText = `${total}`
    money_plus.innerText = `${income}`
    money_minus.innerText = `${expense}`
}

//function to display transaction in transaction history tab 
function addtransactionUI(Transactions){
    //classify if expense or income 
    const type = Transactions.Amount > 0 ? "+" : "-";                              //using turnery opreator we answer two conditons true and false (true:false) 

    //creating element
    const item = document.createElement("li");

    //adding class
    item.classList.add( Transactions.Amount > 0 ? "plus" : "minus");

    //adding HTML
    item.innerHTML = `
        ${Transactions.Description}
        <span>${type}${Math.abs(Transactions.Amount)}</span>                      
        <button class="delete-btn">X</button>
    `;                                                                            //Math.abs() will change the sign of the value 

    list.appendChild(item);                                                       //append child is used to display created HTML
};
function generateID(){
    return Math.floor(Math.random() * 10000000);                                  //math floor will alwasy round off and return highest integer
}
//function to generate ID

//function to add new trasaction through form
function addNewtransaction(e){

    e.preventDefault();

    if (description.value.trim() === "" || amount.value.trim() === ""){
      
        alert("Please enter valid Description and Amount");
    } 
    else {
        const Funddetails ={
              
            Id : generateID(),
            Description : description.value,
            Amount : +amount.value
        };
        
        Transactions.push(Funddetails);

        addtransactionUI(Transactions);
        updateBEI();

        description.value ="";
        amount.value="";
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
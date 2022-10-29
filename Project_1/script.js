const form = document.getElementById("JS-control");         //we have stored all input tags into constant variable 
const username = document.getElementById("username");
const email = document.getElementById("email");
const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");

//All Functions

//error function
function showError(input,message){                          //we just created a func. here we'll link it to the event listner to execute it according       
        const AFormControl = input.parentElement;           //.parentElement will trigger us to the parent element of the input tag
        AFormControl.className = "form-control error";
        const small = AFormControl.querySelector("small")
        small.innerText = message                            //innerText and innerHTML are same
}

//success function
function showSuccess(input) {
        const AFormControl = input.parentElement;           //.parentElement will trigger us to the parent element of the input tag
        AFormControl.className = "form-control sucess";
}

//valid email
function emailvalid(input) {                                    //regex regular expression
        const  re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
        if (re.test(input.value.trim())){                        //.test is testing our email
            showSuccess(input);                                  //trim will remove extra spaces etc
        }
        else{
            showError(input, `${getfieldID(input)} is not Valid`)
        }
};
//checkin password match
function PasswordMatch(input1, input2){
    if (input1.value !== input2.value) {
        showError(input2, "Password Don't match");
    }
}
//Fields Checking
function fieldCheck(Array){
        Array.forEach(function(input){                           //forEach is a high order array method

            if (input.value === ""){                            //agr input wala dabba khali ho to show error
                showError(input ,`${getfieldID(input)} is required`);     //it is called template literals .We can use concatenation method as well    
            } else {
                showSuccess(input);
            }

        }
    )
}

//Fields Id showing error message
function getfieldID(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);    
}

//checkinig length
function InputLength(input, min , max){
    if(input.value.length < min){
        showError(input, `${getfieldID(input)} must be ${min} characters`);
    }
    else if(input.value.length >max){
        showError(input, `${getfieldID(input)} must be less than ${max} characters`);
    }
    else{
        showSuccess(input)
    }
}

//event Listener and executioner at "submission"
form.addEventListener("submit" , function(e){

        e.preventDefault();                                     //preventDefault will stop the form from relaoding
        //we can use IF/ELSE method as well
        fieldCheck([username,email,password1,password2]);      //Array 
        InputLength(username,3,10);    
        InputLength(password1,6,20);    
        emailvalid(email);
        PasswordMatch(password1,password2);
        
    }
)
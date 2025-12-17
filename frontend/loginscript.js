
const form = document.getElementById("order-number-form");
const NumInput = document.getElementById("order-number");
const InputButton = document.getElementById("submitbutton");

function VerificarLogin()
{
    let order = NumInput.value;

    switch(order)
    {
        case 21032001:
            console.log("Loading CRUD");
            break;
        default:
            console.log("Loading client page");
          
    }
}

InputButton.addEventListener("click",VerificarLogin);


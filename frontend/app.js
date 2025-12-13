
let button = document.getElementById("Newequipmentbutton");

function showSubmit()
{
    let x = document.getElementById("inputsection hidden");
    console.log("testing");
    if(x.style.display === "none")
    {
        x.style.display = "block";
    }
    else
    {
        x.style.display = "none";
    }
}

button.addEventListener("click",showSubmit);

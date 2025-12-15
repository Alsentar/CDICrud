
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



const form = document.getElementById("formbody");
const entradaInput = document.getElementById("id"); 
const equipoInput = document.getElementById("equipment"); 
const marcaInput = document.getElementById("brand"); 
const modeloInput = document.getElementById("model"); 
const serialInput = document.getElementById("serial"); 

form.addEventListener("submit", function  (e) {
    
    e.preventDefault();

    console.log("El usuario presiono submit");

    const data = {
    entrada: entradaInput.value,
    equipo: equipoInput.value,
    marca: marcaInput.value,
    modelo: modeloInput.value,
    serial: serialInput.value,
    estado: "recibido"
};


    fetch("http://localhost:3000/api/equipos", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
});

console.log(data);

const tbody = document.getElementById("equipos-body");



const databack = fetch("http://localhost:3000/api/equipos", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
    
});


});





const entradaNumero = document.getElementById("entradanumero");
const nombreEquipo = document.getElementById("nombreEquipo");
const nombreMarca = document.getElementById("nombreMarca");
const nombreModelo = document.getElementById("nombreModelo");
const codigoSerial = document.getElementById("codigoSerial");
const estadoEquipo = document.getElementById("estadoEquipo");

const form = document.getElementById("ordernumberinform");
const consultInput = document.getElementById("consultinput");

async function cargarEquipo(entradaid)
{
    //logica

    if(!entradaid) return;

    try{

        const response = await fetch(`/api/equipos/${entradaid}`);

        if(!response.ok){
            throw new Error("Equipo no encontrado");
        }

        const data = await response.json();

        entradaNumero.textContent = data.entradaid;
        nombreEquipo.textContent = data.equipo;
        nombreMarca.textContent = data.marca;
        nombreModelo.textContent = data.modelo;
        codigoSerial.textContent = data.numeroserial;
        estadoEquipo.textContent = data.estado;



    }
    catch(error)
    {
        console.error("Error al cargar equipo: ", error);
        alert("No se encontro informacion para esa entrada");

    }
}


document.addEventListener("DOMContentLoaded", () => {
    
    const params = new URLSearchParams(window.location.search);
    const entrada = params.get("entrada");

    if(entrada)
    {
        cargarEquipo(entrada);
    }
});

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const nuevaEntrada = consultInput.value.trim();

    if(!nuevaEntrada){
        alert("Ingrese un numero de entrada");
        return;
    }

    cargarEquipo(nuevaEntrada);
    consultInput.value = "";
})
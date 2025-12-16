

let button = document.getElementById("Newequipmentbutton");

function showSubmit() {
    let x = document.getElementById("inputsection hidden");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

button.addEventListener("click", showSubmit);

const form = document.getElementById("formbody");
const entradaInput = document.getElementById("id");
const equipoInput = document.getElementById("equipment");
const marcaInput = document.getElementById("brand");
const modeloInput = document.getElementById("model");
const serialInput = document.getElementById("serial");
const tbody = document.getElementById("equipos-body");

document.addEventListener("DOMContentLoaded", cargarEquipos);

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
        entrada: entradaInput.value,
        equipo: equipoInput.value,
        marca: marcaInput.value,
        modelo: modeloInput.value,
        serial: serialInput.value,
        estado: "recibido"
    };

    await fetch("http://localhost:3000/api/equipos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    await cargarEquipos();
});

async function cargarEquipos() {
    const response = await fetch("http://localhost:3000/api/equipos");
    const data = await response.json();

    tbody.innerHTML = "";

    data.forEach(equipo => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${equipo.entradaid}</td>
            <td>${equipo.equipo}</td>
            <td>${equipo.marca}</td>
            <td>${equipo.modelo}</td>
            <td>${equipo.numeroserial}</td>
            <td>${equipo.estado}</td>
        `;

        tbody.appendChild(row);
    });
}

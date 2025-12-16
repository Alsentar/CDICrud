

let button = document.getElementById("Newequipmentbutton");

function showSubmit() {
    let x = document.getElementById("inputsection");
    if (x.style.display === "none") {
        x.style.display = "flex";
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
    form.reset();
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
            <td>
                <select data-id="${equipo.entradaid}">
                    <option value="recibido" ${equipo.estado === "recibido" ? "selected" : ""}>Recibido</option>
                    <option value="diagnostico" ${equipo.estado === "diagnostico" ? "selected" : ""}>Diagnóstico</option>
                    <option value="reparacion" ${equipo.estado === "reparacion" ? "selected" : ""}>Reparación</option>
                    <option value="listo" ${equipo.estado === "listo" ? "selected" : ""}>Listo</option>
                </select>
            </td>
            <td>
                <button type="button" data-id="${equipo.entradaid}" class="delete-btn">Eliminar</button>
            </td>
        `;

        tbody.appendChild(row);
    });

    activarEventosEstado();
    activarEventosDelete();
}


function activarEventosEstado()
{
    document.querySelectorAll("select[data-id]").forEach(select => {
        //
        select.addEventListener("change", async function () {

            const id = this.dataset.id;
            const estado = this.value;

            await fetch(`http://localhost:3000/api/equipos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ estado })
            });
        });
    });
}

function activarEventosDelete()
{
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", async function () {

            console.log("Debug: Detectado el event listener");

            const id = this.dataset.id;

            await fetch(`http://localhost:3000/api/equipos/${id}`, {
                method: "DELETE"
            });



            await cargarEquipos();

            console.log("Debug: Equipos cargados");
        });
    });
}



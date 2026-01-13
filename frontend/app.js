


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

const nombreInput = document.getElementById("clientname");
const empresaInput = document.getElementById("clientcompany");
const rncInput = document.getElementById("RNC");
const phoneInput = document.getElementById("clientphone");
const mailInput = document.getElementById("clientmail");
const accsInput = document.getElementById("accesories");


document.addEventListener("DOMContentLoaded", cargarEquipos);

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
        entrada: entradaInput.value,
        equipo: equipoInput.value,
        marca: marcaInput.value,
        modelo: modeloInput.value,
        serial: serialInput.value,
        accesorios: accsInput.value,
        nombre: nombreInput.value,
        empresa: empresaInput.value,
        rnc: rncInput.value,
        phone: phoneInput.value,
        mail: mailInput.value,
        estado: "recibido"
    };

    try {
        //logica
        const response = await fetch("/api/equipos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        });

        if (!response.ok)
        {
            throw new Error("Error al crear la entrada");
        }

        const result = await response.json();

        //descargar word

        const entradaId = result.entradaId;

        window.location.href = `/api/equipos/${entradaId}/documento`;


        //actualizar UI
        await cargarEquipos();
        form.reset();
    }
    catch(error)
    {
        //logica
        console.error(error);
        alert("Error al registrar la entrada");
    }

});

async function cargarEquipos() {
    const response = await fetch("/api/equipos");
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
                <button type="button" data-id="${equipo.entradaid}" class="upload-btn">Subir Cert.</button>
                <input type="file" class="file-input" accept=".doc,.docx,.pdf" hidden />
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

            await fetch(`/api/equipos/${id}`, {
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

            await fetch(`/api/equipos/${id}`, {
                method: "DELETE"
            });



            await cargarEquipos();

            console.log("Debug: Equipos cargados");
        });
    });
}


document.addEventListener("click", function (e) {
        if (e.target.classList.contains("upload-btn")) {
        const entradaId = e.target.dataset.id;

        // buscar el input file hermano
        const fileInput = e.target.nextElementSibling;

        // guardar el id temporalmente
        fileInput.dataset.entradaId = entradaId;

        // abrir selector de archivos
        fileInput.click();
        }
    });

    document.addEventListener("change", async function (e) {
        if (e.target.classList.contains("file-input")) {
            const file = e.target.files[0];
            const entradaId = e.target.dataset.entradaId;

            if (!file) return;

            // Validación básica
            const allowedTypes = [
              "application/pdf",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ];

            if (!allowedTypes.includes(file.type)) {
                alert("Solo se permiten archivos PDF o Word");
                return;
            }

            await uploadCertificado(entradaId, file);

            // limpiar input
            e.target.value = "";
        }
    });

    async function uploadCertificado(entradaId, file) {
        const formData = new FormData();
        formData.append("certificado", file);

        try {
            const response = await fetch(`/api/equipos/${entradaId}/certificado`,
            {
              method: "POST",
              body: formData
            }
            );

            if (!response.ok) {
            throw new Error("Error al subir el certificado");
            }

            alert("Certificado subido correctamente");

        } catch (error) {
        console.error(error);
        alert("No se pudo subir el certificado");
       }
    }  


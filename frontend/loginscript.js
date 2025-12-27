
const form = document.getElementById("order-number-form");
const NumInput = document.getElementById("order-number");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const numero = NumInput.value.trim();

    if(!numero){
        alert("Por favor ingrese un numero");
        return;
    }

    try{
        const response = await fetch("/api/consultar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ numero })
        });

        const data = await response.json();

        if (data.tipo === "empleado")
        {
            window.location.href = "crud.html";
            return;
        }

        if (data.tipo === "orden")
        {
            window.location.href = `consultPage.html?entrada=${data.entradaid}`;
            return;
        }

        if (data.error)
        {
            alert("Numero no encontrado");
        }

    }
    catch(error){

        console.error("Error al verificar numero: ", error);
        alert("Error de conexion con el servidor");

    }
});


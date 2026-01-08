
const kmzInput = document.getElementById("kmzInput");
const processBtn = document.getElementById("processBtn");

const areaSpan = document.getElementById("area");
const distanceSpan = document.getElementById("distance");
//const gasSpan = document.getElementById("gas");
const priceSpan = document.getElementById("price");

const resultsCard = document.getElementById("results");
const quoteBtn = document.getElementById("quoteBtn");

// Santo Domingo coords (lon, lat)
const santoDomingo = [-69.9312, 18.4861];

// Variables to store values for backend
let areaValue, distanceValue;
let gasValue, finalPriceValue;

/* ------------------------------------------
   Extract KML from KMZ
-------------------------------------------*/
async function extractKmlFromKmz(arrayBuffer) {
    const zip = await JSZip.loadAsync(arrayBuffer);

    // Find the first .kml file in the KMZ
    const kmlFile = Object.keys(zip.files).find(path => path.endsWith(".kml"));

    if (!kmlFile) {
        throw new Error("No KML file found in KMZ.");
    }

    // Extract the KML file content as text
    return await zip.files[kmlFile].async("text");
}

/* ------------------------------------------
   MAIN PROCESS BUTTON (CALCULATE)
-------------------------------------------*/
processBtn.addEventListener("click", async () => {
    try {
        if (!kmzInput.files.length) {
            alert("Please upload a KMZ file.");
            return;
        }

        const file = kmzInput.files[0];
        const arrayBuffer = await file.arrayBuffer();

        // Step 1: Extract KML
        const kmlText = await extractKmlFromKmz(arrayBuffer);

        // Step 2: Convert KML to XML and into GeoJSON
        const parser = new DOMParser();
        const kmlDom = parser.parseFromString(kmlText, "text/xml");

        const geojson = toGeoJSON.kml(kmlDom);

        if (!geojson.features.length) {
            alert("No polygon or geometry found in KMZ.");
            return;
        }

        const polygon = geojson.features[0];

        // Step 3: Area (m²)
        const areaSqMeters = turf.area(polygon);

        // Step 4: Centroid
        const centroid = turf.center(polygon).geometry.coordinates;

        // Step 5: Distance from Santo Domingo
        const distanceKm = turf.distance(santoDomingo, centroid, { units: "kilometers" });

        // Step 6: Gas Cost
        const roundTripKm = distanceKm * 2;
        const gallons = roundTripKm / 45;
        const gasCost = gallons * 300;

        // Step 7: Final Price
        const basePrice = areaSqMeters + gasCost;
        const finalPrice = basePrice * 1.27 * 1.35;

        // Store values for backend
        areaValue = Math.round(areaSqMeters);
        distanceValue = distanceKm;
        gasValue = Math.round(gasCost);
        finalPriceValue = Math.round(finalPrice);

        // Step 8: Display results
        areaSpan.textContent = areaValue.toLocaleString();
        distanceSpan.textContent = distanceValue.toFixed(2);
        //gasSpan.textContent = gasValue.toLocaleString();
        priceSpan.textContent = finalPriceValue.toLocaleString();

        resultsCard.classList.remove("hidden");
        quoteBtn.classList.remove("hidden");

    } catch (err) {
        console.error(err);
        alert("Error processing KMZ file: " + err.message);
    }
});

/* ------------------------------------------
   SHOW CONTACT FORM AFTER CLICKING BUTTON
-------------------------------------------*/
quoteBtn.addEventListener("click", () => {
    document.getElementById("contact-section").classList.remove("hidden");
    quoteBtn.classList.add("hidden");
});

/* ------------------------------------------
   FORM SUBMISSION TO BACKEND
-------------------------------------------*/
document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        // 1. Collect info for DB
        const nombre_cliente = document.getElementById("firstName").value;
        const empresa = document.getElementById("company").value;
        const telefono = document.getElementById("phone").value;
        const correo = document.getElementById("email").value;
        const area_lev = areaValue;
        const dist_off = distanceValue;
        const costo_final = finalPriceValue;
        

        // 2. Send USER to backend
        const userRes = await fetch("/api/cotizar/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre_cliente,
                empresa,
                telefono,
                correo,
                area_lev,
                dist_off,
                costo_final
            }) //nombre_cliente,empresa,telefono,correo,area_lev,dist_off,costo_final
        });

        const userData = await userRes.json();
        if (!userData.success) {
            alert("Error guardando información del cliente.");
            return;
        }

        
        // 4. Show success message
        document.getElementById("successMessage").classList.remove("hidden");

    } catch (err) {
        console.error("Error sending data:", err);
        alert("Hubo un error al enviar la cotización.");
    }
});

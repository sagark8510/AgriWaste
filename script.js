// ========================================
// AgriWaste - Main JavaScript
// ========================================


// Get all saved produce
function getProduceData() {
    const data = localStorage.getItem("agriWasteProduce");

    if (data) {
        return JSON.parse(data);
    }

    return [];
}


// Save produce
function saveProduceData(produce) {
    const existingData = getProduceData();

    existingData.push(produce);

    localStorage.setItem(
        "agriWasteProduce",
        JSON.stringify(existingData)
    );
}


// Clear all saved produce
function clearProduceData() {
    localStorage.removeItem("agriWasteProduce");
}


// ========================================
// Add Produce Form
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    if (!form) {
        return;
    }


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        // Get all input and select fields
        const fields = form.querySelectorAll("input, select");


        // Our Add Produce form has 9 fields
        const crop = fields[0].value;
        const quantity = fields[1].value;
        const unit = fields[2].value;
        const harvestDate = fields[3].value;
        const storage = fields[4].value;
        const temperature = fields[5].value;
        const humidity = fields[6].value;
        const quality = fields[7].value;
        const action = fields[8].value;


        // Check required fields
        if (
            !crop ||
            !quantity ||
            !unit ||
            !harvestDate ||
            !storage ||
            !temperature ||
            !humidity ||
            !quality ||
            !action
        ) {
            alert("Please fill in all the fields.");
            return;
        }


        // Create produce object
        const produce = {

            id: Date.now(),

            crop: crop,

            quantity: Number(quantity),

            unit: unit,

            harvestDate: harvestDate,

            storage: storage,

            temperature: Number(temperature),

            humidity: Number(humidity),

            quality: quality,

            action: action,

            createdAt: new Date().toISOString()

        };


        // Save the produce
        saveProduceData(produce);


        // Confirmation
        alert(
            "Produce added successfully! 🌱"
        );


        // Open risk analysis page
        window.location.href = "risk-analysis.html";

    });

});
// ========================================
// Waste Risk Calculation
// ========================================

function calculateRisk(produce) {

    let score = 0;


    // Temperature factor
    if (produce.temperature > 35) {
        score += 30;
    } else if (produce.temperature > 30) {
        score += 20;
    } else if (produce.temperature > 25) {
        score += 10;
    }


    // Humidity factor
    if (produce.humidity > 80) {
        score += 30;
    } else if (produce.humidity > 70) {
        score += 20;
    } else if (produce.humidity > 60) {
        score += 10;
    }


    // Quality factor
    if (produce.quality === "Poor") {
        score += 25;
    } else if (produce.quality === "Average") {
        score += 15;
    }


    // Storage factor
    if (
        produce.storage === "Open / No Storage" ||
        produce.storage === "Other"
    ) {
        score += 15;
    } else if (produce.storage === "Warehouse") {
        score += 5;
    }


    // Keep score between 0 and 100
    score = Math.min(score, 100);


    // Determine risk level
    let level;

    if (score < 35) {
        level = "Low";
    } else if (score < 65) {
        level = "Medium";
    } else {
        level = "High";
    }


    return {
        score: score,
        level: level
    };
}

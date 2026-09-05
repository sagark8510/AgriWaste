// ================================
// AgriWaste - Main JavaScript File
// ================================

// Get all saved produce
function getProduceData() {
    const data = localStorage.getItem("agriWasteProduce");

    if (data) {
        return JSON.parse(data);
    }

    return [];
}


// Save produce data
function saveProduceData(produce) {
    const existingData = getProduceData();

    existingData.push(produce);

    localStorage.setItem(
        "agriWasteProduce",
        JSON.stringify(existingData)
    );
}


// Clear all produce data
function clearProduceData() {
    localStorage.removeItem("agriWasteProduce");
}

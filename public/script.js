let eloChart = null;

// Categorization Map
const CATEGORIES = {
    "Performance": ["highestRating", "lowestRating", "currentRating", "averageElo", "eloChange"],
    "Game Results": ["totalGames", "wins", "losses", "draws", "winRate"],
    "Skill Metrics": ["accuracy", "averageAccuracy", "brilliantMoves", "bestWin"]
};

const formatKey = (key) => key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

function goToSearch() {
    document.getElementById("name").value = "";
    document.getElementById("mainOption").selectedIndex = 0;
    resetAll();
    document.getElementById("resultsPage").style.display = "none";
    document.getElementById("searchPage").style.display = "flex";
}

function resetAll() {
    document.getElementById("subOptionsContainer").innerHTML = "";
    document.getElementById("submitContainer").innerHTML = "";
    const errorDiv = document.getElementById("errorMessage");
    if (errorDiv) { errorDiv.style.display = "none"; errorDiv.textContent = ""; }
}

function showSubOptions() {
    resetAll();
    const mainOption = document.getElementById("mainOption")?.value;
    if (!mainOption) return;

    const container = document.getElementById("subOptionsContainer");
    const label = document.createElement("label");
    label.textContent = mainOption + " Amount";

    const select = document.createElement("select");
    select.id = "subSelect";

    let options = (mainOption === "Days") ? [1, 3, 7, 14, 21, 30] : 
                  (mainOption === "Months") ? [1, 2, 3, 6, 9, 12] : 
                  Array.from({length: 5}, (_, i) => new Date().getFullYear() - i);

    options.forEach(val => {
        const opt = document.createElement("option");
        opt.value = val; opt.textContent = val;
        select.appendChild(opt);
    });

    container.append(label, select);
    const btn = document.createElement("button");
    btn.textContent = "Analyze Statistics";
    btn.onclick = (e) => handleSubmit(e);
    document.getElementById("submitContainer").appendChild(btn);
}

async function handleSubmit(event) {
    event.preventDefault();
    const btn = event.target;
    const originalText = btn.textContent;
    const name = document.getElementById("name")?.value.trim();
    const mainOption = document.getElementById("mainOption")?.value;
    const subOption = document.getElementById("subSelect")?.value;

    if (!name) { showError("Παρακαλώ εισάγετε Username."); return; }

    btn.disabled = true;
    btn.textContent = "Searching...";

    try {
        const response = await fetch("/statistics", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: name, main: mainOption, sub: subOption }),
        });

        const data = await response.json();

        if (data.type === "Failure") {
            showError(data.message);
        } else {
            document.getElementById("searchPage").style.display = "none";
            document.getElementById("resultsPage").style.display = "flex";
            updateChart(data.allElo);
            displayOtherStats(data);
        }
    } catch (err) {
        showError("Σφάλμα σύνδεσης με τον διακομιστή.");
    } finally {
        btn.disabled = false;
        btn.textContent = originalText;
    }
}

function displayOtherStats(results) {
    const container = document.getElementById("statsContainer");
    if (!container) return;
    container.innerHTML = "";

    const usedKeys = ["allElo", "type", "message"];

    // Render defined categories
    Object.entries(CATEGORIES).forEach(([catName, keys]) => {
        const stats = Object.entries(results).filter(([key]) => keys.includes(key));
        if (stats.length > 0) {
            renderCategoryRow(container, catName, stats);
            stats.forEach(([k]) => usedKeys.push(k));
        }
    });

    // Render any remaining data
    const leftovers = Object.entries(results).filter(([key]) => !usedKeys.includes(key));
    if (leftovers.length > 0) renderCategoryRow(container, "Additional Info", leftovers);
}

function renderCategoryRow(parent, title, stats) {
    const row = document.createElement("div");
    row.className = "category-row fade";
    row.innerHTML = `<div class="category-title">${title}</div>`;
    
    const grid = document.createElement("div");
    grid.className = "stats-grid";

    stats.forEach(([key, value]) => {
        const isPct = /Percentage|Winrate|Accuracy/i.test(key);
        grid.innerHTML += `
            <div class="stat-item">
                <div class="stat-label">${formatKey(key)}</div>
                <div class="stat-value" style="color: ${isPct ? 'var(--primary)' : 'white'}">
                    ${value}${isPct ? '%' : ''}
                </div>
            </div>`;
    });

    row.appendChild(grid);
    parent.appendChild(row);
}

function updateChart(dataPoints) {
    const canvas = document.getElementById("eloChart");
    if (eloChart) eloChart.destroy();
    eloChart = new Chart(canvas.getContext("2d"), {
        type: "line",
        data: {
            labels: dataPoints.map((_, i) => i + 1),
            datasets: [{
                label: "Elo Rating",
                data: dataPoints,
                borderColor: "#81b64c",
                backgroundColor: "rgba(129, 182, 76, 0.1)",
                borderWidth: 3,
                fill: true,
                tension: 0.3,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#aaa" } },
                x: { display: false }
            }
        }
    });
}

function showError(msg) {
    const errorDiv = document.getElementById("errorMessage");
    if (errorDiv) { errorDiv.textContent = msg; errorDiv.style.display = "block"; }
}

document.getElementById("mainOption")?.addEventListener("change", showSubOptions);
document.getElementById("backBtn")?.addEventListener("click", goToSearch);
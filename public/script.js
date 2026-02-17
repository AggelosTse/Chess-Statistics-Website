let eloChart = null;

const CATEGORIES = {
    "Accuracy Metrics": ["GeneralAverageAccuracy", "WhiteAverageAccuracy", "BlackAverageAccuracy"],
    "General Game Data": ["totalGames", "AverageSumOfMoves ", "maxPlayerElo"],
    "Opponent Data": ["averageOpponentElo", "highestOpponentEloPlayed", "highestOpponentEloWon"],
    "Wins": ["wonByCheckMate", "wonByResignation", "wonByTimeout"],
    "Win Probabilities": ["wonByCheckmatePercentage", "wonByResignationPercentage", "wonByTimeoutPercentage"],
    "Losses": ["loseByCheckmates", "loseByResignation", "loseByTimeout"],
    "Loss Probabilities": ["loseByCheckmatesPercentage", "loseByResignationPercentage", "loseByTimeoutPercentage"],
    "Draws": ["drawByStalemate", "drawByAgreement", "drawByRepetition", "drawByInsufficient"],
    "Draw Probabilities": ["drawByStalematePercentage", "drawByAgreementPercentage", "drawByRepetitionPercentage", "drawByInsufficientPercentage"],
    "Opening Analytics (White)": ["WhiteMostCommonOpening", "WhiteCommonOpeningCounter", "WhiteCommonOpeningWinrate"],
    "Opening Analytics (Black)": ["BlackMostCommonOpening", "BlackCommonOpeningCounter", "BlackCommonOpeningWinrate"],
    "Performance Streaks": ["WinStreak", "DrawStreak", "LoseStreak"]
};

const formatKey = (key) => key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim();

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
    } catch (err) { showError("Σφάλμα σύνδεσης."); }
    finally { btn.disabled = false; btn.textContent = "Analyze Statistics"; }
}

function displayOtherStats(results) {
    const container = document.getElementById("statsContainer");
    if (!container) return;
    container.innerHTML = "";
    const usedKeys = ["allElo", "type", "message"];

    Object.entries(CATEGORIES).forEach(([catTitle, keys]) => {
        const stats = Object.entries(results).filter(([key]) => keys.includes(key.trim()));
        if (stats.length > 0) {
            renderCategoryRow(container, catTitle, stats);
            stats.forEach(([k]) => usedKeys.push(k.trim()));
        }
    });

    const leftovers = Object.entries(results).filter(([key]) => !usedKeys.includes(key.trim()));
    if (leftovers.length > 0) renderCategoryRow(container, "Additional Insights", leftovers);
}

function renderCategoryRow(parent, title, stats) {
    const row = document.createElement("div");
    row.className = "category-row fade";
    row.innerHTML = `<div class="category-title"><span></span>${title}</div>`;
    const grid = document.createElement("div");
    grid.className = "stats-grid";

    stats.forEach(([key, value]) => {
        const lowerKey = key.toLowerCase();
      
        const isPct = lowerKey.includes("percentage") || lowerKey.includes("winrate") || lowerKey.includes("accuracy");
        
        let valColor = "white";

       
        if (lowerKey.includes("won") || lowerKey.includes("win")) {
            valColor = "var(--primary)"; // Green
        } else if (lowerKey.includes("lose") || lowerKey.includes("loss")) {
            valColor = "var(--error)";   // Red
        } else if (lowerKey.includes("draw")) {
            valColor = "var(--draw)";    // Gray
        }

        grid.innerHTML += `
            <div class="stat-item">
                <div class="stat-label">${formatKey(key)}</div>
                <div class="stat-value" style="color: ${valColor}">
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
                tension: 0.3
            }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });
}

function showError(msg) {
    const errorDiv = document.getElementById("errorMessage");
    if (errorDiv) { errorDiv.textContent = msg; errorDiv.style.display = "block"; }
}

document.getElementById("mainOption")?.addEventListener("change", showSubOptions);
document.getElementById("backBtn")?.addEventListener("click", goToSearch);
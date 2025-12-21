import { nextPhase } from '../utils.js';

let eloChart = null;

function resetAll() {
    document.getElementById("subOptionsContainer").innerHTML = "";
    document.getElementById("submitContainer").innerHTML = "";
    document.getElementById("resultsContainer").style.display = "none";
}

function showSubOptions() {
    resetAll();
    const mainOption = document.getElementById("mainOption").value;
    if (!mainOption) return;

    const container = document.getElementById("subOptionsContainer");
    const label = document.createElement("label");
    label.textContent = mainOption + " Amount";
    label.classList.add("fade");

    const select = document.createElement("select");
    select.id = "subSelect";
    select.classList.add("fade");

    let options = [];
    if (mainOption === "Days") options = [1, 3, 7, 14, 21, 30];
    else if (mainOption === "Months") options = [1, 2, 3, 6, 9, 12];
    else if (mainOption === "Years") {
        const currentYear = new Date().getFullYear();
        for(let i=0; i<5; i++) options.push(currentYear - i);
    }

    options.forEach(val => {
        const opt = document.createElement("option");
        opt.value = val;
        opt.textContent = val;
        select.appendChild(opt);
    });

    container.appendChild(label);
    container.appendChild(select);

    const btn = document.createElement("button");
    btn.textContent = "Submit";
    btn.className = "button fade";
    btn.onclick = handleSubmit;
    document.getElementById("submitContainer").appendChild(btn);
}

async function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const mainOption = document.getElementById("mainOption").value;
    const subOption = parseInt(document.getElementById("subSelect")?.value || "0");

    if (!name) return alert("Enter username");

    const results = await nextPhase(name, mainOption, subOption);
    
    // Εμφάνιση Container
    const container = document.getElementById("resultsContainer");
    container.style.display = "block";
    container.scrollIntoView({ behavior: 'smooth' });

    // 1. Δημιουργία Γραφήματος (allElo)
    updateChart(results.allElo);

    // 2. Εμφάνιση Υπόλοιπων Stats
    displayOtherStats(results);
}

function updateChart(dataPoints) {
    const ctx = document.getElementById('eloChart').getContext('2d');
    if (eloChart) eloChart.destroy();

    eloChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataPoints.map((_, i) => i + 1),
            datasets: [{
                label: 'Rating Evolution',
                data: dataPoints,
                borderColor: '#5f5df0',
                backgroundColor: 'rgba(95, 93, 240, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4, // Smooth line
                pointRadius: 2
            }]
        },
        options: {
            responsive: true,
            animation: { duration: 1500, easing: 'easeOutQuart' },
            scales: {
                y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                x: { ticks: { color: '#fff' }, grid: { display: false } }
            },
            plugins: { legend: { labels: { color: '#fff' } } }
        }
    });
}

function displayOtherStats(results) {
    const grid = document.getElementById("statsGrid");
    grid.innerHTML = "";

    Object.entries(results).forEach(([key, value]) => {
        if (key === "allElo") return; // Παράλειψη του array για το γράφημα

        const statCard = document.createElement("div");
        statCard.className = "card fade";
        statCard.style.width = "auto";
        statCard.style.margin = "0";
        
        // Formatting του Key (π.χ. winStreak -> Win Streak)
        const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        
        statCard.innerHTML = `
            <div style="font-size: 12px; opacity: 0.6;">${formattedKey}</div>
            <div style="font-size: 18px; font-weight: bold; color: #5f5df0; margin-top: 5px;">${value}</div>
        `;
        grid.appendChild(statCard);
    });
}

document.getElementById("mainOption").addEventListener("change", showSubOptions);
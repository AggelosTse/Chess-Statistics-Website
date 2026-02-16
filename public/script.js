let eloChart = null;

function resetAll() {
    document.getElementById("subOptionsContainer").innerHTML = "";
    document.getElementById("submitContainer").innerHTML = "";
    document.getElementById("resultsContainer").style.display = "none";
    const errorDiv = document.getElementById("errorMessage");
    if (errorDiv) {
        errorDiv.style.display = "none";
        errorDiv.textContent = "";
    }
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
    btn.textContent = "Analyze Statistics";
    btn.className = "fade";
    btn.onclick = handleSubmit;
    document.getElementById("submitContainer").appendChild(btn);
}

async function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const mainOption = document.getElementById("mainOption").value;
    const subOption = parseInt(document.getElementById("subSelect")?.value || "0");
    const errorDiv = document.getElementById("errorMessage");
    const resultsContainer = document.getElementById("resultsContainer");

    if (!name) {
        showError("Please enter a username.");
        return;
    }

    const userInfo = { username: name, main: mainOption, sub: subOption };

    try {
        const response = await fetch("/statistics", {
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(userInfo)
        });

        const data = await response.json();

        if (data.type === "Failure") {
            resultsContainer.style.display = "none";
            showError(data.message || "An error occurred fetching data.");
            return;
        }

        errorDiv.style.display = "none";
        resultsContainer.style.display = "block";
        resultsContainer.scrollIntoView({ behavior: 'smooth' });

        updateChart(data.allElo);
        displayOtherStats(data);

    } catch (err) {
        showError("Server connection failed.");
    }
}

function showError(msg) {
    const errorDiv = document.getElementById("errorMessage");
    errorDiv.textContent = msg;
    errorDiv.style.display = "block";
    errorDiv.classList.remove("fade");
    void errorDiv.offsetWidth; 
    errorDiv.classList.add("fade");
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
                borderColor: '#81b64c',
                backgroundColor: 'rgba(129, 182, 76, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.3,
                pointRadius: 3,
                pointBackgroundColor: '#81b64c'
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#fff' } } },
            scales: {
                y: { ticks: { color: '#aaa' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { ticks: { color: '#aaa' }, grid: { display: false } }
            }
        }
    });
}

function displayOtherStats(results) {
    const grid = document.getElementById("statsGrid");
    grid.innerHTML = "";

    Object.entries(results).forEach(([key, value]) => {
      
        if (key === "allElo" || key === "type" || key === "message") return; 

        const statCard = document.createElement("div");
        statCard.className = "stat-item fade";
        
        const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        const isPercentage = /Percentage|Accuracy|Winrate/i.test(key);
        const displayValue = isPercentage ? `${value}%` : value;

        statCard.innerHTML = `
            <div style="font-size: 12px; opacity: 0.7; text-transform: uppercase;">${formattedKey}</div>
            <div style="font-size: 22px; font-weight: bold; color: var(--primary); margin-top: 5px;">${displayValue}</div>
        `;
        grid.appendChild(statCard);
    });
}

document.getElementById("mainOption").addEventListener("change", showSubOptions);
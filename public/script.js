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

    const userInfo = {
        username: name,
        main: mainOption,
        sub: subOption
    };

    const response = await fetch("/statistics",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(userInfo)
        })
    
    if(!response.ok){
        console.error("failed");
    }
    const data = response.json();
    

    
    const container = document.getElementById("resultsContainer");
    container.style.display = "block";
    container.scrollIntoView({ behavior: 'smooth' });

    updateChart(results.allElo);
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
                tension: 0.4,
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
        if (key === "allElo") return; 

        const statCard = document.createElement("div");
        statCard.className = "card fade";
        statCard.style.width = "auto";
        statCard.style.margin = "0";
        
   
        const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
     
        const isPercentage = /Percentage|Accuracy|Winrate/i.test(key);
        const displayValue = isPercentage ? `${value}%` : value;

        statCard.innerHTML = `
            <div style="font-size: 11px; opacity: 0.6; line-height: 1.2;">${formattedKey}</div>
            <div style="font-size: 18px; font-weight: bold; color: #5f5df0; margin-top: 5px;">${displayValue}</div>
        `;
        grid.appendChild(statCard);
    });
}

document.getElementById("mainOption").addEventListener("change", showSubOptions);
let eloChart = null;

function goToSearch() {
  const nameInput = document.getElementById("name");
  const mainOpt = document.getElementById("mainOption");
  
  if (nameInput) nameInput.value = "";
  if (mainOpt) mainOpt.selectedIndex = 0;
  
  resetAll();

  const resultsPage = document.getElementById("resultsPage");
  const searchPage = document.getElementById("searchPage");
  
  if (resultsPage) resultsPage.style.display = "none";
  if (searchPage) searchPage.style.display = "flex";
}

function resetAll() {
  const subContainer = document.getElementById("subOptionsContainer");
  const subBtnContainer = document.getElementById("submitContainer");
  const errorDiv = document.getElementById("errorMessage");

  if (subContainer) subContainer.innerHTML = "";
  if (subBtnContainer) subBtnContainer.innerHTML = "";
  if (errorDiv) {
    errorDiv.style.display = "none";
    errorDiv.textContent = "";
  }
}

function showSubOptions() {
  resetAll();
  const mainOption = document.getElementById("mainOption")?.value;
  if (!mainOption) return;

  const container = document.getElementById("subOptionsContainer");
  if (!container) return;

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
    for (let i = 0; i < 5; i++) options.push(currentYear - i);
  }

  options.forEach((val) => {
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
  btn.onclick = (e) => handleSubmit(e);
  document.getElementById("submitContainer")?.appendChild(btn);
}

async function handleSubmit(event) {
  event.preventDefault();
  const btn = event.target;
  const originalText = btn.textContent;
  
  const name = document.getElementById("name")?.value.trim();
  const mainOption = document.getElementById("mainOption")?.value;
  const subOption = parseInt(document.getElementById("subSelect")?.value || "0");
  const errorDiv = document.getElementById("errorMessage");

  if (!name) {
    showError("Παρακαλώ εισάγετε Username.");
    return;
  }


  btn.disabled = true;
  btn.textContent = "Searching...";
  if (errorDiv) errorDiv.style.display = "none";

  try {
    const response = await fetch("/statistics", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ username: name, main: mainOption, sub: subOption }),
    });

    const data = await response.json();

    if (data.type === "Failure") {
      showError(data.message || "Σφάλμα κατά την εύρεση δεδομένων.");
    } else {
      const sPage = document.getElementById("searchPage");
      const rPage = document.getElementById("resultsPage");
      
      if (sPage) sPage.style.display = "none";
      if (rPage) rPage.style.display = "flex";
      
      updateChart(data.allElo);
      displayOtherStats(data);
    }
  } catch (err) {
    showError("Αποτυχία σύνδεσης με τον διακομιστή.");
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

function showError(msg) {
  const errorDiv = document.getElementById("errorMessage");
  if (errorDiv) {
    errorDiv.textContent = msg;
    errorDiv.style.display = "block";
  }
}

function updateChart(dataPoints) {
  const canvas = document.getElementById("eloChart");
  if (!canvas) return;
  
  const ctx = canvas.getContext("2d");
  if (eloChart) eloChart.destroy();

  eloChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dataPoints.map((_, i) => i + 1),
      datasets: [{
        label: "Rating Evolution",
        data: dataPoints,
        borderColor: "#81b64c",
        backgroundColor: "rgba(129, 182, 76, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.3,
      }],
    },
    options: { responsive: true }
  });
}

function displayOtherStats(results) {
  const grid = document.getElementById("statsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  Object.entries(results).forEach(([key, value]) => {
    if (key === "allElo" || key === "type" || key === "message") return;
    const statCard = document.createElement("div");
    statCard.className = "stat-item fade";
    const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
    statCard.innerHTML = `<div>${formattedKey}</div><div style="font-size: 24px; color: #81b64c;">${value}</div>`;
    grid.appendChild(statCard);
  });
}

document.getElementById("mainOption")?.addEventListener("change", showSubOptions);
document.getElementById("backBtn")?.addEventListener("click", goToSearch);
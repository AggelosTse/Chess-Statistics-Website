import { nextPhase } from '../utils.js';

function resetAll() {
    document.getElementById("subOptionsContainer").innerHTML = "";
    document.getElementById("submitContainer").innerHTML = "";
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

    if (mainOption === "Days") {
        options = [1, 3, 7, 14, 21, 30];
    } 
    else if (mainOption === "Months") {
        options = [1, 2, 3, 6, 9, 12];
    }
    else if (mainOption === "Years") {
        options = [1, 2, 3, 5, 10];
    }

    options.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    });

    container.appendChild(label);
    container.appendChild(select);

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.classList.add("button");
    submitBtn.onclick = handleSubmit;

    document.getElementById("submitContainer").appendChild(submitBtn);
}

function handleSubmit(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const mainOption = document.getElementById("mainOption").value;
    const subSelect = document.getElementById("subSelect");
    const subOption = subSelect ? subSelect.value : "";

    if (!name.trim()) {
        alert("Please enter your Chess.com username.");
        return;
    }

    nextPhase(name,mainOption,subOption);
  
}

document.getElementById("mainOption").addEventListener("change", showSubOptions);
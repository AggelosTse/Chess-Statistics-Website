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
        const currentTime = new Date();
        const currentyear = currentTime.getFullYear();
        for(let i=0;i<10;i++)
        {
            options.push(currentyear - i);
        }
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

async function handleSubmit(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    name = name.trim();
    const mainOption = document.getElementById("mainOption").value;
    const subSelect = document.getElementById("subSelect");
    let subOption = subSelect ? subSelect.value : "";


    subOption = parseInt(subSelect ? subSelect.value : "0", 10);

    if (!name.trim()) {
        alert("Please enter your Chess.com username.");
        return;
    }

    const results = await nextPhase(name,mainOption,subOption);  //json me stats
    console.log(results)
}

document.getElementById("mainOption").addEventListener("change", showSubOptions);
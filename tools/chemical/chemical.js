const themeBtn = document.getElementById("themeToggle");
const body = document.body;
themeBtn.onclick = () => {
  if (body.classList.contains("light-theme")) {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    themeBtn.textContent = "🌙";
  } else {
    body.classList.add("light-theme");
    body.classList.remove("dark-theme");
    themeBtn.textContent = "☀️";
  }
};

function openAddForm() {
  document.getElementById("addForm").classList.remove("hidden");
}
function closeAddForm() {
  document.getElementById("addForm").classList.add("hidden");
}
function openUseForm() {
  populateChemicalOptions();
  document.getElementById("useForm").classList.remove("hidden");
}
function closeUseForm() {
  document.getElementById("useForm").classList.add("hidden");
}

function addChemical() {
  let name = document.getElementById("addName").value;
  let qty = parseFloat(document.getElementById("addQty").value);
  let unit = document.getElementById("addUnit").value;
  let operator = document.getElementById("addOperator").value;
  if (unit === "CBY") qty *= 25;

  let inventory = JSON.parse(localStorage.getItem("inventory") || "{}");
  if (!inventory[name]) inventory[name] = 0;
  inventory[name] += qty;
  localStorage.setItem("inventory", JSON.stringify(inventory));

  let log = JSON.parse(localStorage.getItem("log") || "[]");
  log.unshift({ type: "add", name, qty, operator, date: new Date().toLocaleString() });
  localStorage.setItem("log", JSON.stringify(log));

  renderInventory(); renderLog();
  closeAddForm();
}

function useChemical() {
  let name = document.getElementById("useName").value;
  let qty = parseFloat(document.getElementById("useQty").value);
  let operator = document.getElementById("useOperator").value;

  let inventory = JSON.parse(localStorage.getItem("inventory") || "{}");
  if (!inventory[name] || inventory[name] < qty) {
    alert("Not enough stock!");
    return;
  }
  inventory[name] -= qty;
  localStorage.setItem("inventory", JSON.stringify(inventory));

  let log = JSON.parse(localStorage.getItem("log") || "[]");
  log.unshift({ type: "use", name, qty, operator, date: new Date().toLocaleString() });
  localStorage.setItem("log", JSON.stringify(log));

  renderInventory(); renderLog();
  closeUseForm();
}

function populateChemicalOptions() {
  let select = document.getElementById("useName");
  let inventory = JSON.parse(localStorage.getItem("inventory") || "{}");
  select.innerHTML = "";
  for (let name in inventory) {
    select.innerHTML += `<option value="${name}">${name}</option>`;
  }
}

function renderInventory() {
  let inventory = JSON.parse(localStorage.getItem("inventory") || "{}");
  let html = "";
  for (let name in inventory) {
    let qty = inventory[name];
    let warning = qty < 20 ? "low-stock" : "";
    html += `<div><strong>${name}:</strong> <span class="${warning}">${qty} L/kg</span></div>`;
  }
  document.getElementById("inventoryList").innerHTML = html;
}

function renderLog() {
  let log = JSON.parse(localStorage.getItem("log") || "[]");
  let html = "";
  log.forEach(entry => {
    html += `<div>${entry.type === "add" ? "➕" : "➖"} <strong>${entry.name}</strong>: ${entry.qty} by ${entry.operator} at ${entry.date}</div>`;
  });
  document.getElementById("usageHistory").innerHTML = html;
}

function exportCSV() {
  let log = JSON.parse(localStorage.getItem("log") || "[]");
  let csv = "Type,Chemical,Quantity,Operator,Date\n";
  log.forEach(entry => {
    csv += `${entry.type},${entry.name},${entry.qty},${entry.operator},${entry.date}\n`;
  });
  let blob = new Blob([csv], { type: 'text/csv' });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "chemical_logs.csv";
  link.click();
}

window.onload = () => {
  renderInventory();
  renderLog();
};


function openForm() {
  document.getElementById("chemicalForm").classList.remove("hidden");
}
function closeForm() {
  document.getElementById("chemicalForm").classList.add("hidden");
}
function saveChemical() {
  const name = document.getElementById("chemicalName").value;
  const qty = parseFloat(document.getElementById("quantity").value);
  const unit = document.getElementById("unit").value;
  const op = document.getElementById("operatorName").value;
  const timestamp = new Date().toLocaleString();

  let finalQty = unit === "Carboy (CBY)" ? qty * 25 : qty;
  const record = { name, qty: finalQty, unit, op, timestamp };

  let logs = JSON.parse(localStorage.getItem("chemicalLogs") || "[]");
  logs.unshift(record);
  localStorage.setItem("chemicalLogs", JSON.stringify(logs));
  renderLogs();
  closeForm();
}

function renderLogs() {
  const logs = JSON.parse(localStorage.getItem("chemicalLogs") || "[]");
  const logList = document.getElementById("logList");
  logList.innerHTML = "";
  logs.forEach(entry => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `<strong>${entry.name}</strong> - ${entry.qty} ${entry.unit}<br><small>By ${entry.op} at ${entry.timestamp}</small>`;
    logList.appendChild(div);
  });
}

const themeToggle = document.getElementById("themeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");
const body = document.body;

function setTheme(mode) {
  if (mode === 'light') {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    sunIcon.classList.add('d-none');
    moonIcon.classList.remove('d-none');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    sunIcon.classList.remove('d-none');
    moonIcon.classList.add('d-none');
  }
  localStorage.setItem('theme', mode);
}

themeToggle.addEventListener("click", () => {
  const current = body.classList.contains('light-theme') ? 'light' : 'dark';
  setTheme(current === 'light' ? 'dark' : 'light');
});

window.onload = () => {
  setTheme(localStorage.getItem('theme') || 'dark');
  renderLogs();
};

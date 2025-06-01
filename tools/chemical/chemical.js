
function openForm() {
  document.getElementById("chemicalForm").classList.remove("hidden");
}
function closeForm() {
  document.getElementById("chemicalForm").classList.add("hidden");
}
function saveChemical() {
  const name = document.getElementById("chemicalName").value;
  const qty = document.getElementById("quantity").value;
  const unit = document.getElementById("unit").value;
  const op = document.getElementById("operatorName").value;
  const log = document.getElementById("log");
  const entry = document.createElement("div");
  entry.innerHTML = `<strong>${name}</strong> - ${qty} ${unit} (by ${op})`;
  log.prepend(entry);
  closeForm();
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
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);
};


function showSteamPopup() {
  document.getElementById('steamPopup').style.display = 'flex';
}
function closePopup() {
  document.getElementById('steamPopup').style.display = 'none';
}
function confirmSteam() {
  const start = parseFloat(document.getElementById('startReading').value);
  const end = parseFloat(document.getElementById('endReading').value);
  const output = end - start;
  if (!isNaN(output)) {
    document.getElementById('steamOutput').value = output.toFixed(2);
    closePopup();
  }
}
function calculateEfficiency() {
  const steam = parseFloat(document.getElementById("steamOutput").value) || 0;
  const buckets = parseFloat(document.getElementById("coalBuckets").value) || 0;
  const gcv = parseFloat(document.getElementById("gcvValue").value) || 0;
  const coalKg = buckets * 200;
  const efficiency = (steam * 640) / (coalKg * gcv) * 100;
  document.getElementById("efficiencyResult").textContent = efficiency.toFixed(2);
}
function toggleTheme() {
  const body = document.body;
  const toggle = document.getElementById('themeToggle');
  body.classList.toggle("dark-mode");
  toggle.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
}
function saveDelivery() {
  const dr = document.getElementById('drNum').value;
  const plate = document.getElementById('plateNum').value;
  const driver = document.getElementById('driverName').value;
  const weight = document.getElementById('weight').value;
  const yard = document.getElementById('yard').value;
  const gcv = document.getElementById('gcvDelivery').value;
  const time = document.getElementById('deliveryTime').value;
  const row = `<tr><td>${yard}</td><td>${time}</td><td>${weight}</td><td>${gcv}</td></tr>`;
  document.getElementById('deliveryHistory').innerHTML += row;
}
function saveCharging() {
  const boiler = document.getElementById('boilerUsed').value;
  const time = document.getElementById('chargeTime').value;
  const buckets = document.getElementById('buckets').value;
  const yard = document.getElementById('chargeYard').value;
  const ash = document.getElementById('ash').value;
  const row = `<tr><td>${time}</td><td>${buckets}</td><td>${yard}</td><td>${ash}</td></tr>`;
  const logTable = boiler === 'Boiler A' ? 'boilerAlog' : 'boilerBlog';
  document.getElementById(logTable).innerHTML += row;
}

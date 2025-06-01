
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
  const receiverName = document.getElementById('receiverName').value;
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


let chargeLogs = [];

function saveCharging() {
  const boiler = document.getElementById('boilerUsed').value;
  const time = document.getElementById('chargeTime').value;
  const buckets = parseFloat(document.getElementById('buckets').value);
  const yard = document.getElementById('chargeYard').value;
  const ash = parseFloat(document.getElementById('ash').value);
  const date = new Date().toISOString().split('T')[0];

  const log = { boiler, time, buckets, yard, ash, date };
  chargeLogs.push(log);
  renderLogs();
}

function filterByDate() {
  renderLogs();
}

function renderLogs() {
  const filterDate = document.getElementById('filterDate').value;
  const ALog = document.getElementById('boilerAlog');
  const BLog = document.getElementById('boilerBlog');
  ALog.innerHTML = '';
  BLog.innerHTML = '';
  let totalA = { buckets: 0, ash: 0 };
  let totalB = { buckets: 0, ash: 0 };

  chargeLogs.forEach(log => {
    if (filterDate && log.date !== filterDate) return;

    const row = `<tr><td>${log.time}</td><td>${log.buckets}</td><td>${log.yard}</td><td>${log.ash}</td></tr>`;
    if (log.boiler === 'Boiler A') {
      ALog.innerHTML += row;
      totalA.buckets += log.buckets;
      totalA.ash += log.ash;
    } else {
      BLog.innerHTML += row;
      totalB.buckets += log.buckets;
      totalB.ash += log.ash;
    }
  });

  document.getElementById("totalA").textContent = `Total Buckets: ${totalA.buckets} | Tapon: ${totalA.ash}`;
  document.getElementById("totalB").textContent = `Total Buckets: ${totalB.buckets} | Tapon: ${totalB.ash}`;
}


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


function updateCYStatus() {
  const totalCYs = 9;
  const allCYs = Array.from({length: 9}, (_, i) => 'CY' + (i + 1));
  const depletedLogs = JSON.parse(localStorage.getItem('chargingLogs')) || [];

  const depletedSet = new Set();
  depletedLogs.forEach(log => {
    if (log.depleted && log.coalYard) {
      depletedSet.add(log.coalYard);
    }
  });

  const deliveryLogs = JSON.parse(localStorage.getItem('deliveryLogs')) || [];
  const deliveredCYSet = new Set();
  deliveryLogs.forEach(log => {
    if (log.yard && !depletedSet.has(log.yard)) {
      deliveredCYSet.add(log.yard);
    }
  });

  const depletedCYs = Array.from(depletedSet);
  const availableCYs = Array.from(deliveredCYSet);

  const suggested = availableCYs.includes("CY9") ? "CY9" : (availableCYs[0] || "-");

  document.getElementById("suggestedCY").innerText = suggested;
  document.getElementById("availableCYs").innerText = availableCYs.join(", ") || "-";
  document.getElementById("depletedCYs").innerText = depletedCYs.join(", ") || "-";
  document.getElementById("vacantCount").innerText = availableCYs.length;
  document.getElementById("depletedCount").innerText = depletedCYs.length;
}

// Call it on page load
updateCYStatus();


// 🔒 Lock logs if after shift time
function checkShiftLock() {
  const now = new Date();
  const hour = now.getHours();
  const lock = (hour >= 6 && hour < 18) ? false : true; // lock night logs after 6PM
  if (lock) {
    document.getElementById("shiftLockNotice").style.display = "block";
  }
}
checkShiftLock();

// 📤 Export Charging Logs to CSV
function exportChargingLogs() {
  const logs = JSON.parse(localStorage.getItem('chargingLogs')) || [];
  let csv = "Boiler,Time,Buckets,Coal Yard,Ash,Tapon,Depleted\n";
  logs.forEach(l => {
    csv += `${l.boiler},${l.time},${l.buckets},${l.coalYard},${l.ash},${l.depleted}\n`;
  });
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "charging_logs.csv";
  a.click();
}

// 📊 Show Daily Summary
function showDailySummary() {
  const logs = JSON.parse(localStorage.getItem('chargingLogs')) || [];
  const summary = {};
  logs.forEach(log => {
    const b = log.boiler;
    if (!summary[b]) summary[b] = 0;
    summary[b] += parseInt(log.buckets);
  });
  let output = "<h4>Daily Bucket Summary:</h4><ul>";
  for (let boiler in summary) {
    output += `<li>${boiler}: ${summary[boiler]} buckets</li>`;
  }
  output += "</ul>";
  document.getElementById("dailySummaryOutput").innerHTML = output;
}

// 🔔 Warn if all CYs depleted
function checkCYExhausted() {
  const totalCYs = 9;
  const depletedLogs = JSON.parse(localStorage.getItem('chargingLogs')) || [];
  const depletedSet = new Set();
  depletedLogs.forEach(log => {
    if (log.depleted && log.coalYard) {
      depletedSet.add(log.coalYard);
    }
  });
  if (depletedSet.size >= totalCYs) {
    alert("⚠️ All Coal Yards are marked depleted!");
  }
}
checkCYExhausted();

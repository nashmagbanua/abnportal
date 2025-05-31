
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

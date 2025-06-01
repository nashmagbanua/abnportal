function openAddPopup() {
  document.getElementById('addPopup').classList.remove('hidden');
}
function openUsePopup() {
  document.getElementById('usePopup').classList.remove('hidden');
}
function closePopup(id) {
  document.getElementById(id).classList.add('hidden');
}
function toggleHistory() {
  const historyPanel = document.getElementById('historyPanel');
  historyPanel.style.display = historyPanel.style.display === 'none' ? 'block' : 'none';
}
function exportData() {
  alert("Export function placeholder");
}
function printPage() {
  window.print();
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("totalChemicals").textContent = "23";
  document.getElementById("lowStock").textContent = "4";
  document.getElementById("expired").textContent = "1";
});

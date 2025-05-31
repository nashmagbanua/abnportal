
function calculateEfficiency() {
  const steam = parseFloat(document.getElementById("steamOutput").value) || 0;
  const buckets = parseFloat(document.getElementById("coalBuckets").value) || 0;
  const gcv = parseFloat(document.getElementById("gcvValue").value) || 0;
  const coalKg = buckets * 200;
  const efficiency = (steam * 640) / (coalKg * gcv) * 100;
  document.getElementById("efficiencyResult").textContent = efficiency.toFixed(2);
}


let timer;
let time = 0;
let operatorName = '';
let deepwell9 = '';
let deepwell10 = '';

function saveInfo() {
  operatorName = document.getElementById('operator').value;
  deepwell9 = document.getElementById('deepwell9').value;
  deepwell10 = document.getElementById('deepwell10').value;

  if (!operatorName) {
    alert('Please enter operator name.');
    return;
  }

  document.getElementById('popup').classList.add('hidden');
  document.getElementById('mainUI').classList.remove('hidden');
}

function updateProgress() {
  const progressCircle = document.querySelector('.progress');
  const maxTime = 60; // max scale reference
  const progress = Math.min(time, maxTime);
  const dashoffset = 283 - (283 * (progress / maxTime));
  progressCircle.style.strokeDashoffset = dashoffset;
}

function start() {
  if (!timer) {
    timer = setInterval(() => {
      time += 0.1;
      document.getElementById('display').innerText = time.toFixed(1);
      updateProgress();
    }, 100);
  }
}

function stop() {
  clearInterval(timer);
  timer = null;

  const gpm = (1 / time) * 3600 * 4.4;
  document.getElementById('gpm').innerText = gpm.toFixed(2);

  const logBlock = document.createElement('div');
  logBlock.className = 'log-block';
  logBlock.innerHTML = `
    <div>💧 <strong>GPM:</strong> ${gpm.toFixed(2)}</div>
    <div>⚙️ <strong>Deepwell 9:</strong> ${deepwell9}</div>
    <div>⚙️ <strong>Deepwell 10:</strong> ${deepwell10}</div>
    <div>👷 <strong>Operator:</strong> ${operatorName}</div>
    <div>⏱️ <strong>Time:</strong> ${time.toFixed(1)}s</div>
  `;

  document.getElementById('logList').appendChild(logBlock);
}

function reset() {
  clearInterval(timer);
  timer = null;
  time = 0;
  document.getElementById('display').innerText = '0.0';
  document.getElementById('gpm').innerText = '0.00';
  updateProgress();
}

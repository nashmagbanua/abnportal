
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

function updateNeedle() {
  const angle = Math.min(time, 60) * 3;
  document.getElementById('needle').setAttribute('transform', `rotate(${angle},100,100)`);
}

function start() {
  if (!timer) {
    timer = setInterval(() => {
      time += 0.1;
      document.getElementById('display').innerText = time.toFixed(1);
      updateNeedle();
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
    <div><span>💧 GPM</span><span>${gpm.toFixed(2)}</span></div>
    <div><span>⚙️ Deepwell 9</span><span>${deepwell9}</span></div>
    <div><span>⚙️ Deepwell 10</span><span>${deepwell10}</span></div>
    <div><span>👷 Operator</span><span>${operatorName}</span></div>
    <div><span>⏱️ Time</span><span>${time.toFixed(1)}s</span></div>
  `;

  document.getElementById('logList').appendChild(logBlock);
}

function reset() {
  clearInterval(timer);
  timer = null;
  time = 0;
  document.getElementById('display').innerText = '0.0';
  document.getElementById('gpm').innerText = '0.00';
  updateNeedle();
}

let timer;
let time = 0;

function saveInfo() {
  const operator = document.getElementById('operator').value;
  const dw9 = document.getElementById('deepwell9').value;
  const dw10 = document.getElementById('deepwell10').value;

  if (!operator) {
    alert('Please enter operator name.');
    return;
  }

  document.getElementById('popup').classList.add('hidden');
  document.getElementById('mainUI').classList.remove('hidden');

  const logList = document.getElementById('logList');
  const info1 = document.createElement('li');
  info1.innerHTML = `<span>Operator:</span><span>${operator}</span>`;
  logList.appendChild(info1);

  const info2 = document.createElement('li');
  info2.innerHTML = `<span>Deepwell 9:</span><span>${dw9}</span>`;
  logList.appendChild(info2);

  const info3 = document.createElement('li');
  info3.innerHTML = `<span>Deepwell 10:</span><span>${dw10}</span>`;
  logList.appendChild(info3);
}

function start() {
  if (!timer) {
    timer = setInterval(() => {
      time += 0.1;
      document.getElementById('display').innerText = time.toFixed(1);
    }, 100);
  }
}

function stop() {
  clearInterval(timer);
  timer = null;

  const gpm = (1 / time) * 3600 * 4.4;
  document.getElementById('gpm').innerText = gpm.toFixed(2);

  const log = document.createElement('li');
  log.innerHTML = `<span>Time:</span><span>${time.toFixed(1)}s</span>`;
  document.getElementById('logList').appendChild(log);

  const log2 = document.createElement('li');
  log2.innerHTML = `<span>GPM:</span><span>${gpm.toFixed(2)}</span>`;
  document.getElementById('logList').appendChild(log2);
}

function reset() {
  clearInterval(timer);
  timer = null;
  time = 0;
  document.getElementById('display').innerText = '0.0';
  document.getElementById('gpm').innerText = '0.00';
}

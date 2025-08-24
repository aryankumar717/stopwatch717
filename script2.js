const display = document.getElementById('display');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapsList = document.getElementById('lapsList');

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let laps = [];

function formatTime(timeInMs) {
    let hours = Math.floor(timeInMs / 3600000);
    let minutes = Math.floor((timeInMs % 3600000) / 60000);
    let seconds = Math.floor((timeInMs % 60000) / 1000);
    let milliseconds = Math.floor(timeInMs % 1000 / 10);

    let formattedHours = String(hours).padStart(2, '0');
    let formattedMinutes = String(minutes).padStart(2, '0');
    let formattedSeconds = String(seconds).padStart(2, '0');
    let formattedMilliseconds = String(milliseconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

function startPauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startButton.textContent = 'Start';
        startButton.classList.replace('bg-orange-500', 'bg-green-600');
        lapButton.disabled = true;
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        isRunning = true;
        startButton.textContent = 'Pause';
        startButton.classList.replace('bg-green-600', 'bg-orange-500');
        lapButton.disabled = false;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    laps = [];
    display.textContent = '00:00:00:00';
    startButton.textContent = 'Start';
    startButton.classList.replace('bg-orange-500', 'bg-green-600');
    lapsList.innerHTML = '';
    lapButton.disabled = true;
}

function recordLap() {
    const lapTime = elapsedTime;
    laps.push(lapTime);

    const lapItem = document.createElement('li');
    lapItem.classList.add('flex', 'justify-between', 'items-center', 'text-sm', 'bg-slate-800', 'p-2', 'rounded-md', 'border', 'border-slate-700');

    lapItem.innerHTML = `
        <span class="text-white font-semibold">Lap ${laps.length}</span>
        <span class="text-slate-300">${formatTime(lapTime)}</span>
    `;

    lapsList.appendChild(lapItem);
    lapsList.scrollTop = lapsList.scrollHeight;
}

startButton.addEventListener('click', startPauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

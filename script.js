const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const lapClearButton = document.getElementsByClassName("lap-clear-button")[0];
let isPlay = false;
let timerInterval;
let milliseconds = 0,
    seconds = 0,
    minutes = 0;
const updateDisplay = () => {
    document.querySelector(".minute").innerText = formatTime(minutes)+':';
    document.querySelector(".second").innerText = formatTime(seconds)+':';
    document.querySelector(".msecond").innerText = formatTime(milliseconds);
};
const formatTime = (time) => {
    return time < 10 ? "0" + time : time;
};
const startStopwatch = () => {
    isPlay = true;
    timerInterval = setInterval(() => {
        milliseconds++;
        if (milliseconds === 100) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        updateDisplay();
    }, 10);
};
const pauseStopwatch = () => {
    isPlay = false;
    clearInterval(timerInterval);
};
const resetStopwatch = () => {
    isPlay = false;
    clearInterval(timerInterval);
    milliseconds = seconds = minutes = 0;
    updateDisplay();
    playButton.innerHTML = 'play';
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    lapClearButton.classList.add("hidden"); 
};
lapClearButton.classList.add("hidden");
const lap = () => {
    const lapList = document.querySelector(".laps");
    const lapItem = document.createElement("li");
    lapItem.classList.add("lap-item");
    const lapNumber = lapList.children.length + 1;
    lapItem.innerHTML = `
        <p>
            <span class="number">#${lapNumber}</span>
            <span class="time-stamp">${formatTime(minutes)} : ${formatTime(seconds)} : ${formatTime(milliseconds)}</span>
        </p>`;
    lapList.appendChild(lapItem);
    lapClearButton.classList.remove("hidden"); 
};

const clearLaps = () => {
    const lapList = document.querySelector(".laps");
    lapList.innerHTML = "";
    lapClearButton.classList.add("hidden"); 
};
playButton.addEventListener("click", () => {
    if (!isPlay) {
        startStopwatch();
        playButton.innerHTML = 'pause';
    } else {
        pauseStopwatch();
        playButton.innerHTML = 'play';
    }
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
});

lapButton.addEventListener("click", lap);

resetButton.addEventListener("click", resetStopwatch);

lapClearButton.addEventListener("click", clearLaps);

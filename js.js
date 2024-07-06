let timer;
let timeLeft = 60;
let isRunning = false;
const message = "You are a beautiful and wonderful person😊, and I think you deserve a little surprise🎉. Guess what? I've hidden a secret treasure just for you, and it's waiting to be discovered!😜";
const display = document.getElementById('timer-display');
const messageDisplay = document.getElementById('message-display');
const overlay = document.getElementById('surprise-overlay');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');

let i = 0;

function typeWriter(text, element, speed, callback = null) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(() => typeWriter(text, element, speed, callback), speed);
    } else if (callback) {
        callback();
    }
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    display.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    overlay.style.display = 'none';
    updateDisplay();
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            isRunning = false;
            display.textContent = '00:00';
            overlay.style.display = 'flex';
        } else {
            timeLeft--;
            updateDisplay();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    stopTimer();
    timeLeft = 60;
    messageDisplay.textContent = '';
    display.textContent = '01:00';
    overlay.style.display = 'none';
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

window.onload = () => {
    i = 0; // Reset index for typewriting
    typeWriter(message, messageDisplay, 50, () => {
        setTimeout(startTimer, 1000);
    });
};

updateDisplay();

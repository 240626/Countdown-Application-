const secondsInput = document.getElementById('seconds-input');
const addBtn = document.getElementById('add-btn');
const timersList = document.getElementById('timers-list');

addBtn.addEventListener('click', () => {
    let timeLeft = parseInt(secondsInput.value);

    if (isNaN(timeLeft) || timeLeft <= 0) {
        alert("Please enter a valid number of seconds!");
        return;
    }

    secondsInput.value = "";

    const timerCard = document.createElement('div');
    timerCard.classList.add('timer-card');

    timerCard.innerHTML = `
        <div class="timer-time">${timeLeft}s</div>
        <div class="timer-buttons">
            <button class="btn-toggle">Stop</button>
            <button class="btn-remove">Remove</button>
        </div>
    `;

    timersList.appendChild(timerCard);

    const timeDisplay = timerCard.querySelector('.timer-time');
    const toggleBtn = timerCard.querySelector('.btn-toggle');
    const removeBtn = timerCard.querySelector('.btn-remove');

    let timerInterval = setInterval(updateTimer, 1000);
    let isRunning = true;

    function updateTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            timeDisplay.textContent = timeLeft + "s";
        } else {
            clearInterval(timerInterval);
            timeDisplay.textContent = "Time's up!";
            timeDisplay.style.color = "#e74c3c";
            toggleBtn.style.display = "none";
        }
    }

    toggleBtn.addEventListener('click', () => {
        if (isRunning) {
            clearInterval(timerInterval);
            toggleBtn.textContent = "Start";
            toggleBtn.classList.add('stopped');
            isRunning = false;
        } else {
            timerInterval = setInterval(updateTimer, 1000);
            toggleBtn.textContent = "Stop";
            toggleBtn.classList.remove('stopped');
            isRunning = true;
        }
    });

    removeBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerCard.remove();
    });
});
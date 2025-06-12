let number = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

const inputElement = document.querySelector('#myInput');
const submitElement = document.querySelector('#submitBtn');
const resultElement = document.querySelector('#result');
const resetElement = document.querySelector('#reset');
const attemptElement = document.querySelector('#attempts');
let attempts = 10;

// function to display the count of attempts remaining
function updateAttempts() {
    if (attempts == 0) {
        resultElement.textContent = "Attempts over, Better luck next time!";
    } else {
        attemptElement.textContent = `${attempts} attempts remaining!`;
    }
}

// function to disable button
function disableBtn(element) {
    element.disabled = true;
    element.style.cursor = "default";
    element.style.backgroundColor = '#ccc';
}

// function to enable button
function enableBtn(element) {
    element.disabled = false;
    element.style.cursor = "pointer";
    element.style.backgroundColor = '#6366F1';
}

// function to process input (checks input wrt random number and performs respective action/s)
function processInput(input) {
    if (input === number) {
        submitElement.disabled = true;
        submitElement.style.cursor = "default";
        submitElement.style.backgroundColor = '#ccc';
        return 'BINGO, YOU WIN!';
    } else if (input > number) {
        if (Math.abs(number - input) <= 10) {
            return "Close but High!";
        } else {
            return "TOO HIGH!";
        }
    } else {
        if (Math.abs(number - input) <= 10) {
            return "Close but Low!";
        } else {
            return 'TOO LOW!';
        }
    }
}

// event listener function for Submit button
submitElement.addEventListener('click', () => {
    const inputValue = Number(inputElement.value.trim());
    if(inputValue > 100 || inputValue <= 0 || isNaN(inputValue)) {
        resultElement.textContent = "Invalid input, Please enter a number between 1-100";
    } else {
        attempts--;
        if (attempts > 0) {
            const output = processInput(inputValue);
            resultElement.textContent = output;
            updateAttempts();
        }
        if (attempts == 0) {
            disableBtn(submitElement);
            updateAttempts();
        }
    }
});

// function for reset button (to regenerate random no, restore attempts, enable submit button, etc)
resetElement.addEventListener('click', () => {
    number = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    attempts = 10;
    enableBtn(submitElement);
    resultElement.textContent = "";
    updateAttempts();
    inputElement.value = "";
});
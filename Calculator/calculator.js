const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let currentOperator = '';
let previousInput = '';
let result = null;

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.id >= '0' && button.id <= '9' || button.id === 'decimal') {
            currentInput += button.id;
            updateDisplay();
        } else if (button.id === 'clear') {
            clear();
        } else if (button.id === 'equals') {
            calculate();
        } else {
            handleOperator(button.id);
        }
    });
});

function updateDisplay() {
    display.value = currentInput;
}

function clear() {
    currentInput = '';
    currentOperator = '';
    previousInput = '';
    result = null;
    updateDisplay();
}

function handleOperator(operator) {
    if (currentInput !== '') {
        if (currentOperator === '') {
            previousInput = currentInput;
            currentInput = '';
            currentOperator = operator;
        } else {
            calculate();
            currentOperator = operator;
        }
    }
}

function calculate() {
    if (currentInput !== '' && previousInput !== '') {
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);
        switch (currentOperator) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                if (num2 === 0) {
                    display.value = 'Error';
                    clear();
                    return;
                }
                result = num1 / num2;
                break;
        }
        currentInput = result.toString();
        currentOperator = '';
        previousInput = '';
        updateDisplay();
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === 'Enter') {
        document.getElementById(key).click();
        event.preventDefault(); 
    }
});

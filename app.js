const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');

keys.addEventListener('click', (e) => {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    if (!key.matches('button')) return;

    if (!action) {
        if (displayedNum === '0' || previousKeyType === 'operator') {
            display.textContent = keyContent;
        } else {
            display.textContent = displayedNum + keyContent;
        }
        calculator.dataset.previousKeyType = 'number';
    }

    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;

        if (firstValue && operator && previousKeyType !== 'operator') {
            const calcValue = calculate(firstValue, operator, secondValue);
            display.textContent = calcValue;

            calculator.dataset.firstValue = calcValue;
        } else {
            calculator.dataset.firstValue = displayedNum;
        }

        key.classList.add('is-depressed');
        calculator.dataset.previousKeyType = 'operator';
        calculator.dataset.operator = action;
    }

    if (action === 'decimal') {
        if (!displayedNum.includes('.')) {
            display.textContent = displayedNum + '.';
        } else if (previousKeyType === 'operator') {
            display.textContent = '0.';
        }
        calculator.dataset.previousKeyType = 'decimal';
    }

    if (action === 'clear') {
        if (key.textContent === 'AC') {
            calculator.dataset.firstValue = ''
            calculator.dataset.modValue = ''
            calculator.dataset.operator = ''
            calculator.dataset.previousKeyType = ''
        } else {
            key.textContent = 'AC'
        }
        
        display.textContent = 0
        calculator.dataset.previousKeyType = 'clear'
    }

    if (action === 'calculate') {
        let firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;

        if (firstValue && operator) {
            if (previousKeyType === 'calculate') {
                firstValue = displayedNum;
            }

            display.textContent = calculate(firstValue, operator, secondValue);

            calculator.dataset.previousKeyType = 'calculate'
        }
    }
});

const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1)
    const secondNum = parseFloat(n2)
    if (operator === 'add') return firstNum + secondNum
    if (operator === 'subtract') return firstNum - secondNum
    if (operator === 'multiply') return firstNum * secondNum
    if (operator === 'divide') return firstNum / secondNum
}


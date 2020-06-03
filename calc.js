const calcForm = document.querySelector(".calcForm");
const clear = document.getElementById('clr');

let value = '0';
let operator = false;

const calculator =  {
    displayValue : '0',
    firstOperand : null,
    secondOperand : false,
    operator: null,
};

const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

    '=': (firstOperand, secondOperand) => secondOperand,
}

const resetCalculation = () => {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.secondOperand = false;
    calculator.operator = null;
    //console.log(calculator);
}

const handleOperator = nextOperator => {
    const {firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if(operator && calculator.secondOperand){
        calculator.operator = nextOperator;
        //console.log(calculator);
        return;
    }

    if(firstOperand === null){
        calculator.firstOperand = inputValue;
    } else if(operator){
        const currentValue = firstOperand || 0;
        const result = performCalculation[operator](currentValue, inputValue);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }
    calculator.secondOperand = true;
    calculator.operator = nextOperator;
    // console.log(calculator.operator);
    // console.log(inputValue);  
    console.log(calculator);
};

const inputDecimal = dot => {
    if(calculator.secondOperand === true) return;
    //if the displaValue does not contain a decimal point
    if(!calculator.displayValue.includes(dot)){
        //Append the decimal point
        calculator.displayValue += dot;
    }
};

const updateDisplay = () => {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
    //console.log(display.value);
};

const inputDigit = digit => {
    const {displayValue, secondOperand,} = calculator;

    if(secondOperand === true ){
        calculator.displayValue = digit;
        calculator.secondOperand = false;
    } else {
        //overwrite displayValue if the current value is '0' otherwise append it
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    //const displayValue = calculator.displayValue;
    // console.log(calculator);
};

updateDisplay();

calcForm.addEventListener('click', e => {
    e.preventDefault();
    //const {target} = e; === const target = e.target;
    
    if(!e.target.matches('button')){
        return;
    }
    if(e.target.classList.contains('operator')){
        //console.log('operator', e.target.value);
        handleOperator(e.target.value);
        updateDisplay();
        return;
    }
    if(e.target.classList.contains('decimal')){
        //console.log('decimal', e.target.value);
        inputDecimal(e.target.value);
        updateDisplay();
        return;
    }
    if(e.target.classList.contains('all-clear')){
        //console.log('clear', e.target.value);
        resetCalculation();
        updateDisplay();
        return;
    }
    if(e.target.classList.contains('del')){
        calculator.displayValue = calculator.displayValue.slice(0, -1);
        if(calculator.displayValue.length == 0){
            calculator.displayValue = '0';
        }
        updateDisplay();
        return;
    }
    //console.log('digit',e.target.value);
    inputDigit(e.target.value);
    updateDisplay();
});



// calcForm.addEventListener('click', e => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if(e.target.classList.contains('myBtn')){
//         console.log(Number(e.target.value), '+');
//         if(e.target.classList.contains('clr')){
//             value = '0';
//         }

//         if(value === '0'){
//             operator = true;
//         } 
//         if(!e.target.classList.contains('operator')){
//             operator = false;
//         }
//         if(!operator){
//             value === '0' ? value = e.target.value : value += e.target.value;
//             if(e.target.classList.contains('operator')){
//                 calculator.value = value;
//                 operator = true;
//             }
//         }

//         if(value.includes('.')){
//            const dot = document.getElementById('decimal');
//            dot.setAttribute('disabled', '');
//         }

//         if(e.target.classList.contains('del')){
//             value = value.slice(0, -1);
//         }
//         if(!value.includes('.')){
//             const dot = document.getElementById('decimal');
//             dot.removeAttribute('disabled');
//         }

//         if(value.length == 0){
//             value = '0';
//         }

        
        
//     }
//     console.log(value);
//     console.log(calculator.value);
// });


"use strict";

const display = document.getElementById("display");
const numbers = document.querySelectorAll("[id*=num]");
const operators = document.querySelectorAll("[id*=operator]");

let newNumber = true;
let operator;
let previousNumber;

const pendingOperation = () => operator !== undefined;

const calculate = () => {
  if (pendingOperation()) {
    const currentNumber = parseFloat(display.textContent.replace(",", "."));
    newNumber = true;

    const result = eval(`${previousNumber}${operator}${currentNumber}`);
    updateDisplay(result);
    // if (operator == "+") {
    //   updateDisplay(previousNumber + currentNumber);
    // } else if (operator == "-") {
    //   updateDisplay(previousNumber - currentNumber);
    // } else if (operator == "*") {
    //   updateDisplay(previousNumber * currentNumber);
    // } else if (operator == "/") {
    //   updateDisplay(previousNumber / currentNumber);
    // }
  }
};

const updateDisplay = (text) => {
  if (newNumber) {
    display.textContent = text.toLocaleString("BR");
    newNumber = false;
  } else {
    display.textContent += text.toLocaleString("BR");
  }
};
const insertNumber = (event) => updateDisplay(event.target.textContent);

const selectOperator = (event) => {
  if (!newNumber) {
    calculate();
    newNumber = true;
    operator = event.target.textContent;
    previousNumber = parseFloat(display.textContent.replace(",", "."));
  }
};

numbers.forEach((number) => number.addEventListener("click", insertNumber));

operators.forEach((operator) =>
  operator.addEventListener("click", selectOperator)
);

const total = () => {
  calculate();
  operator = undefined;
};

const clearDisplay = () => (display.textContent = "");

const clearCalc = () => {
  clearDisplay();
  operator = undefined;
  newNumber = true;
  previousNumber = undefined;
};

const backspace = () =>
  (display.textContent = display.textContent.slice(0, -1));

const invert = () => {
  newNumber = true;
  updateDisplay(display.textContent * -1);
};

const haveDecimal = () => display.textContent.indexOf(",") !== -1;
const haveValue = () => display.textContent.length > 0;

const decimal = () => {
  if (!haveDecimal()) {
    if (haveValue()) {
      updateDisplay(",");
    } else {
      updateDisplay("0,");
    }
  }
};

document.getElementById("total").addEventListener("click", total);
document.getElementById("clearDisplay").addEventListener("click", clearDisplay);
document.getElementById("clearCalc").addEventListener("click", clearCalc);
document.getElementById("backspace").addEventListener("click", backspace);
document.getElementById("invert").addEventListener("click", invert);
document.getElementById("decimal").addEventListener("click", decimal);

//mapping keyboard
const mapKeyboard = {
  0: "num0",
  1: "num1",
  2: "num2",
  3: "num3",
  4: "num4",
  5: "num5",
  6: "num6",
  7: "num7",
  8: "num8",
  9: "num9",
  "/": "operatorSplit",
  "*": "operatorMultiply",
  "-": "operatorSubtract",
  "+": "operatorAddition",
  "=": "total",
  Enter: "total",
  Backspace: "backspace",
  c: "clearDisplay",
  Escape: "clearCalc",
  ",": "decimal",
};

const mappingKeyboard = (event) => {
  const key = event.key;
  const haveKey = () => Object.keys(mapKeyboard).indexOf(key) !== -1;
  if (haveKey()) {
    document.getElementById(mapKeyboard[key]).click();
  }
};
document.addEventListener("keydown", mappingKeyboard);

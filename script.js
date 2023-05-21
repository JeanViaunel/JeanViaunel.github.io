const display = document.getElementById("display");
const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");
const clearButton = document.getElementById("clear");
const equalButton = document.getElementById("equal");

let currentExpression = "";
let shouldClearDisplay = false;

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (shouldClearDisplay) {
      display.value = "";
      shouldClearDisplay = false;
    }
    display.value += number.textContent;
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (shouldClearDisplay) {
      shouldClearDisplay = false;
    }
    display.value += operator.textContent;
  });
});

equalButton.addEventListener("click", () => {
  try {
    const result = eval(display.value);
    display.value = result;
    shouldClearDisplay = true;
  } catch (error) {
    display.value = "Error";
  }
});

clearButton.addEventListener("click", () => {
  display.value = "";
});

const buttons = document.querySelectorAll("#buttons > button");
const screen = document.getElementById("screen");
const form = document.getElementById("calculator");

form.addEventListener("submit", e => e.preventDefault());

const calculator = (screen => {
  const OPERATORS = {
    "+": (n1, n2) => n1 + n2,
    "-": (n1, n2) => n1 - n2,
    "*": (n1, n2) => n1 * n2,
    "/": (n1, n2) => (n2 === 0 ? "Bruh" : (n1 / n2).toFixed(4))
  };
  const MAXNUM = 999999999999;

  let operator = null,
    displayValue = 0,
    storedValue = 0,
    isFloat = false;

  const operate = () => {
    if (!operator) return displayValue;

    let temp = storedValue;
    storedValue = displayValue;
    return OPERATORS[operator](temp, displayValue);
  };

  const updateOperator = n => {
    if (operator) {
      storedValue = operate();
      displayValue = storedValue;
      updateDisplay();
      displayValue = 0;
      operator = n;
    } else {
      operator = n;
      storedValue = displayValue;
      displayValue = 0;
      updateDisplay();
    }
  };

  const updateDisplayValue = n => {
    displayValue = displayValue * 10 + n;
    updateDisplay();
  };

  const addDecimal = () => {
    if (!isFloat) {
      displayValue += ".";
      updateDisplay();
    }
  };

  const updateDisplay = () => {
    return (screen.innerText =
      typeof displayValue === "number"
        ? Math.min(displayValue, MAXNUM)
        : displayValue);
  };

  const reset = () => {
    displayValue = storedValue = 0;
    operator = null;
    updateDisplay();
  };

  const input = n => {
    if (!isNaN(+n)) updateDisplayValue(+n);
    else if (n === ".") addDecimal();
    else if (OPERATORS[n]) updateOperator(n);
    else if (n === "C" || n === "c") reset();
    else if (n === "=") {
      displayValue = operate();
      operator = null;
      updateDisplay();
    }
  };

  return { input };
})(screen);

buttons.forEach(button => {
  button.addEventListener("click", e => {
    calculator.input(e.target.innerText);
  });
});

document.addEventListener("keydown", e => {
  calculator.input(e.key === "Enter" ? "=" : e.key);
  console.log(e.key);
});

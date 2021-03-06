import './Calculator.scss';
import React, { useRef } from 'react';

/*change buttons to flex grid*/
const Calculator = () => {
  let operands = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let decimal = '.';
  let operators = ['+', '-', '*', '/', '='];
  let clickSound = 'https://dight310.byu.edu/media/audio/FreeLoops.com/5/5/Mouse%20Click%20Fast.wav';

  const displayRef = useRef();
  const audioRef = useRef();

  const updateDisplay = () => {
    displayRef.current.value = calc.display;
  };
  const click = () => {
    audioRef.current.src = clickSound;
  };

  const calc = {
    display: '0',
    currentVal: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
    nextNumNeg: false,
  };

  //event listener and filter that sends the input on it's journey through the app
  const whatWasClicked = (e) => {
    click();
    const foundOperand = operands.find((number) => number === e);
    const foundOperator = operators.find((symbol) => symbol === e);
    if (e === foundOperand) {
      inputDigit(foundOperand);
    }
    if (e === decimal) {
      inputDecimal(e);
    }
    if (e === foundOperator) {
      handleOperator(foundOperator);
    }
    if (e === 'AC') {
      allClear();
    }
    updateDisplay();
  };

  //handles digits
  const inputDigit = (digit) => {
    if (calc.currentVal === '0') {
      calc.currentVal = digit;
      calc.display = calc.currentVal;
    } else if (calc.waitingForSecondOperand === true) {
      calc.currentVal = digit;
      calc.waitingForSecondOperand = false;
      calc.display += calc.currentVal;
    } else if (calc.currentVal !== '0') {
      calc.currentVal = calc.currentVal + digit;
      calc.display = calc.display + digit;
    }
  };

  //handles decimals
  const inputDecimal = (dot) => {
    if (calc.waitingForSecondOperand === true) {
      calc.currentVal = '0.';
      calc.waitingForSecondOperand = false;
      return;
    }
    if (!calc.currentVal.includes(dot)) {
      calc.currentVal = calc.currentVal += dot;
      calc.display = calc.display += dot;
    }
  };

  //handles operators and is the biggest filter in this app
  const handleOperator = (nextOperator) => {
    const { firstOperand, currentVal, operator } = calc;
    let inputValue = parseFloat(currentVal);
    if (operator && calc.waitingForSecondOperand && nextOperator === '-') {
      calc.nextNumNeg = true;
      calc.display += nextOperator;
      return;
    }
    if (operator && calc.waitingForSecondOperand) {
      calc.operator = nextOperator;
      if (nextOperator !== operator) {
        calc.display = calc.display.slice(0, -1) + nextOperator;
      }
      calc.nextNumNeg = false;
      return;
    }
    if (firstOperand === null && !isNaN(inputValue)) {
      calc.firstOperand = inputValue;
    } else if (operator) {
      if (operator && calc.nextNumNeg) {
        inputValue = -inputValue;
        calc.nextNumNeg = false;
      }
      const result = calculate(firstOperand, inputValue, operator);
      calc.currentVal = `${parseFloat(result.toFixed(7))}`;
      if (nextOperator === '=') {
        calc.display = `${parseFloat(result.toFixed(7))}`;
      }
      calc.firstOperand = result;
      calc.operator = nextOperator;
    }
    calc.waitingForSecondOperand = true;
    if (nextOperator !== '=') {
      calc.operator = nextOperator;
      calc.display += nextOperator;
    }
  };

  //handles the arithmetic functions
  function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
      return firstOperand + secondOperand;
    } else if (operator === '-') {
      return firstOperand - secondOperand;
    } else if (operator === '*') {
      return firstOperand * secondOperand;
    } else if (operator === '/') {
      return firstOperand / secondOperand;
    }

    return secondOperand;
  }

  //clears everything by resetting all the values of the object back to the starting value;
  const allClear = () => {
    calc.display = '0';
    calc.currentVal = '0';
    calc.firstOperand = null;
    calc.waitingForSecondOperand = false;
    calc.operator = null;
  };

  return (
    <div>
      <div id="calculator">
        <div id="displayContainer">
          <input id="display" ref={displayRef} type="text" value="0" disabled />
        </div>
          <div id="calcKeys">
          <div id="row1">
          <button
            className="all-clear buttons"
            id="clear"
            value="AC"
            onClick={(e) => whatWasClicked(e.target.value)}
          >
            AC
          </button>
          <button
            className="operators buttons"
            id="divide"
            value="/"
            onClick={(e) => whatWasClicked(e.target.value)}
          >
              /
          </button>
          </div>
          <div id="row2">
          <button
            className="operands buttons"
            id="seven"
            value="7"
            onClick={(e) => whatWasClicked(e.target.value)}
          >
              7
          </button>
          
          <button
            className="operands buttons"
            id="eight"
            value="8"
            onClick={(e) => whatWasClicked(e.target.value)}
          >
            8
          </button>
          <button
            className="operands buttons"
            id="nine"
            value="9"
            onClick={(e) => whatWasClicked(e.target.value)}
          >
            9
          </button>
          <button
            className="operators buttons"
            id="multiply"
            value="*"
            onClick={(e) => whatWasClicked(e.target.value)}
          >
              &times;
          </button>
          </div>
          <div id="row3">
          <button
            className="operands buttons"
            id="four"
            value="4"
            onClick={(e) => whatWasClicked(e.target.value)}
          >
            4
          </button>
          <button
            className="operands buttons"
            id="five"
            value="5"
            onClick={(e) => whatWasClicked(e.target.value)}
          >
            5
          </button>
          <button
            className="operands buttons"
            id="six"
            value="6"
            onClick={(e) => whatWasClicked(e.target.value)}
          >
            6
          </button>
          <button
            className="operators buttons"
            id="subtract"
            value="-"
            onClick={(e) => whatWasClicked(e.target.value)}
          >
              -
          </button>
          </div>
          <div id="row4">
          <button
            className="operands buttons"
            id="one"
            value="1"
            onClick={(e) => whatWasClicked(e.target.value)}
          >
            1
          </button>
          <button
            className="operands buttons"
            id="two"
            value="2"
            onClick={(e) => whatWasClicked(e.target.value)}
          >
            2
          </button>
          <button
            className="operands buttons"
            id="three"
            value="3"
            onClick={(e) => whatWasClicked(e.target.value)}
          >
            3
          </button>
          <button
            className="operators buttons"
            id="add"
            value="+"
            onClick={(e) => whatWasClicked(e.target.value)}
          >
              +
          </button>
          </div>
          <div id="row5">
          <button
            className="operands buttons"
            id="zero"
            value="0"
            onClick={(e) => whatWasClicked(e.target.value)}
          >
            0
          </button>
          <button
            className="decimal buttons"
            id="decimal"
            value="."
            onClick={(e) => whatWasClicked(e.target.value)}
          >
            .
          </button>
          <button
            className="operators buttons"
            id="equals"
            value="="
            onClick={(e) => whatWasClicked(e.target.value)}
          >
              =
          </button>
          </div>
          <audio ref={audioRef} autoPlay="true" />
        </div>
      </div>
    </div>
  );
};
export default Calculator;


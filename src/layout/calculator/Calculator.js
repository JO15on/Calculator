import React from 'react';
import Screen from './Screen/Screen';
import Keypad from './Keypad/Keypad';

class Calculator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            equation: '',
            result: 0
        }
    }

    onButtonPress = event => {
        let equation = this.state.equation;
        const pressedButton = event.target.innerHTML;
        let result = 0;

        if (pressedButton === 'C') {
            return this.clear();
        } else if (pressedButton === '%') {
            result = (equation/100).toString();
        } else if ((parseInt(pressedButton) <= 9 && 0 <= parseInt(pressedButton)) || pressedButton === '.') {
            equation += pressedButton;
        } else if (pressedButton === '/') {
            equation += pressedButton;
        } else if (pressedButton === '*') {
            equation += pressedButton;
        } else if (pressedButton === '-') {
            equation += pressedButton;
        } else if (pressedButton === '+') {
            equation += pressedButton;
        } else if (pressedButton === '=') {
            result = this.calculate(this.parseCalculationString(equation));
            this.setState({result});
        }  else if (pressedButton === 'B') {
            console.log(pressedButton);
            equation = equation.trim();
            equation = equation.substr(0, equation.length - 1);
        }

        this.setState({equation: equation});
    }
    
    // parseCalculationString(s) { 
    //     // --- Parse a calculation string into an array of numbers and operators
    //     let calculation = [];  //The place where the calculation itself is stored and returned at the bottom of the function.
    //     let current = '';  //The current string calculation. 
    //     for (var i = 0, ch; ch = s.charAt(i); i++) {  //Iterate through the characters of the param. 
    //         if ('^*/+-'.indexOf(ch) > -1) {  //Run this code If one of those characters exist in the parameter
    //             if (current === '' && ch === '-') {  //If the string had invalid '' or - characters, change it to a valid one.
    //                 current = '-'; 
    //             } else {  //Otherwise, just push it to the calculation array, 
    //                 calculation.push(parseFloat(current), ch);  //Push a floating point integer and the character to the calculation array.
    //                 current = '';  //Reset the current variable.
    //             }
    //         } else {  // If the character doesn't exist, just add the character to the "current" variable.
    //             current += s.charAt(i);
    //         }
    //     }
    //     if (current !== '') {  //If current isn't an empty string, push the calculation to the calculation array.
    //         calculation.push(parseFloat(current));
    //     }
    //     return calculation;  //Return the value of the calculation array. 
    // }

    parseCalculationString = (s) => {
        let calculation = [];
        let current = ''; //The current string calculation. 
        [...s].forEach(ch => { //Create an array and de-structure the input characters to access the individual letters.
          if ('^+-'.indexOf(ch) > -1) { //Run this code If one of those characters exist in the parameter
            if (current === '' && ch === '-') { //If the string had invalid '' or - characters, change it to a valid one.
              current = '-';
            } else { //Otherwise, just push it to the calculation array, 
              calculation.push(parseFloat(current), ch); //Push a floating point integer and the character to the calculation array.
              current = ''; //Reset the current variable.
            }
          } else { // If the character doesn't exist, just add the character to the "current" variable.
            current += ch;
          }
        })
        if (current) { //If current isn't an empty string, push the calculation to the calculation array.
          calculation.push(parseFloat(current));
        }
        return calculation; //Return the value of the calculation array. 
      }

    calculate(calc) {
        // --- Perform a calculation expressed as an array of operators and numbers
        var ops = [{'^': (a, b) => Math.pow(a, b)},
                   {'*': (a, b) => a * b, '/': (a, b) => a / b},
                   {'+': (a, b) => a + b, '-': (a, b) => a - b}],
            newCalc = [],
            currentOp;
        for (var i = 0; i < ops.length; i++) {  //Cycle through the operations available in the ops array.
            for (var j = 0; j < calc.length; j++) {  //Cycle through the array passed through the "calc" parameter on every iteration of the ops array.
                if (ops[i][calc[j]]) {  //This is some two-dimensional array iteration. It's checking if the parameter "calc"'s calculation is present inside of the ops array. Probably looking for one of the * ^ * / - + symbols.
                  currentOp = ops[i][calc[j]];  // Dump that found operation function to the currentOp variable
                } else if (currentOp) {  //See if currentOp exists. 
                    newCalc[newCalc.length - 1] = currentOp(newCalc[newCalc.length - 1], calc[j]);  //Place into into the array the return value of the currentOp function which will be equal to anything inside of the "ops" array.
                    currentOp = null;  //Erase currentOp function (nullify it)
                } else {
                    newCalc.push(calc[j]); //Push the next calculation into the newCalc array. 
                }
            }
            calc = newCalc; //Set the param to just be newCalc instead of the parameter itself. 
            newCalc = []; //Empty the newCalc array. 
        }
        if (calc.length > 1) { //Error checking for the calc array.
            console.log('Error: unable to resolve calculation');
            return calc; //Return nothing
        } else {
            return calc[0]; //Return the first item in the calc array.
        }
    }

    clear() {
        this.setState({equation: '', result: 0});
    }

    render() {
        return (
            <main className="calculator">
                <Screen equation={this.state.equation} result={this.state.result} />
                <Keypad onButtonPress={this.onButtonPress}  />
            </main>
        );
    }
}

export default Calculator;
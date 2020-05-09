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
        }  

        this.setState({equation: equation});
    }
    
    parseCalculationString(s) {
        // --- Parse a calculation string into an array of numbers and operators
        var calculation = [],
            current = '';
        for (var i = 0, ch; ch = s.charAt(i); i++) {
            if ('^*/+-'.indexOf(ch) > -1) {
                if (current == '' && ch == '-') {
                    current = '-';
                } else {
                    calculation.push(parseFloat(current), ch);
                    current = '';
                }
            } else {
                current += s.charAt(i);
            }
        }
        if (current != '') {
            calculation.push(parseFloat(current));
        }
        return calculation;
    }

    calculate(calc) {
        // --- Perform a calculation expressed as an array of operators and numbers
        var ops = [{'^': (a, b) => Math.pow(a, b)},
                   {'*': (a, b) => a * b, '/': (a, b) => a / b},
                   {'+': (a, b) => a + b, '-': (a, b) => a - b}],
            newCalc = [],
            currentOp;
        for (var i = 0; i < ops.length; i++) {
            for (var j = 0; j < calc.length; j++) {
                console.log(ops[i][calc[j]])
                if (ops[i][calc[j]]) {
                  currentOp = ops[i][calc[j]];
                } else if (currentOp) {
                    newCalc[newCalc.length - 1] =
                        currentOp(newCalc[newCalc.length - 1], calc[j]);
                    currentOp = null;
                } else {
                    newCalc.push(calc[j]);
                }
            }
            calc = newCalc;
            newCalc = [];
        }
        if (calc.length > 1) {
            console.log('Error: unable to resolve calculation');
            return calc;
        } else {
            return calc[0];
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
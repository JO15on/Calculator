import React from 'react';
import KeypadRow from './KeypadRow/KeypadRow';
import Button from '../../../components/Button/Button';
import LargeButton from '../../../components/Button/LargeButton/LargeButton';

const keypad = (props) => (
  <section className="keypad">
    <KeypadRow>
      <Button onButtonPress={props.onButtonPress} type="primary">C</Button>
      <Button onButtonPress={props.onButtonPress} type="primary">&larr;</Button>
      <Button onButtonPress={props.onButtonPress} type="operator">%</Button>
      <Button onButtonPress={props.onButtonPress} type="operator">/</Button>
    </KeypadRow>
    
    <KeypadRow>
    <Button onButtonPress={props.onButtonPress}>7</Button>
    <Button onButtonPress={props.onButtonPress}>8</Button>
    <Button onButtonPress={props.onButtonPress}>9</Button>
    <Button onButtonPress={props.onButtonPress} type="operator">*</Button>
    </KeypadRow>
    
    <KeypadRow>
    <Button onButtonPress={props.onButtonPress}>4</Button>
    <Button onButtonPress={props.onButtonPress}>5</Button>
    <Button onButtonPress={props.onButtonPress}>6</Button>
    <Button onButtonPress={props.onButtonPress} type="operator">-</Button>
    </KeypadRow>
    
    <KeypadRow>
    <Button onButtonPress={props.onButtonPress}>1</Button>
    <Button onButtonPress={props.onButtonPress}>2</Button>
    <Button onButtonPress={props.onButtonPress}>3</Button>
    <Button onButtonPress={props.onButtonPress} type="operator">+</Button>
    </KeypadRow>
    
    <KeypadRow>
    <Button onButtonPress={props.onButtonPress}>0</Button>
    <Button onButtonPress={props.onButtonPress}>.</Button>
    <LargeButton onButtonPress={props.onButtonPress} type="operator">=</LargeButton>
    </KeypadRow>
  </section>
);
export default keypad;
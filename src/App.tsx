import { evaluate } from 'mathjs';
import React, { useState } from 'react';
import './App.css';
import Display from './components/Display';
import Keyboard from './components/Keyboard';

function App() {

  const [formula, setFormula] = useState(' ');
  const [result, setResult] = useState(' ');
  const [year] = useState(new Date().getFullYear());

  const calculate = () => {
    try {
      const result = evaluate(formula);
      setResult('=' + result) ;
    } catch (error) {
      if((error as Error).name === 'SyntaxError') {
        setResult("Invalid formula");
      }
    }
  }

  const clear = () => {
    setFormula('');
    setResult('');
  }

  // const backspace = (previousSlice?: string) => {

  //   var slice = '';

  //   if(!previousSlice && formula.endsWith(' ')) {
  //     slice = formula.slice(0,-2);
  //   } else {
  //     slice = (previousSlice ? previousSlice : formula).slice(0, -1);
  //   }

  //   if (slice.endsWith(' ')) {
  //     backspace(slice);
  //     return;
  //   }
  //   setFormula(slice);
  //   setResult('');
  // }

  const backspace = () => {

    const formulaSliced = formula.endsWith(' ') ? formula.slice(0, -3) : formula.slice(0, -1);

    setFormula(formulaSliced);
    setResult('');
  }

  const formulaChangeHandler = (keyEvent: string, value: string | number) => {

    if(result !== ''){
      clear();
      if (keyEvent === 'Enter' || keyEvent === '='){
        setFormula(value.toString());
      }
      return;
    }

    if(keyEvent === 'Enter' || keyEvent === '=') {
      calculate();
    } else if (keyEvent === 'Enter'){
      clear();
    } else if (keyEvent === 'Backspace'){
      backspace();
    }
    else {
      setFormula(formula + '' + value); 
    }
  }

  return (
    <React.Fragment>
    <div className='app'>
    <header className='header'>
      <h2>Calculator</h2>
    </header>
    <main className="calculator">
      <Display formula = { formula} result = {result}/>
      <Keyboard formulaChangeHandler={formulaChangeHandler} />
    </main>
    </div>
    <footer className='footer'>
      &copy; {year} Laura Forero. All rights reserved.
    </footer>
    </React.Fragment>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';

import { InputText } from 'primereact/inputtext';

import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css'
import 'primereact/resources/primereact.min.css'

import { useState } from 'react';

function App() {
  const [text, setText] = useState('');

  return ( 
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>

        <InputText value={text} onChange={e => setText(e.target.value)} />
        {text}
      </header>
      <footer>
        <h3>Berth Loves Stubbert</h3>
      </footer>
    </div>
  );
}

export default App;

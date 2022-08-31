import React from 'react';

import './App.css';
import Header from './components/header/header';
import Summary from './components/summary/summary';
import Experience from './components/experience/experience';
import Awards from './components/awards/awards';
import Language from './components/language/language';
import PersonalProjs from './components/perprojs/personalprojs';

function App() {
  return (
    <div>
        <Header/>
        <Summary/>
        <Experience/>
        <PersonalProjs/>
        <Awards/>
        <Language/>
    </div>
  );
}

export default App;

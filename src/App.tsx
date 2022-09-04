import Header from './components/header/header';
import Summary from './components/summary/summary';
import Experience from './components/experience/experience';
import Awards from './components/awards/awards';
import Language from './components/language/language';
import PersonalProjs from './components/perprojs/personalprojs';
import { useEffect } from 'react';
import { splietter } from './tools/textBlender.js'

function App() {
  // const test = useEffect(()=>{
  //   const body = document.querySelectorAll('.gray');
  //   Array.from(body).forEach(el=>splietter(el))
  // },[])
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

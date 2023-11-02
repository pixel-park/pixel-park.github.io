import Header from "./components/header/header";
import Summary from "./components/summary/summary";
import Experience from "./components/experience/experience";
import Awards from "./components/awards/awards";
import Language from "./components/language/language";
import PersonalProjs from "./components/perprojs/personalprojs";
import Competencies from "./components/competencies/competencies";
import AdditionalSkills from "./components/additionalSkills/additionalSkills";

function App() {
  return (
    <div>
      <Header />
      <Summary />
      <Competencies />
      <Experience />
      <PersonalProjs />
      <AdditionalSkills />
      <Awards />
      <Language />
    </div>
  );
}

export default App;

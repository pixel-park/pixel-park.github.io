import './personalprojs.css';
import Project from './project/project';
import data from '../../data/projects.json';
import { useEffect, useState } from 'react';

function PersonalProjs() {
    const size = useWindowSize();
    function useWindowSize() {
    const [windowWidth, setWindowSize] = useState(0);
        useEffect(() => {
            function handleResize() {
            setWindowSize(window.innerWidth);
            }
            window.addEventListener("resize", handleResize);
            handleResize();
            return () => window.removeEventListener("resize", handleResize);
        }, []); 
    return windowWidth;
    }
    return (
        <div className="projs__wrapper">
            <h3 className='green compact' id="ass">PERSONAL PROJECTS</h3>
            {data.projs.map(obj=>(
                <Project {...obj} {...{screenSize:size}} key={obj.id}/>
            ))}
            
        </div>
    )
}
export default PersonalProjs;
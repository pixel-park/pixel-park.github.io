import './personalprojs.css';
import Project from './project/project';
import data from '../../data/projects.json';

function PersonalProjs() {
    console.log(data.projs);

    return (
        <div className="projs__wrapper">
            <h3 className='green compact'>PERSONAL PROJECTS</h3>
            {data.projs.map(obj=>(
                <Project {...obj} key={obj.id}/>
            ))}
            
        </div>
    )
}
export default PersonalProjs;
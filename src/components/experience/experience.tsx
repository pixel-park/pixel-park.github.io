import './experience.css';
function Experience(){
    const exper = [
        {role: `Front End Developer`, company:{title:'Code-River', href:'http://riverco.de/'}, place: 'Kyiv City, Ukraine', period: 'September 2020 - August 2022', id: 1},
        {role: `Front End Developer`, company:{title:'Freelance ', href:null}, place: 'Kyiv City, Ukraine', period: 'January 2020 - May 2021', id: 2},
        {role: `VFX Generalist`, company:{title:'Babich Design', href:null}, place: 'Kyiv, Ukraine', period: 'September 2011 – January 2020', id: 3},
        {role: `3D Generalist`, company:{title:'Brain Drain Train', href:null}, place: 'Kyiv, Ukraine', period: 'December 2008 – September 2011', id: 4},
        {role: `3D Designer`, company:{title:'PDR (Property Design Resources)', href:null}, place: 'Kyiv, Ukraine', period: 'September 2005 – December 2008', id: 5},
        {role: `Video Editor`, company:{title:'Kyiv Regional TV Channel', href:null}, place: 'Kyiv, Ukraine', period: 'April 2004 – August 2005', id: 6},
    ]
    return(
        <div className="experience__wrapper">
            <h3 className='green compact'>EXPERIENCE</h3>
            {exper.map((item)=>(
                <div key={item.id}>
                <h4 className='gray'>{item.role}</h4>
                <ul>
                    <li>
                        <h5>
                            {item.company.href && <a href={item.company.href} target="_blank" rel='noreferrer'>{item.company.title}</a>}
                            {!item.company.href && item.company.title} | {item.place} | {item.period}
                        </h5>
                    </li>
                </ul>
                </div>
            ))}
            
        </div>
    )
}
export default Experience;
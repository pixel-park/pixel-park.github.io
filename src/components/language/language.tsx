import './language.css';
function Language(){
    const lang = [
        {lang: 'English', level: 'upper intermediate', id: 1},
        {lang: 'Russian', level: 'native', id: 2},
        {lang: 'Persian/Farsi', level: 'native', id: 3},
        {lang: 'Ukrainian', level: 'fluent', id: 4},
    ]
    return(
        <div className="language__wrapper">
            <hr className='devider'/>
            <h3 className='green compact'>LANGUAGES</h3>
            {lang.map((item)=>(
                <div key={item.id}>
                    <strong className='gray'>{item.lang}</strong> - {item.level}
                </div>
            ))}
            
        </div>
    )
}
export default Language;
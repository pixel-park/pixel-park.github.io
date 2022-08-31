import './awards.css';
function Awards(){
    const aws = [
        {
            content:`I've made a tool for creating and management of crowd systems by the help of a plug-in "thinking particles" in 3ds max. The plug-in itself is a kind of visual programming environment, so this was a starting point for me to get closer to coding. There were several publications on different sites about my crowd system. Here are some links:`,
            link_1: {
                title : 'https://evermotion.org/articl...',
                href : 'https://evermotion.org/articles/show/9644/tp-intelligent-crowd',
                id : 1,
            },
            link_2: {
                title : 'https://cgpress.org/archiv...',
                href : 'https://cgpress.org/archives/tp-intelligent-crowd-system.html',
                id : 2,
            },
            link_3: {
                title : 'https://3d1.com.br/notic...',
                href : 'https://3d1.com.br/noticia/64238',
                id : 3,
            },
            link_4: {
                title : 'https://www.foro3d.com/f...',
                href : 'https://www.foro3d.com/f13/intelligent-tp-crowd-lite-124829.html',
                id : 4,
            },
            id: 5
        },
    ]
    return(
        <div className="awards__wrapper">
            <h3 className='green compact'>AWARDS</h3>
                {aws.map((elm:any)=>(
                    <div key={elm.id}>
                        <p>{elm.content}</p>
                        {Object.keys(elm).filter(key=>key.includes('link')).map((link:string)=>(
                                <div key={elm[link].id} className="awards__link_container">
                                    <a href={elm[link].href} target="_blank">{elm[link].title}</a>
                                </div>
                            )
                        )}
                    </div>
                ))}
        </div>
    )
}
export default Awards;
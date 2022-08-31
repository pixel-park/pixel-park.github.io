import './header.css';
import Image from '../image/image';
function Header () {
    const information = [
        {   
            id : 1,
            href : null,
            text : 'Braine Le Chateau - Belgium',
            target : null
        },
        {
            id : 2,
            href : 'mailto: houman@ukr.net',
            text : 'houman@ukr.net',
            target : null
        },
        {
            id : 3,
            href : 'https://www.linkedin.com/in/houman-badr/',
            text : 'Linkedin',
            target : '_blank'
        },
        {
            id : 4,
            href : 'https://github.com/pixel-park',
            text : 'GitHub',
            target : '_blank'
        }
    ]
    const styles = {
        container : {
            marginTop : "10px"
        }
    }
    return (
        <header className='header__wrapper'>
            <div className="title compact">
                <h2>Houman Badr</h2>
                <h5 className='green'>Front-end developer</h5>
            </div>
            <div className="info__container compact">
                <ul>
                    {information.map(info=>(
                        <li key={info.id}>
                            {info.href && <a href={info.href} target={info.target ? info.target : ''}>{info.text}</a>}
                            {!info.href && info.text}
                        </li>
                    ))}
                </ul>
                
            </div>
            <div style={styles.container}>
                <Image adr='pic.jpg' width={300} height={420} title="Houman Badr"/>
            </div>
        </header>
    )
}
export default Header;
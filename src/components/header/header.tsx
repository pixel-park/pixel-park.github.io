import './header.css';
import { useRef, useEffect } from 'react';
import Paralax from '../../tools/paralax.js';

type info = {
    id: number;
    href: string | null;
    text: string;
    target: null | '_blank'
}
function Header() {
    const information: info[] = [
        {
            id: 1,
            href: null,
            text: 'Braine Le Chateau - Belgium',
            target: null
        },
        {
            id: 2,
            href: 'mailto: houman@ukr.net',
            text: 'houman@ukr.net',
            target: null
        },
        {
            id: 3,
            href: 'https://www.linkedin.com/in/houman-badr/',
            text: 'Linkedin',
            target: '_blank'
        },
        {
            id: 4,
            href: 'https://github.com/pixel-park',
            text: 'GitHub',
            target: '_blank'
        }
    ]
    const styles = {
        container: {
            marginTop: "10px"
        }
    }
    const photo = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (photo !== undefined) {
            new Paralax(photo.current);
        }
    }, [])
    return (
        <header className='header__wrapper'>
            <div className="title compact over">
                <h2>Houman Badr</h2>
                <h5 className='green'>full Stack Javascript Developer</h5>
            </div>
            <div className="info__container compact">
                <ul>
                    {information.map(info => (
                        <li key={info.id}>
                            {info.href && <a href={info.href} target={info.target ? info.target : ''}>{info.text}</a>}
                            {!info.href && info.text}
                        </li>
                    ))}
                </ul>

            </div>
            {/* <div style={styles.container}>
                <Image adr='pic.jpg' width={300} height={420} title="Houman Badr"/>
            </div> */}
            <div style={styles.container} ref={photo}>

            </div>
        </header>
    )
}
export default Header;
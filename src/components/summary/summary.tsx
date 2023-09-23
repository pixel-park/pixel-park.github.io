import './summary.css'
type content = {
    title: string | null;
    text: string;
    id: number;
}
function Summary() {
    const content: content[] = [
        { title: `Full stack developer: `, text: ` HTML, CSS (Sass, Less), JavaScript/TypeScript, Node js/Express/MongoDb, React/Redux, Vue, svelte, Three.js, React-three-fiber, GSAP, Git, npm, and php`, id: 1 },
        { title: `15 years experienced VFX-Generalist: `, text: ` 3ds Max, Photoshop, After Effects, Blackmagic Fusion, pftrack, Thinkbox Krakatoa, etc. `, id: 2 },
        { title: null, text: `Competencies include the creation of visual content: scripting, lighting, photography & filming, 3D modeling/animation rendering, visual effects making, 2D design, motion design, etc.`, id: 3 },
        { title: null, text: `Enjoy solving complex problems and creating new solutions both independently and collaboratively in a team setting`, id: 4 }
    ]
    return (
        <div className="summary__wrapper">
            <h3 className='green compact'>SUMMARY OF QUALIFICATIONS</h3>
            <ul>
                {content.map(item => (
                    <li key={item.id}>{item.title && <strong className='gray'>{item.title}</strong>}{item.text}</li>
                ))}
            </ul>
        </div>
    )
}

export default Summary;
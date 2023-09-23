import "./summary.css";
type content = {
  title: string | null;
  text: string;
  id: number;
};
function Summary() {
  const content: content[] = [
    {
      title: null,
      text: `Versatile Developer with expertise in building web applications and a background in CG & VFX (Generalist in computer graphics and visual effects). Possess several years of experience in the IT field, encompassing both frontend and backend development, with a strong foundation established in 2018.`,
      id: 0,
    },
    {
      title: `As a Full Stack Developer proficient in a wide range of technologies including: `,
      text: ` HTML, CSS, JavaScript/TypeScript, Node js/Express/MongoDb, React/Redux, Vue, svelte, Three.js, React-three-fiber, AR.js, GSAP, Git, and npm`,
      id: 1,
    },
    {
      title: `As a 18-year experienced CG & VFX Generalist, I work with: `,
      text: ` 3ds Max, Photoshop, After Effects, Blackmagic Fusion, pftrack, Thinkbox Krakatoa, Thinking particles, etc. `,
      id: 2,
    },
  ];
  return (
    <div className="summary__wrapper">
      <h3 className="green compact">SUMMARY OF QUALIFICATIONS</h3>
      <ul>
        {content.map((item) => (
          <li key={item.id}>
            {item.title && <strong className="gray">{item.title}</strong>}
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Summary;

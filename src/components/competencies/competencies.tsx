import "./competencies.css";
type content = {
  title: string | null;
  text: string;
  id: number;
};
function Competencies() {
  const content: content[] = [
    {
      title: `Frontend Development: `,
      text: ` Creating responsive and interactive user interfaces with HTML, CSS, and JavaScript frameworks involving 3D and AR technologies.`,
      id: 0,
    },
    {
      title: `Backend Development: `,
      text: ` Designing and implementing server-side logic, databases, and APIs.`,
      id: 1,
    },
    {
      title: `Visual Effects: `,
      text: ` Extensive experience in 3D modeling, animation rendering, visual effects creation, and motion design. `,
      id: 2,
    },
    {
      title: `Problem Solving: `,
      text: ` Enjoy tackling complex challenges and finding innovative solutions, both independently and collaboratively. `,
      id: 3,
    },
  ];
  return (
    <div className="competency__wrapper">
      <h3 className="green compact">COMPETENCIES</h3>
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

export default Competencies;

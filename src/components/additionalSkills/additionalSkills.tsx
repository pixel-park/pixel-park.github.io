import "./additionalSkills.css";
type content = {
  title: string | null;
  text: string;
  id: number;
};
function AdditionalSkills() {
  const content: content[] = [
    {
      title: `Database Design: `,
      text: ` Proficient in designing databases for web applications.`,
      id: 0,
    },
    {
      title: `Server-Side Logic: `,
      text: ` Experienced in developing server-side logic and APIs.`,
      id: 1,
    },
    {
      title: `Project Management: `,
      text: ` Skilled in managing projects and coordinating teams. `,
      id: 2,
    },
    {
      title: `Additive Manufacturing Optimization: `,
      text: ` Knowledgeable in optimizing designs for 3D printing, including functional concept creation and mass printing suitability, with hands-on experience operating a 3D printer. `,
      id: 3,
    },
  ];
  return (
    <div className="additional-skills__wrapper">
      <h3 className="green compact">ADDITIONAL SKILLS</h3>
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

export default AdditionalSkills;

import './image.css';
type imageProps = {
  adr: string;
  width: number;
  height: number;
  title:string;
}

function Image (props:imageProps) {
    let screenWidth:number = window.innerWidth;
    let maxWidth:number = 1000;
    screenWidth = screenWidth > maxWidth ? maxWidth : screenWidth;
    let imgUrl : [string, number, number, string];
    imgUrl = [props.adr, screenWidth * props.width / maxWidth, screenWidth * props.height / maxWidth, props.title];
    
    return (
      <div className="image__container" style={{ "--pic-width": props.width + 'px'} as React.CSSProperties}>
          <img src={imgUrl[0]} title={imgUrl[3]} width={imgUrl[1]} height={imgUrl[2]} alt={imgUrl[3]}/>
      </div>
    );
}
export default Image;
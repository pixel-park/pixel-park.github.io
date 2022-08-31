import { useEffect, useRef, useState } from 'react';
import './project.css';


type imageProps = {
    id : number;
    projColor : string;
    backImage : string | null;
    title : {
        url : string | null;
        title : string;
    };
    topImage : string | null;
    textA : string;
    iFrame : null | {
        url : string;
        height : number[] | null;
    };
    textB : string | null;
    expand : null | {
        title : string[];
        text : string;
        link : null | {
            url : string;
            title : string;
        }
    };
    link : null | {
        url : string;
        title : string;
    };
  }

function Project(props:imageProps){
    const [more, setMore] = useState(0);
    const [paragHeight, setHeight] = useState(0);
    const hiddenP = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        const overalHeight = hiddenP.current && Array.from(hiddenP.current.children).reduce((ocum, curr)=> ocum + curr.getBoundingClientRect().height, 0);
        setHeight(Math.ceil(overalHeight ? overalHeight : 0)) 
    },[hiddenP])
    const readMore = ()=>{
        if(more > 0){
            setMore(0)
            if(hiddenP.current){
                hiddenP.current.style.height = 0 + 'px';
            }
        } else {
            setMore(1)
            if(hiddenP.current){
                hiddenP.current.style.height = paragHeight + 'px';
            }
        }
    }

    return (
        <div>
            <div className="project-title">
                {props.title.url ? <a href={props.title.url} target="_blank" rel="noreferrer">{props.title.title}</a> : <p>{props.title.title}</p>}
            </div>
        <div className="project__container"
        style={{
            "--color": props.projColor,
            "--back": props.backImage,
            "--iHeightMin" : props.iFrame?.height ? props.iFrame?.height[0] + 'px' : '0px',
            "--iHeightMax" : props.iFrame?.height ? props.iFrame?.height[1] + 'px' : '0px',  
            "--paragHeight" : paragHeight + 'px',
            } as React.CSSProperties}>
            {props.topImage && <img src={props.topImage} alt="props.title.title" />}
            <p>{props.textA}</p>
            {props.iFrame && <iframe src={props.iFrame.url} title={props.title.title}></iframe>}
            {props.textB && <p>{props.textB}</p>}
            {props.expand && 
            <>
                <div className="hidden-text__container" ref={hiddenP}>
                    <div> {props.expand.text}
                    {props.expand.link && <a href={props.expand.link.url} target="_blank" rel="noreferrer">{props.expand.link.title}</a>}
                    </div>
                </div>
                <button onClick={readMore}>{props.expand.title[more]}</button>
            </>
            }
            {props.link && 
            <a href={props.link.url} target="_blank" rel="noreferrer">{props.link.title}</a>
            }
            
        </div>
        </div>
    )
}
export default Project;
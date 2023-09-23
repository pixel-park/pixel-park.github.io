import { ReactElement, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

//cursor effect\\
const trace  : number[][] = [[0,0],[0,0]];
function hit(e:any){
    let sx :number;
    let sy : number;
    if(e.type === 'mousemove'){
        sx = e.clientX;
        sy = e.clientY;
    } else {
        sx = e.touches[0].clientX;
        sy = e.touches[0].clientY;
    }
    const pointCoords : number[] = [sx, sy];
    trace.unshift(pointCoords);
    trace.length = 2;
    
    const a = trace[0][0] - trace[1][0];
    const b = trace[0][1] - trace[1][1];
    const c = Math.hypot(a,b);
    let theta = Math.atan2(a, b); // range (-PI, PI]
    theta *= 180 / Math.PI;
  
    const x = Math.max(Math.min(a * c, 200),-200) + ((Math.random()*100)-50);
    const y = Math.max(Math.min(b * c, 200),-200) + ((Math.random()*100)-50);
    
    if(e.target.classList.contains('letter')){
        gsap.to(e.target, {
            opacity: 0, 
            x,
            y,
            rotate: theta + ((Math.random()*90)-45) ,
            repeat: 0,
            color: 'red',
            duration: 1,
            stagger:{
                each:0.5,
                onComplete:function():any{ 
                     // @ts-ignore         
                  gsap.to(this.targets()[0], {
                    scale: 1, 
                    x: 0,
                    y: 0,
                    color: 'inherit',
                    rotate: 0,
                    duration: 0,
                    onComplete:function(){               
                        gsap.to(this.targets()[0], {    
                        opacity: 1,
                        duration: "random(1, 6)",
                        delay: "random(0.5, 3)",
                        ease: "power1.in"
                        })
                      }
                    })
                }
              }
        })   
    }  
}
window.addEventListener('mousemove', hit);
window.addEventListener('touchmove', hit)

//\/\/\/\/\/\/\/\/\/\\/\/\/\/\
function contentRebuild(wrapper:HTMLElement, massive:string[], word:string, index:number, preParent:null | HTMLElement, link:boolean){
    if(index===0 && !word.trim().length && word !== '\n')return
    if(index > 0 && word !== '\n' && massive[index - 1] !== '\n'){
        const space = document.createElement('div');
        space.classList.add('space', 'letter', 'uu');
        space.innerText = ' ';
        if(preParent !== null){
            preParent.appendChild(space);
        } else {
            wrapper.appendChild(space);
        }
        const beforeSpace: any = space.previousSibling;
        const beforeTop = beforeSpace?.getBoundingClientRect().top;
        const spaceTop = space.getBoundingClientRect().top;
        if(beforeTop !== spaceTop){
            space.remove()
        }
    }
    const wordDiv = document.createElement('div');
    wordDiv.classList.add('uu', 'word');
    const letters = word.split('');
    letters.forEach((letter:string)=>{
        if(letter === '\n'){
            const br = document.createElement('br');
                wrapper.appendChild(br);
        }
        else {
            const div = document.createElement('div');
            div.classList.add(letter===' ' ? 'space' : 'letter', 'uu', 'letter');
            if(link)div.classList.add('anchor');
            div.innerText = letter;
            wordDiv.appendChild(div)
        }
    })
    if(preParent !== null){
        preParent.appendChild(wordDiv)
        wrapper.appendChild(preParent)
    } else {
        wrapper.appendChild(wordDiv)
    }
    
    
}

function TextExplode(props: { children: ReactElement }){
    let content = useRef(null);
    const textToLetters = (node: any)=>{
        if(node.children.length === 0 && !Array.from(node.childNodes).map((elm:any)=>elm.nodeName).includes("#text")){return }
        
        if(Array.from(node.childNodes).map((elm:any)=>elm.nodeName).includes("#text")){
                if(node.childNodes.length > 1){
                    const textWrapper : HTMLElement = node;
                    const structure = Array.from(textWrapper.childNodes).reduce((ocum:any, current:ChildNode, index:number)=>{
                        const elm : any = textWrapper.childNodes[index];
                        if(current.nodeName === "#text"){
                            ocum[index] = {
                                "tagName" : null,
                                "text" : elm.textContent
                            }
                        } else {
                            ocum[index] = {
                                "tagName" : elm.tagName.toLowerCase(),
                                "classList" : elm.classList.length ? Array.from(elm.classList) : null,
                                "id" : elm.id.length ? elm.id : null,
                                "text" : elm.innerText,
                                "link" : elm.tagName === "A" ? {
                                    href : elm.getAttribute('href'),
                                    target : elm.getAttribute('target')
                                } : null,
                            }
                        }
                        return ocum
                    },{});
                
                    //recreation of complex nodes -->
                    textWrapper.innerText = '';
                    Object.keys(structure).forEach((key:string)=>{
                        if(!structure[key].tagName){

                            if(structure[key].text.trim().length < 1)return

                            const words = structure[key].text.split(' ');
                    
                            words.forEach((word:string, index:number)=>{
                                contentRebuild(textWrapper, words, word, index, null, false)
                            })
                        } else {
                            const tag = structure[key];
                            const container = document.createElement(tag.tagName);
                            
                            if(tag.link){
                                container.setAttribute('href', tag.link.href);
                                container.setAttribute('target', tag.link.target);
                            }
                            if(tag.classList){    
                                tag.classList.forEach((className:string)=>{container.classList.add(className)})
                            }
                            if(tag.tagName === "br"){
                                textWrapper.appendChild(container);
                                return
                            }
                            const words = structure[key].text.split(' ');
                            words.forEach((word:string, index:number)=>{
                                contentRebuild(textWrapper, words, word, index, container, !!tag.link)
                            })
                        }
                    })

                } else if(!Array.from(node.classList).includes('uu')){
                    const textWrapper : HTMLElement | HTMLAnchorElement= node;
                    const text : string = textWrapper.innerText;
                    const link : {} | null = textWrapper.tagName !== "A" ? null : {
                        href : textWrapper.getAttribute("href"),
                        target : textWrapper.getAttribute("target"),
                    } 
                    textWrapper.innerText = '';
                    
                    if(text.trim().length < 1)return

                    const words = text.split(' ');
            
                    words.forEach((word:string, index:number)=>{
                        contentRebuild(textWrapper, words, word, index, null, !!link)
                    })
                    
                } 
        }
        
        Array.from(node.children).forEach((child:any)=>{
            
            textToLetters(child)
        })
    }
   
    useEffect(()=>{
        const root = content.current;
        textToLetters(root!)
    },[])

    return(
        <div ref={content}>
            {props.children}
        </div>
    )
}
export default TextExplode;
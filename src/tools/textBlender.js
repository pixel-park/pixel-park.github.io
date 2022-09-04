function worder(text){
  let word = "";
  const parts = [];
  for (let i = 0; i < text.length; i++) {
      const element = text[i];
      if(element !== " "){
        word += element
      } else if(element === "\n"){
        parts.push([word])
        parts.push(["\n"])
        word = "";
      } else {
        parts.push([word])
        parts.push(["&nbsp;"])
        word = "";
      }
      if(i+1 === text.length){
        parts.push([word])
      }
  }
  if(text.length === 0){
    return [[""]];
  }
  return parts
}

export const textSplit = (htmlSelector, wordClass = "word")=>{
  return new Promise((resolve)=>{
  const el = document.querySelectorAll(htmlSelector);
  for (let o = 0; o < el.length; o++) {
    const currentTarget = el[o];
    const elNodes = currentTarget.childNodes;
    const nodeStructure = [];
    for(let i = 0; i<elNodes.length; i++){
      if(elNodes[i].localName === undefined){
        if(i === 0){
          nodeStructure.push([false,false,false,elNodes[i].textContent.slice(1)])
        } else{
          nodeStructure.push([false,false,false,elNodes[i].textContent])
        }
      } else{
        nodeStructure.push([elNodes[i].localName,elNodes[1].className,elNodes[1].id,elNodes[i].textContent])
      }
  }
  currentTarget.innerHTML = '';
  for(let i =0; i<nodeStructure.length; i++){
    const localTag = nodeStructure[i][0] || "div";
    const localClass = nodeStructure[i][1];
    const localId = nodeStructure[i][2];
    const wordyContent = worder(nodeStructure[i][3])
    for(let k = 0; k < wordyContent.length; k++){
          const char = wordyContent[k].join(" ");
          const letter = document.createElement(localTag);
          if(localClass)letter.classList.add(localClass);
          if(localId)letter.id = localId;
          if(char === '\n'){
              letter.classList.add('next-line')
          }else{
              letter.classList.add(wordClass);
              letter.style.display = "inline-block";
          }

          letter.innerHTML = char;
          // || i+1 === nodeStructure.length
          if(char.length || localTag === "br"){ // -------->extra empty div with no coordinates creation filter
            currentTarget.insertAdjacentElement('beforeEnd', letter);
          }
      }
  }
}
resolve(htmlSelector)
})
}

export const liner = (selectorHtml, threshold, lineClass = "line")=>{return new Promise((resolve)=>{
  const el = document.querySelectorAll(selectorHtml)
  let newLine = "";
  let htmlContent = [];
 for (let i = 0; i < el.length; i++) {
   const parrentElement = el[i];
   const element = el[i].childNodes;
   for (let k = 0; k < element.length; k++) {
     let index = k - 1;
     if(k === 0){index = k}
     const insideText = element[k].innerHTML;
     const currentContent = element[k].outerHTML;
     const currentHeight = element[k].offsetTop;
     const previouseHeight = element[index].offsetTop;
     if( currentHeight - previouseHeight < threshold){
        newLine += currentContent
     } else {
       htmlContent.push([newLine]);
       let filterFirstSpace = currentContent;
       if(insideText === "&nbsp;" || !insideText.length){filterFirstSpace = ""}
       newLine = filterFirstSpace;
     }
     if(k+1 === element.length){
      htmlContent.push([newLine]);
     }
   }
   newLine = "";

   parrentElement.innerHTML = "";
   for (let f = 0; f < htmlContent.length; f++) {
     const item = htmlContent[f];
     const divLine = document.createElement("div");
     divLine.classList.add(lineClass);
     divLine.innerHTML = item;
     parrentElement.insertAdjacentElement('beforeend', divLine)
   }
   htmlContent = [];
 }
 resolve(selectorHtml)
})}

export const lineSplit = (parrentSelector, LineSelector) => {
  return new Promise((resolve)=>{
    const wrappers = document.querySelectorAll(parrentSelector);
    for (let k = 0; k < wrappers.length; k++) {
      const current = wrappers[k].querySelectorAll(LineSelector);
      const elementor = [];
    for (let i = 0; i < current.length; i++) {
      const element = current[i];
      elementor.push([element.innerHTML])
    }
    elementor[elementor.length-1]+="<div></div>"
    for (let i = 0; i < current.length; i++) {
      const element = current[i];
      element.outerHTML = elementor[i];
    }
    }
    resolve(true)
  })
}

export function splietter(el){
  let elArr = el.innerHTML = el.innerText.split('');
  el.innerHTML = '';
  for(let i = 0; i < elArr.length; i++){
      let char = elArr[i];
      if(char === ' '){
          char = '&#160;';
          }
      let letter = document.createElement('div');
      if(char == '\n'){
          letter.classList.add('enter')
      }else{
          letter.classList.add('letter');
      }
      letter.innerHTML = char;
      el.insertAdjacentElement('beforeEnd', letter);
  }
}
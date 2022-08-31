import image from "./tall.jpg";
import image_depth from "./tall_depth.jpg";

function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
  }

  const touchScreen = isTouchDevice();
class Paralax{
    constructor(target){
        this.target = target;
        this.images = "tall";
        this.img = new Image();
        this.depth = new Image();

        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseActive = false;
        this.inert = 0
       
        this.crop = 0;
        this.inertia = true;
        this.touch = true;
        this.twoFinger = true;
        this.parentHeightStyle = this.target.parentNode.style.height;

        this.cropImg(image, this.crop).then(load=>{this.img.src = load});
    
        this.cropImg(image_depth, this.crop).then(load=>{this.depth.src = load});
      
    

        const promises = [this.imgLoader(), this.depthLoader()];
        
        Promise.all(promises).then(()=>{
                    this.setStyles();
                    this.setCanvs();
                    this.setSize();
                    this.setGl();
                    this.setTexture( this.img, "img", 0);
                    this.setTexture(this.depth, "depth", 1);
                    this.mouseWatch();
                   if(this.touch && touchScreen)this.touchWatch();
                    this.resizeWatch();
                    this.photoObserve();
                    this.loop();
        })
    }
   
    setStyles(){
        Object.assign(this.target.style,{
            zIndex : 0,
            position: "relative",
            // left: 0,
            // top: 0,
            // right: 0,
            // bottom: 0,
            pointerEvents: "all",
        })
    }
    imgLoader(){
        this.color = "iE"
       return new Promise(r=>{
           this.img.onload = r
        });
         
    }
    depthLoader(){
        return new Promise(r=> this.depth.onload = r);
    }
    cropImg(img, cropFactor){
        return new Promise(resolve=>{
            const image = new Image();
            image.src = img;
            image.onload = ()=>{
                const subtraction = image.height * cropFactor / 100;
                const cropedHeight = image.height - subtraction;
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = cropedHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image,0,0,image.width,cropedHeight,0,0,image.width,cropedHeight);
                const src = canvas.toDataURL("image/png");
                resolve(src); 
            }
        })  
    }
   
    setCanvs(){
        this.canvas = document.createElement("canvas");
        this.canvas.height = this.img.height;
        this.canvas.width = this.img.width;
        this.target.appendChild(this.canvas);
    }
    
    setSize(){
        const upperWrapper = this.target.parentNode;
        
        const container = {
            w: 0,
            h: 0,
        }
        const imgs = {
            w : this.img.width,
            h : this.img.height,
            aspect(){return this.h / this.w},
        }; 
        const scrn = {
            w : this.target.parentNode.offsetWidth,
            h : this.target.parentNode.offsetHeight,
            aspect(){return this.w / this.h},
        };
        container.w = Math.min(Math.max(scrn.w * 36 / 100, 100), 340)
        container.h = container.w * imgs.aspect();
       
        const wrapperH = container.h;
        Object.assign(this.canvas.style, {
            width: container.w + "px",
            height: container.h + "px",
            objectFit: "contain",
            objectPosition: "center top"
            // position: "relative"
        })
    
        Object.assign(this.target.style,{
                height : this.target.offsetHeight > container.h ? wrapperH + "px" : this.parentHeightStyle,
        })
        Object.assign(upperWrapper.style,{
            height : upperWrapper.offsetHeight > container.h ? wrapperH + "px" : this.parentHeightStyle,
    })
   
        this.imgCoords = this.canvas.getBoundingClientRect();       
    
    }
   
    setGl(){
    this.gl = this.canvas.getContext("webgl");

    this.vertices = [-1, -1, -1, 1, 1, -1, 1, 1];

    this.buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);

    this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(0);

    this.vshader = `
    attribute vec2 pos;
    varying vec2 vpos;
    void main(){
        vpos = pos*-0.5 + vec2(0.5);
        gl_Position = vec4(pos, 0.0, 1.0);
    }
    `
    this.vs = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(this.vs,this.vshader);
    this.gl.compileShader(this.vs);

    this.fshader = `
    precision highp float;
    uniform sampler2D img;
    uniform sampler2D depth;
    uniform vec2 mouse;
    varying vec2 vpos;
    void main(){
        float dp = -0.5 + texture2D(depth, vpos).x;

        gl_FragColor = texture2D(img, vpos + mouse * 0.05 * dp);

    }
    `
    this.fs = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(this.fs, this.fshader);
    this.gl.compileShader(this.fs);

    this.program = this.gl.createProgram();
    this.gl.attachShader(this.program, this.fs);
    this.gl.attachShader(this.program, this.vs);
    this.gl.linkProgram(this.program);
    this.gl.useProgram(this.program);

    
    }

    setTexture(im, name, num){
        this.texture = this.gl.createTexture();
        this.gl.activeTexture(this.gl.TEXTURE0 + num);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, im);
        this.gl.uniform1i(this.gl.getUniformLocation(this.program, name), num);
    }

    onmousemove(d){
        this.mouseLoc = this.gl.getUniformLocation(this.program, "mouse");

        
        let x = d.clientX - this.imgCoords.left;
        let y = d.clientY - this.imgCoords.top;
        
        x = Math.min(Math.max(0, x), this.imgCoords.width);
        y = Math.min(Math.max(0, y), this.imgCoords.height);

        let xOut = d.clientX - (this.imgCoords.left - this.imgCoords.width * 2);
        let YOut = d.clientY - (this.imgCoords.top - this.imgCoords.height);
        xOut = Math.min(Math.max(0, xOut), this.imgCoords.width * 3);
        YOut = Math.min(Math.max(0, YOut), this.imgCoords.height * 2.5);
        
        this.mpos = [(-0.5 + x / this.canvas.offsetWidth)*1.0, (0.5 - y / this.canvas.offsetHeight)*1.0];

        const out = [(-0.5 + xOut / (this.canvas.offsetWidth * 3))*1.0, (0.5 - YOut / (this.canvas.offsetHeight * 2.5))*1.0];

        this.mouseActive = Math.abs(out[0]) < 0.49 && Math.abs(out[1]) < 0.49;
        
        if(!this.inertia)this.gl.uniform2fv(this.mouseLoc, new Float32Array(this.mpos));
    }
    ontouchmove(d){
        if(d.touches.length !== 1)return
        if(this.twoFinger)d.preventDefault()
        this.mouseLoc = this.gl.getUniformLocation(this.program, "mouse");
        
        let x = d.touches[0].clientX - this.imgCoords.left;
        let y = d.touches[0].clientY - this.imgCoords.top;
       
        x = Math.min(Math.max(0, x), this.imgCoords.width);
        y = Math.min(Math.max(0, y), this.imgCoords.height);

        let xOut = d.touches[0].clientX - (this.imgCoords.left - this.imgCoords.width * 2);
        let YOut = d.touches[0].clientY - (this.imgCoords.top - this.imgCoords.height);
        xOut = Math.min(Math.max(0, xOut), this.imgCoords.width * 3);
        YOut = Math.min(Math.max(0, YOut), this.imgCoords.height * 2.5);
        
        this.mpos = [(-0.5 + x / this.canvas.offsetWidth)*1.0, (0.5 - y / this.canvas.offsetHeight)*1.0];

        const out = [(-0.5 + xOut / (this.canvas.offsetWidth * 3))*1.0, (0.5 - YOut / (this.canvas.offsetHeight * 2.5))*1.0];

        this.mouseActive = Math.abs(out[0]) < 0.49 && Math.abs(out[1]) < 0.49;
       
        
        if(!this.inertia)this.gl.uniform2fv(this.mouseLoc, new Float32Array(this.mpos));
    }
   
   mouseWatch(){
    
    this.target.parentNode.parentNode.addEventListener("mousemove", this.onmousemove.bind(this))
   }
   touchWatch(){
    this.target.addEventListener("touchmove", this.ontouchmove.bind(this))
   }

   resizeWatch(){
    const run = ()=>{
        const pause = setTimeout(() => {
         this.setSize();
         this.setSize();
         clearTimeout(pause)
        }, 50);
    }
       window.addEventListener("resize", run)
       window.addEventListener("scroll", ()=>{this.imgCoords = this.canvas.getBoundingClientRect();})
   } 

   photoObserve(){
    const options = {
        root: null,
        rootMargin: '10px 0px',
        threshold: 0
    }
    const act = (entries)=>{
        if(entries[0].isIntersecting){
            this.pause = false;
            this.loop();
        } else {
            this.pause = true;
            window.cancelAnimationFrame(this.req)
        }         
    }
    const watch = new IntersectionObserver(act, options)
    watch.observe(this.target)
  }

   loop(){ 
    if(this.mpos !== undefined && this.inertia && this.mouseActive){
        this.mouseX += 0.05*(this.mpos[0] - this.mouseX);
        this.mouseY += 0.05*(this.mpos[1] - this.mouseY);
        this.gl.uniform2fv(this.mouseLoc, new Float32Array([this.mouseX, this.mouseY]));   
    }
    if(!this.mouseActive && this.mpos && (this.mouseX !== 0 || this.mouseY !== 0)){
        this.mouseX = this.mouseX > 0 ? Math.max(this.mouseX - 0.01, 0) : Math.min(this.mouseX + 0.01, 0);
        this.mouseY = this.mouseY > 0 ? Math.max(this.mouseY - 0.01, 0) : Math.min(this.mouseY + 0.01, 0);
        this.gl.uniform2fv(this.mouseLoc, new Float32Array([this.mouseX, this.mouseY]));  
    }
    
    this.gl.clearColor(0.25, 0.65, 1, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    if(!this.pause){
        this.req = requestAnimationFrame(this.loop.bind(this));
    }
}
}
export default Paralax;

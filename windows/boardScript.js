const canvas = document.querySelector("canvas"),
ctx = canvas.getContext("2d");

let isDrawing = false,
brushWidht = 4;

window.addEventListener("load",()=>{
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

const startDraw =()=>{
    isDrawing = true ;
    ctx.beginPath();
    ctx.lineWidth = brushWidht;
}
const drawing = (e)=>{
    if(!isDrawing) return;
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
}

canvas.addEventListener("mousedown",startDraw);
canvas.addEventListener("mousemove",drawing);
canvas.addEventListener("mouseup",()=>{isDrawing = false})


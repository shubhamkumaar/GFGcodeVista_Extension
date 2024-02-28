const canvas = document.querySelector("canvas"),
toolBtn = document.querySelectorAll(".tool"),
slider = document.querySelector("#slider"),
clear = document.querySelector(".clear-canvas"),
save = document.querySelector(".save-img"),
ctx = canvas.getContext("2d");

let isDrawing = false,
brushWidht = 4;
selectedTool = "brush";

window.onresize = ()=>{
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

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
    if(selectedTool === "brush" || selectedTool === "eraser"){
        ctx.strokeStyle = selectedTool === "eraser"?"#0a0e0f":"#e9e9ea";
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();
    }else{

    }   
}

toolBtn.forEach( btn =>{
    btn.addEventListener('click',()=>{
        selectedTool = btn.id

        toolBtn.forEach(b =>{
            if(b != btn){
                b.classList.remove('active')
            }
        })
        btn.classList.toggle('active')
    })
})

clear.addEventListener("click",()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})
save.addEventListener("click",()=>{
    const link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();

})
slider.addEventListener("change",()=> {
    brushWidht = slider.value;
})

const setDefaultSlider = (defaultValue)=>{
    const progress = (defaultValue / slider.max) * 100;
    slider.style.background = `linear-gradient(to right, #2f8d46 ${progress}%, #ccc ${progress}%)`
}

slider.addEventListener("input",(e)=>{
    tempSlider = e.target.value;
    const progress = (tempSlider / slider.max) * 100;
    slider.style.background = `linear-gradient(to right, #2f8d46 ${progress}%, #ccc ${progress}%)`;
})
canvas.addEventListener("mousedown",startDraw);
canvas.addEventListener("mousemove",drawing);
canvas.addEventListener("mouseup",()=>{isDrawing = false})

setDefaultSlider(4)
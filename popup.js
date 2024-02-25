const boardBtn = document.querySelector("#boardBtn")
const snippitBtn = document.querySelector("#snippet") 
boardBtn.addEventListener('click',()=>{
    window.open("./windows/whiteboard.html","","width = 800px,height=600px,left=500px,top=100px")
})

snippitBtn.addEventListener('click',()=>{
    location.replace("./windows/snippet.html")
})


class unicornPlayer{
    constructor() {
        this.changeCursorImage()
        this.spawnGlitter()
    }
        
    //change cursor image
changeCursorImage(){
    let newPointer = document.createElement("newPointer")
    let game = document.getElementsByTagName("body")[0]
    game.appendChild(newPointer)
    
    //make sure the cursor image is stuck on the hidden cursor
    document.addEventListener('mousemove', function(pos){
        newPointer.style.display = "initial"
        newPointer.style.transform = `translateY(calc(${pos.clientY}px - 1vh))`;
        newPointer.style.transform += `translateX( calc(${pos.clientX}px - 0.5vw))`;           
    },false);
}

spawnGlitter(){

    let body = document.getElementsByTagName('body')[0]
    document.addEventListener('mousemove', function(pos){
        var d = Math.random()
        if (d > 0.5){
            let glitter = document.createElement("glitter")
            body.appendChild(glitter)
            glitter.style.display = "initial"
            glitter.style.filter = "hue-rotate("+String(Math.floor(Math.random() * 350))+"deg)" 
            glitter.style.transform = 'translateY('+(pos.clientY  + Math.random()*40)+'px)';
            glitter.style.transform += 'translateX('+(pos.clientX + Math.random()*60)+'px)';  
            window.setTimeout(function(){body.removeChild(glitter)}, 1000);

        }         
    },true);
}


}

        
window.addEventListener("load", () => new unicornPlayer())
class unicornPlayer{
    constructor() {
        this.changeCursorImage()
        this.createUnicorn()
        this.spawnGlitter()
    }
        
    //change cursor image
changeCursorImage(){
    let newPointer = document.createElement("newPointer")
    let game = document.getElementsByTagName("game")[0]
    game.appendChild(newPointer)
    //make sure the cursor image is stuck on the hidden cursor
    document.addEventListener('mousemove', function(pos){
        newPointer.style.display = "initial"
        newPointer.style.transform = 'translateY('+(pos.clientY)+'px)';
        newPointer.style.transform += 'translateX('+(pos.clientX)+'px)';            
    },false);
}

spawnGlitter(){
    let game = document.getElementsByTagName("game")[0]
    document.addEventListener('mousemove', function(pos){
        var d = Math.random()
        if (d > 0.5){
            let glitter = document.createElement("glitter")
            game.appendChild(glitter)
            glitter.style.display = "initial"
            glitter.style.filter = "hue-rotate("+String(Math.floor(Math.random() * 350))+"deg)" 
            glitter.style.transform = 'translateY('+(pos.clientY  + Math.random()*40)+'px)';
            glitter.style.transform += 'translateX('+(pos.clientX + Math.random()*60)+'px)';  
            window.setTimeout(function(){game.removeChild(glitter)}, 1000);

        }         
    },true);
}

createUnicorn(){
    //We decided to scrap the arrowkey controlled player character and use a custom cursor to interact with the surroundings.
    console.log("Class unicornPlayer Loaded")
    let unicornPlayer = document.createElement("unicornPlayer")
    let game = document.getElementsByTagName("game")[0]
    game.appendChild(unicornPlayer)
    let posX = 0
    let posY = 0
    //get an adaptive client width.
    let maxX = game.getElementsByTagName("background")[0].clientWidth
    //let maxY = game.getElementsByTagName("background")[0].clientHeight
    window.addEventListener('keydown', (e)=>{
        switch(e.key){
            case 'ArrowLeft':
                if (posX < 20){
                        posX = 20
                }    
                    posX = posX - 20
                    unicornPlayer.style.transform = "translate("+ String(posX) +"px,"+ String(posY) +"px)"
                    break;
            case 'ArrowRight':
                if (posX > maxX - 300){
                    posX = maxX - 300
                }
                    posX = posX + 20
                    unicornPlayer.style.transform = "translate("+ String(posX) +"px,"+ String(posY) +"px)"
                    break;
    
                //max lenght should be 1600px
            case 'ArrowUp':
                //      if (posY < maxY){
                //              posY = maxY * -1
                //     }    
                    posY = posY - 20
                    unicornPlayer.style.transform = "translate("+ String(posX) +"px,"+ String(posY) +"px)"
                    break;
            case 'ArrowDown':
                //   if (posY > maxY - 300){
                //       posY = maxY - 300
                //   }
                    posY = posY + 20
                    unicornPlayer.style.transform = "translate("+ String(posX) +"px,"+ String(posY) +"px)"
                    break;
            
        }
        
    })


}

}

        
window.addEventListener("load", () => new unicornPlayer())
class unicornPlayer{
    constructor() {
        console.log("Class unicornPlayer Loaded")
        let unicornPlayer = document.createElement("unicornPlayer")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(unicornPlayer)
        let posX = 0
        let posY = 0
        //krijg een adaptive client width.
        let maxX = game.getElementsByTagName("background")[0].clientWidth
        //let maxY = game.getElementsByTagName("background")[0].clientHeight
        window.addEventListener('keydown', (e)=>{
            switch(e.key){
                case 'ArrowLeft':
                    if (posX < 20){
                            posX = 20
                    }    
                        posX = posX - 20
                        unicornPlayer.style.transform = "translateX("+ String(posX) +"px)"
                        break;
                case 'ArrowRight':
                    if (posX > maxX - 300){
                        posX = maxX - 300
                    }
                        posX = posX + 20
                        unicornPlayer.style.transform = "translateX("+ String(posX) +"px)"
                        break;

                    //max lenght should be 1600px
                case 'ArrowUp':
                  //      if (posY < maxY){
                  //              posY = maxY * -1
                   //     }    
                        posY = posY - 20
                        console.log(posY)
                        unicornPlayer.style.transform = "translateY("+ String(posY) +"px)"
                        break;
                case 'ArrowDown':
                 //   if (posY > maxY - 300){
                 //       posY = maxY - 300
                 //   }
                        posY = posY + 20
                        unicornPlayer.style.transform = "translateY("+ String(posY) +"px)"
                        break;
    

            }
        })
    }
}

window.addEventListener("load", () => new unicornPlayer())
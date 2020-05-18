class unicornPlayer{
    constructor() {
        console.log("Class unicornPlayer Loaded")
        let unicornPlayer = document.createElement("unicornPlayer")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(unicornPlayer)
        let posX = 0
        window.addEventListener('keydown', (e)=>{
            switch(e.key){
                case 'ArrowLeft':
                    posX = posX - 20
                    unicornPlayer.style.transform = "translateX("+ String(posX) +"px)"
                    console.log(posX)
                    break;
                case 'ArrowRight':
                    posX = posX + 20
                    unicornPlayer.style.transform = "translateX("+ String(posX) +"px)"
                    console.log(posX)
                    break;

            }
        })
    }
}

window.addEventListener("load", () => new unicornPlayer())
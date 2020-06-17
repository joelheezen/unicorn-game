class Hint{

    constructor (x: number,y: number,h: number,w: number,message: string){
        this.setHint(x,y,h,w,message)
    }

    setHint(x: number,y: number,h: number,w: number,message: string){
        let game = document.getElementsByTagName("game")[0] as HTMLElement
        let hint = document.createElement("hint")  
        game.appendChild(hint)

        hint.style.transform = `translate(${x}vw,${y}vh)`
        hint.style.height = `${h}vh`
        hint.style.width = `${w}vw`
        hint.innerHTML = `<p>${message}</p>`

        hint.addEventListener('click',zoomin)
        
        let zoomed = document.createElement("zoomed")
        let grayfade = document.createElement('grayout')

        function zoomin(){
            new Soundeffect().playThis("readHint.mp3")
            let arrows = document.getElementsByTagName("arrows")[0]
            if (arrows != null) {
                game.removeChild(arrows)
            }
            game.appendChild(zoomed)
            game.appendChild(grayfade)

            zoomed.innerHTML = message;

            zoomed.addEventListener("click",() => zoomout())
        }

        function zoomout(){
            new Soundeffect().playThis("readHint.mp3")
            zoomed.remove()
            grayfade.remove()
        }



        

    }
    
}
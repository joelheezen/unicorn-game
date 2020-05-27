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
        

        function zoomin(){
            game.style.zoom = "450%"
            let xzoom = x - h / 2.5
            let yzoom = y - w / 2.5

            if(xzoom < 0){
                xzoom = 0
            }

            if(yzoom < 0){
                yzoom = 0
            }

            game.style.transform += `translate(-${xzoom}vw,-${yzoom}vh)`

            hint.removeEventListener('click',zoomin)
            hint.addEventListener('click',zoomout)
        }

        function zoomout(){
            game.style.zoom = "100%"
            game.style.transform = ``

            hint.removeEventListener('click',zoomout)
            hint.addEventListener('click',zoomin)
        }



        

    }
    
}
class Furniture{

    furniture : HTMLElement
    shakeBox : HTMLElement
    background : string
    contains : string

    constructor(furnx: number,furny: number, contains: string, background: string) {
        
        console.log("Class Furniture Loaded")
        this.furniture = document.createElement("furniture")
        this.shakeBox = document.createElement("shakeBox")
        let game = document.getElementsByTagName("game")[0]

        console.log(furnx)

        this.furniture.style.backgroundImage = background
        this.shakeBox.style.transform = `translate(${furnx}px,${furny}px)`
        this.furniture.classList.add('shake')

        this.furniture.addEventListener('click',function(){
            this.classList.remove('shake')
            let pickup = document.createElement("pickup")
            pickup.style.backgroundImage = contains;
            this.appendChild(pickup)
            
            this.outerHTML = this.outerHTML;
        })
        this.shakeBox.appendChild(this.furniture)
        game.appendChild(this.shakeBox)
    }
}

window.addEventListener("load", () => new Furniture(200,200,"url(assets/unicorn_jetpack.png)","url(assets/lamp.png)"))
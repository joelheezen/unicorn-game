class Furniture{

    furniture : HTMLElement
    shakeBox : HTMLElement
    background : string
    contains : string

    constructor(furnx: number,furny: number,contains: string, background: string) {
        this.makeFurniture(furnx,furny,contains,background)
    }

    makeFurniture(furnx: number,furny: number,contains: string, background: string){
        this.furniture = document.createElement("furniture")
        this.shakeBox = document.createElement("shakeBox")
        let game = document.getElementsByTagName("game")[0]

        this.furniture.style.backgroundImage = background
        this.shakeBox.style.transform = `translate(${furnx}px,${furny}px)`
        this.furniture.classList.add('shake')

        this.furniture.addEventListener('click',() => this.additem(contains))
        this.shakeBox.appendChild(this.furniture)
        game.appendChild(this.shakeBox)
    }

    additem(contains: string){
            this.furniture.classList.remove('shake')
            let pickup = document.createElement("pickup")
            pickup.style.backgroundImage = contains;
            this.furniture.appendChild(pickup)
            
            this.furniture.outerHTML = this.furniture.outerHTML;
    }


}

window.addEventListener("load", () => new Furniture(200,200,"url(assets/unicorn_jetpack.png)","url(assets/lamp.png)"))
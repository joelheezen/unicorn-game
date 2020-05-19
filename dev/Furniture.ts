class Furniture{

    furniture : HTMLElement
    background : string = "url(assets/chair.png)";
    contains : string = "url(assets/unicorn_jetpack.png)";

    constructor(furnx: number,furny: number) {
        var contains = this.contains

        console.log("Class Furniture Loaded")
        this.furniture = document.createElement("furniture")
        let game = document.getElementsByTagName("game")[0]

        this.furniture.style.backgroundImage = this.background
        this.furniture.style.transform = `translate(${furnx}px,${furny}px)`
        this.furniture.classList.add('shake')

        this.furniture.addEventListener('click',function(){
            this.classList.remove('shake')
            let pickup = document.createElement("pickup")
            pickup.style.backgroundImage = contains;
            this.appendChild(pickup)
            
            this.outerHTML = this.outerHTML;
        })
        game.appendChild(this.furniture)
    }
}

window.addEventListener("load", () => new Furniture())
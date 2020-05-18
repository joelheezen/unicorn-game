class Furniture{

    furniture : HTMLElement
    background = "url(../docs/assets/chair.png)";
    contains = "url(../docs/assets/unicorn_jetpack.png)";

    constructor() {
        var contains = this.contains

        console.log("Class Furniture Loaded")
        this.furniture = document.createElement("furniture")
        let game = document.getElementsByTagName("game")[0]

        this.furniture.style.backgroundImage = this.background
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
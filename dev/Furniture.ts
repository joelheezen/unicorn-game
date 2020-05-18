class Furniture{
    constructor() {
        console.log("Class Furniture Loaded")
        let furniture = document.createElement("furniture")
        let game = document.getElementsByTagName("game")[0]

        furniture.classList.add('shake')

        furniture.addEventListener('click',function(){
            furniture.classList.remove('shake')
        })
        game.appendChild(furniture)
    }
}

window.addEventListener("load", () => new Furniture())
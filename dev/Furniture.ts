class Furniture{
    constructor() {
        console.log("Class Furniture Loaded")
        let furniture = document.createElement("furniture")
        let game = document.getElementsByTagName("game")[0]

        game.appendChild(furniture)
    }
}

window.addEventListener("load", () => new Furniture())
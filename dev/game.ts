class Game {
    constructor() {
        console.log("Class Game Loaded")
        let background = document.createElement("background")
        let game = document.getElementsByTagName("game")[0]

        game.appendChild(background)
    }
}

window.addEventListener("load", () => new Game())
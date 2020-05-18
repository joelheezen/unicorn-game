class Game {
    constructor() {
        console.log("Class Game Loaded")
        let background = document.createElement("background")
        let game = document.getElementsByTagName("game")[0]
        background.style.backgroundImage = "url(../docs/assets/2.png)"
        game.appendChild(background)

       
    }
}

window.addEventListener("load", () => new Game())

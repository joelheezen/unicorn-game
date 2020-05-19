class Game {
    constructor() {
        console.log("Class Game Loaded")
        let background = document.createElement("background")
        let game = document.getElementsByTagName("game")[0]
        background.style.backgroundImage = "url(assets/3.png)"
        game.appendChild(background)



        // code to create character and a move to space, move this code to battlephase
        let xPosChar = 50
        let yPosChar = 50

        let character = document.createElement("character")
        game.appendChild(character)
        character.style.transform = `translate(${xPosChar}px, ${yPosChar}px)`

        let xPosClock = 500
        let yPosClock = 500

        let moveSpace = document.createElement("moveSpace")
        game.appendChild(moveSpace)
        moveSpace.style.transform = `translate(${xPosClock}px, ${yPosClock}px)`        
        moveSpace.addEventListener("click", function(){
                xPosChar = xPosClock
                yPosChar = yPosClock
                character.style.transform = `translate(${xPosChar}px, ${yPosChar}px)`
        })

    }
}

window.addEventListener("load", () => new Game())

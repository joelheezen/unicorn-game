class BattleCheck{
    constructor(){
        console.log("button created")
        let game = document.getElementsByTagName("game")[0]
        let testButton = document.createElement("button")
        testButton.style.width = "50px"
        testButton.style.height = "50px"
        testButton.style.transform = `translate(90vw, 1vh)`
        testButton.id = "check"
        game.appendChild(testButton)
        if (testButton){
            testButton.addEventListener("click", () => new BattlePhase())
        }
    }
}


class BattlePhase{
    constructor(){
        //deletes everything and puts a new background in
        console.log("button pressed, loading in battlephase")
        let game = document.getElementsByTagName("game")[0]
        let pointer = document.getElementsByTagName("newpointer")[0]
        //loops through all children and eliminates every child that is not a pointer
        while (game.firstElementChild != pointer ){
            if (game.firstChild){
                game.removeChild(game.firstChild)
            }
        }
        while (game.lastElementChild != pointer){
            if (game.lastChild) {
                game.removeChild(game.lastChild)
            }
        }
        //sets a new background
        let background = document.createElement("background")
        background.style.backgroundImage = "url(assets/2.png)"
        game.appendChild(background)
        
        // code to create character and a move to space
        let xPosChar = 0
        let yPosChar = 0
        let unicornNumber = 4
        let squares = 150
        let xPosSquare = 0
        let yPosSquare = 0
        let hoveredOverSpace :string;

        for (let i = 0; i < squares; i++) {
            let moveSpace = document.createElement("moveSpace")
            game.appendChild(moveSpace)
            moveSpace.id = "square" + i
            moveSpace.style.transform = `translate(${xPosSquare}vw, ${yPosSquare}vh)`
            xPosSquare += 6.67
            if (xPosSquare > 97){
                xPosSquare = 0
                yPosSquare += 10
            }
            
            moveSpace.addEventListener("dragover", function (event){
                event.preventDefault()
                hoveredOverSpace = moveSpace.style.transform
            })
            moveSpace.addEventListener("dragenter", function (){
                console.log("the unicorn is hovering over " + moveSpace.id)
            })
            moveSpace.addEventListener("dragleave", function (){
                console.log("the unicorn left " + moveSpace.id)
                hoveredOverSpace = ""
            })
            }

        for (let i = 1; i <= unicornNumber; i++){
            let character = document.createElement("character")
            character.draggable = true
            character.id = "player" + i
            game.appendChild(character)
            character.style.transform = `translate(${xPosChar}vw, ${yPosChar}vh)`
            character.addEventListener("dragstart", function (){
                console.log("dragging")
                console.log(character.id)
                hoveredOverSpace = character.style.transform
            })
            character.addEventListener("dragend", function (event){
                event.preventDefault()
                let draggedChar = document.getElementById(character.id)
                if (draggedChar){
                    draggedChar.style.transform = hoveredOverSpace
                }
                else{
                    console.log("draggedChar is not set")
                }
            })
        }
    }
    createBoard(){
        
    }
}


window.addEventListener("load", () => new BattleCheck())
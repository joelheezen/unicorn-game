class battlePhase{
    constructor(){

        // code to create character and a move to space
        let xPosChar = 50
        let yPosChar = 50
        let unicornNumber = 2
        let squares = 10
        let xPosClock = 500
        let yPosClock = 500
        let hoveredOverSpace :string;
        let game = document.getElementsByTagName("game")[0]


        for (let i = 0; i < squares; i++) {
        let moveSpace = document.createElement("moveSpace")
        game.appendChild(moveSpace)
        moveSpace.id = "square" + i
        let xPosSquare = xPosClock += 100
        let yPosSquare = yPosClock
        moveSpace.style.transform = `translate(${xPosSquare}px, ${yPosSquare}px)`
        moveSpace.addEventListener("dragover", function (event){
            event.preventDefault()
            hoveredOverSpace = moveSpace.style.transform
        })
        moveSpace.addEventListener("dragenter", function (){
            console.log("the unicorn is hovering over " + moveSpace.id)
            console.log(hoveredOverSpace)
        })
        moveSpace.addEventListener("dragleave", function (){
            console.log("the unicorn left " + moveSpace.id)
            hoveredOverSpace = ""
            console.log(hoveredOverSpace)
        })
        }

        for (let i = 1; i <= unicornNumber; i++){
        let character = document.createElement("character")
        character.draggable = true
        character.id = "player" + i
        game.appendChild(character)
        character.style.transform = `translate(${xPosChar}px, ${yPosChar * i}px)`
        character.addEventListener("dragstart", function (){
            console.log("dragging")
            console.log(character.id)
        })
        character.addEventListener("dragend", function (event){
            event.preventDefault()
            let draggedChar = document.getElementById(character.id)
            if (draggedChar != null){
                draggedChar.style.transform = hoveredOverSpace
            }
            else{
                console.log("draggedChar is not set")
            }
        })
        }
    }
}


window.addEventListener("load", () => new battlePhase())
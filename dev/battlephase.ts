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
        let inv = document.getElementsByTagName("inventory")[0]
        let gameChildren = new Array
        //loops through all children and eliminates every child that is not a pointer or inventory
        let children = game.children
        for (let i = 0; i < children.length; i++) {
            gameChildren.push(children[i])
        }
        gameChildren.forEach(gameChild => {
            if (gameChild != pointer && gameChild != inv){
                game.removeChild(gameChild)
            }
        });

        //sets a new background
        let background = document.createElement("background")
        background.style.backgroundImage = "url(assets/2.png)"
        game.appendChild(background)
        
        // code to create character and a move to space
        let xPosChar = 0
        let yPosChar = 0
        let unicornNumber = 4
        let inventoryItems = document.getElementsByTagName('inventory')[0].children as HTMLCollectionOf<HTMLElement>
        let squares = 140
        let xPosSquare = 0
        let yPosSquare = 0
        let hoveredOverSpace :string;

        for (let i = 0; i < squares; i++) {
            let moveSpace = document.createElement("moveSpace")
            game.appendChild(moveSpace)
            moveSpace.id = "square" + i
            moveSpace.style.transform = `translate(${xPosSquare}vw, ${yPosSquare}vh)`
            xPosSquare += 6.67
            if (xPosSquare > 93){
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
                hoveredOverSpace = ""
            })
            }

        for (let i = 0; i < unicornNumber; i++){
            console.log(typeof inventoryItems[i])
            let character = document.createElement("character")
        
            character.draggable = true
            character.id = "player" + i
            game.appendChild(character)
            character.style.transform = `translate(${xPosChar}vw, ${yPosChar}vh)`
            character.addEventListener("dragstart", function (){
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
class BattlePhase{
    constructor(){
        //deletes everything and puts a new background in
        console.log("button pressed, loading in battlephase")
        let game = document.getElementsByTagName("game")[0]
        let pointer = document.getElementsByTagName("newpointer")[0]
        let inv = document.getElementsByTagName("inventory")[0]
        let fadetonew = document.getElementsByTagName('fadetonew')[0]
        let gameChildren = new Array
        
        //loops through all children and eliminates every child that is not a pointer or inventory
        let children = game.children
        for (let i = 0; i < children.length; i++) {
            gameChildren.push(children[i])
        }
        gameChildren.forEach(gameChild => {
            if (gameChild != pointer && gameChild != inv && gameChild != fadetonew){
                game.removeChild(gameChild)
            }
        });

        //sets a new background
        let background = document.createElement("background")
        background.style.backgroundImage = "url(assets/2.png)"
        game.appendChild(background)
        
        // code to take the inventory characters and move them to a space
        let inventoryItems = document.getElementsByTagName('inventory')[0].children as HTMLCollectionOf<HTMLElement>
        let squares = 140
        let xPosSquare = 0
        let yPosSquare = 0
        let inventory = document.getElementsByTagName('inventory')[0]


        function allowDrop(ev: any) {
            ev.preventDefault();
        }
          
        function drag(ev: any) {
            ev.dataTransfer.setData("text", ev.target.id);
        }
          
        function drop(ev: any) {
            
            //stops an item from being dropped inside another item
            if(ev.target.id.substring(0,4) == "item"){
                console.log("space already has an item in it")
            }else{
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            ev.target.appendChild(document.getElementById(data));
            }
        }


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
            moveSpace.addEventListener("drop",() => drop(event))
            moveSpace.addEventListener("dragover",() => allowDrop(event))

            inventory.addEventListener("drop",() => drop(event))
            inventory.addEventListener("dragover",() => allowDrop(event))
            }

        for (let i = 0; i < inventoryItems.length; i++){
            inventoryItems[i].id = "item" + i
            inventoryItems[i].draggable = true
            inventoryItems[i].addEventListener("dragstart",() => drag(event))
        }
    }
    createBoard(){
        
    }
}

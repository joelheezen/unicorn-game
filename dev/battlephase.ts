class BattlePhase{

    startBattle: HTMLElement
    battleCover: HTMLElement
    game = document.getElementsByTagName("game")[0]
    
    constructor(stage: number){
        //deletes everything and puts a new background in
        console.log("button pressed, loading in battlephase")
        let pointer = document.getElementsByTagName("newpointer")[0]
        let inv = document.getElementsByTagName("inventory")[0]
        let fadetonew = document.getElementsByTagName('fadetonew')[0]
        let gameChildren = new Array
        
        //loops through all children and eliminates every child that is not a pointer or inventory
        let children = this.game.children
        for (let i = 0; i < children.length; i++) {
            gameChildren.push(children[i])
        }
        gameChildren.forEach(gameChild => {
            if (gameChild != pointer && gameChild != inv && gameChild != fadetonew){
                this.game.removeChild(gameChild)
            }
        });

        // sets a new background
        let background = document.createElement("background")
        background.style.backgroundImage = "url(assets/gameBackground.png)"
        this.game.appendChild(background)
        
        // code to take the inventory characters and move them to a space
        let inventoryItems = document.getElementsByTagName('inventory')[0].children as HTMLCollectionOf<HTMLElement>
        if(inventoryItems.length == 0){
                    let inventoryItem = document.createElement('inventoryItem')
                    let inventoryadd = document.getElementsByTagName("inventory")[0]
                    inventoryItem.style.backgroundImage = `url(assets/unicorn_crash_test.png)`

                    inventoryadd.appendChild(inventoryItem)
        }

        let squares = 64
        let xPosSquare = 8
        let yPosSquare = 8
        // creates an array of the spaces so you can make a layout of each map
        let spaces = document.getElementsByTagName("moveSpace")
        // new array to store the monsters in per level
        let monsters = new Array
        let monsterCount = 0
        let inventory = document.getElementsByTagName('inventory')[0]

        let gameboard = document.createElement("gameBoard")
        this.game.appendChild(gameboard)

        for (let i = 0; i < squares; i++) {
            let moveSpace = document.createElement("moveSpace")
            gameboard.appendChild(moveSpace)
            moveSpace.id = "square" + i
            moveSpace.style.transform = `translate(${xPosSquare}vh, ${yPosSquare}vh)`
            xPosSquare += 9.3
                if (xPosSquare > 73.1){
                    xPosSquare = 8
                    yPosSquare += 9.3
                }

                if(i > 31){
                moveSpace.addEventListener("drop",() => this.drop(event))
                moveSpace.addEventListener("dragover",() => this.allowDrop(event))
                }

            }

            inventory.addEventListener("drop",() => this.drop(event))
            inventory.addEventListener("dragover",() => this.allowDrop(event))

        for (let i = 0; i < inventoryItems.length; i++){
            inventoryItems[i].id = "item" + i
            inventoryItems[i].draggable = true
            inventoryItems[i].addEventListener("dragstart",() => this.drag(event))
        }
        
        let monsterTypes = ["enemy_cabinet","enemy_candle","enemy_couch","enemy_dunbell","enemy_glass_ball","enemy_lamp","enemy_plant","enemy_vase"]

        switch(stage){
            case 1:
                monsterCount = 4
                break;
            case 2:
                monsterCount = 4
                 break;
            case 3:
                monsterCount = 4
                break;
            case 4:
                monsterCount = 4
                break;
            case 5:
                monsterCount = 4
                break;
            case 6:
                monsterCount = 4
                monsterTypes = ["wizard"]
                break;
        }
        
            for (let i = 0; i < monsterCount; i++) {
                
                let monster = document.createElement("monster")
                monster.style.backgroundImage = `url(assets/${monsterTypes[Math.floor(Math.random() * monsterTypes.length)]}.png)`
                console.log(monster.style.backgroundImage)
                monster.id = "monster" + i
                monsters.push(monster)
            }
            for (let i = 0; i < monsterCount; i++) {
                let randomNumber = Math.floor(Math.random() * 31)
                console.log(randomNumber)
                if(spaces[randomNumber].firstChild){
                    i -= 1
                }
                else {
                    spaces[randomNumber].appendChild(monsters[i])
                }
            }

            this.startBattle = document.createElement('startBattle')
            this.game.appendChild(this.startBattle)
            this.startBattle.innerHTML = "Start Battle"
            this.startBattle.addEventListener("click",()=>this.prepareBoard())

            this.battleCover = document.createElement('battlecover')
            this.game.appendChild(this.battleCover)
        
        }

        allowDrop(ev: any) {
            ev.preventDefault();
        }
          
        drag(ev: any) {
            ev.dataTransfer.setData("text", ev.target.id);
        }
          
        drop(ev: any) {
            
            //stops an item from being dropped inside another item
            if(ev.target.id.substring(0,4) == "item"){
                console.log("space already has an item in it")
            }else{
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            ev.target.appendChild(document.getElementById(data));
            }

            let inventory = document.getElementsByTagName('inventory')[0]
            
            if(inventory.childNodes.length == 0){
                console.log('no items in inventory')
                this.battleCover.remove()
            }

            if(inventory.childNodes.length > 0){
                console.log('items in inventory')
                this.game.appendChild(this.battleCover)
            }
        }

        prepareBoard(){

            for (let index = 32; index < 63; index++) {
                let old_element = document.getElementById('square' + index)
                let new_element = old_element.cloneNode(true);
                old_element.parentNode.replaceChild(new_element, old_element);

                let startbattle = document.getElementsByTagName('startBattle')[0]
                startbattle.innerHTML = "End your turn"
            }

            this.enemyTurn()
        }

        enemyTurn(){
            // this piece of code is to check the else loop of the next if statement
            /*let toDelete = document.getElementById("monster0")
            if (toDelete != null && toDelete.parentNode != null){
            toDelete.parentNode.removeChild(toDelete)
            } */ 

            // if the boss lives the enemy turn starts
            if (document.getElementById("monster0")) {
                console.log("the enemies are advancing")
                let monstersLeft = document.getElementsByTagName("monster")
                let activeMonster = document.getElementById("monster" + Math.floor(Math.random() * monstersLeft.length))
                if (activeMonster != null) {
                    let spaceNow = activeMonster.parentNode as Element
                    console.log(spaceNow.id)
                    let direction = Math.floor(Math.random() * 100)
                    if (direction < 10){
                        console.log("move back")
                    }
                    else if(direction < 20 && direction >= 10) {
                        console.log("move left")
                    }
                    else if(direction < 30 && direction >= 20) {
                        console.log("move right")
                    }
                    else {
                        console.log("move forward")
                    }
                }
                console.log(activeMonster)
                //playerTurn()
            } // otherwise you should have won and the game advances to the next level
            else {
                console.log("you won")
            }
        }

        playerTurn() {
            this.enemyTurn()
        }
            
}

class BattlePhase{

    startBattle: HTMLElement
    battleCover: HTMLElement
    game = document.getElementsByTagName("game")[0]
    battleStarted = false;
    monsterCount= 0
    obstaclePlaces: any
    monsterKingImg: string
    nextLevel:number
    
    constructor(stage: number){
        //deletes everything and puts a new background in
        console.log("button pressed, loading in battlephase")
        let pointer = document.getElementsByTagName("newpointer")[0]
        let inv = document.getElementsByTagName("inventory")[0]
        let fadetonew = document.getElementsByTagName('fadetonew')[0]
        new Music().changeMusic('battleMusic.mp3')
        let gameChildren = new Array 
        this.nextLevel = stage + 1
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
                    inventoryItem.classList.add('player')
                    inventoryadd.appendChild(inventoryItem)
        }

        let squares = 64
        let xPosSquare = 8
        let yPosSquare = 8
        // creates an array of the spaces so you can make a layout of each map
        let spaces = document.getElementsByTagName("moveSpace")
        // new array to store the monsters in per level
        let monsters = new Array
        let obstacles = new Array

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
                    moveSpace.classList.add("canplace")
                }

            }

            inventory.addEventListener("drop",() => this.drop(event))
            inventory.addEventListener("dragover",() => this.allowDrop(event))

        for (let i = 0; i < inventoryItems.length; i++){
            inventoryItems[i].id = "item" + i
            inventoryItems[i].draggable = true
            inventoryItems[i].addEventListener("dragstart",() => this.drag(event))
        }
        
        let monsterTypes = ["cabinet","couch","dumbell","lamp","plant","jug"]
        let obstacleTypes = ['rock','water','tree','roadblock','lava','manhole']

        switch(stage){
            case 1:
                this.monsterCount = 6
                this.obstaclePlaces = [2,12,26,20,16,31]
                this.monsterKingImg = "plant"
                break;
            case 2:
                this.monsterCount = 7
                this.obstaclePlaces = [16,18,21,23,24,25,26,29,30,31]
                this.monsterKingImg = "couch"
                 break;
            case 3:
                this.monsterCount = 8
                this.obstaclePlaces = [17,18,19,20,21,22]
                this.monsterKingImg = "dumbell"
                break;
            case 4:
                this.monsterCount = 9
                this.obstaclePlaces = [25,26,27,28,29,30]
                this.monsterKingImg = "jug"
                break;
            case 5:
                this.monsterCount = 10
                this.obstaclePlaces = [0,2,4,6,17,19,21,23]
                this.monsterKingImg = "cabinet"
                break;
            case 6:
                this.monsterCount = 11
                this.obstaclePlaces = []
                monsterTypes = ["wizard"]
                this.monsterKingImg = "wizard"
                break;
        }
        
        for (let i = 0; i < this.obstaclePlaces.length; i++) {
            let obstacle = document.createElement("obstacle")
            obstacle.classList.add("obstacle")
            obstacle.style.backgroundImage = `url(assets/obstacle_${obstacleTypes[Math.floor(Math.random() * monsterTypes.length)]}.png)`
            obstacles.push(obstacle)
        }

        for (let i = 0; i < this.obstaclePlaces.length; i++) {
            
            if(spaces[this.obstaclePlaces[i]].firstChild){
                i -= 1
            }
            else {
                spaces[this.obstaclePlaces[i]].appendChild(obstacles[i])
            }
        }


            for (let i = 0; i < this.monsterCount; i++) {
                let monster = document.createElement("monster")
                monster.classList.add("monster")

                if(i == 0){
                    monster.style.backgroundImage = `url(assets/enemy_${this.monsterKingImg}.png)`
                }else{
                    monster.style.backgroundImage = `url(assets/enemy_${monsterTypes[Math.floor(Math.random() * monsterTypes.length)]}.png)`
                    monster.style.filter = `contrast(50%) sepia(100%) hue-rotate(230deg)`
                }
                monster.id = "monster" + i
                monsters.push(monster)
            }

            for (let i = 0; i < this.monsterCount; i++) {
                let randomNumber = Math.floor(Math.random() * 32)
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
        
        }

        allowDrop(ev: any) {
            ev.preventDefault();
        }
          
        drag(ev: any) {
            ev.dataTransfer.setData("text", ev.target.id)
            
        }
          
        drop(ev: any) {
            new Soundeffect().playThis("nes-01-00.wav")
            let data = ev.dataTransfer.getData("text")
            let element = document.getElementById(data)
            //stops an item from being dropped inside another item
            if(ev.target.id.substring(0,4) == "item"){
                console.log("space already has an item in it")
            }else if (element != null) {
                if (!element.classList.contains("gamer")) {
                    ev.preventDefault();
                    ev.target.appendChild(document.getElementById(data));
                    }
            }

            let inventory = document.getElementsByTagName('inventory')[0]
            
            if(inventory.childNodes.length == 0){
                console.log('no items in inventory')
                this.startBattle.style.opacity = "1"
            }

            if(inventory.childNodes.length > 0){
                console.log('items in inventory')
                this.startBattle.style.opacity = "0"
            }
            if (element != null){
                if (element.classList.contains("gamer") && ev.target.classList.contains("canplace")) {
                    ev.preventDefault();
                    ev.target.appendChild(document.getElementById(data));
                    element = document.getElementById(data)

                    if (this.battleStarted == true){
                        this.enemyTurn()
                    }
                }
            }

            if (element != null){
                if (element.classList.contains("gamer") && ev.target.classList.contains("monster") && ev.target.parentElement.classList.contains("canplace")) {
                    ev.preventDefault();
                    console.log("you hit a monster")
                    let monsterChild = ev.target
                    let monsterParent = monsterChild.parentNode
                    if (monsterParent) {
                        monsterParent.removeChild(monsterChild)
                        new Soundeffect().playThis("nes-05-07.wav")
                    }
                    monsterParent.appendChild(document.getElementById(data));
                    element = document.getElementById(data)

                    if (this.battleStarted == true){
                        this.enemyTurn()
                    }
                }
            }

        }

        prepareBoard(){

            let enemySide = document.getElementsByTagName('movespace')

            for (let index = 0; index <= 31; index++) {
                enemySide[index].addEventListener("drop",() => this.drop(event))
                enemySide[index].addEventListener("dragover",() => this.allowDrop(event))
                
            }

            for (let index = 31; index <= 63; index++) {
                document.getElementsByTagName('movespace')[index].classList.remove('canplace')
            }

            let startbattle = document.getElementsByTagName('startBattle')[0]
                startbattle.remove();

            this.enemyTurn()
            this.battleStarted = true
        }

        

        enemyTurn(){
            // this piece of code is to check the else loop of the next if statement
            /*let toDelete = document.getElementById("monster0")
            if (toDelete != null && toDelete.parentNode != null){
            toDelete.parentNode.removeChild(toDelete)
            } */ 
            for(let i = -1;i < this.monsterCount;i++){
            // if the boss lives the enemy turn starts
                if (document.getElementById("monster0")) {
             
                    // if this deletes monster number 2 it will fuck up
                    let activeMonster = document.getElementById("monster" + i)
                    if (activeMonster != null) {
                    
                        let spaceNow = activeMonster.parentNode as Element
                        let spaceNowPos = spaceNow.id.substring(6,8)
                        let moveMonsterTo = document.getElementsByTagName('movespace')
                        let moved = false
                        

                        while(moved == false){

                            let direction = Math.floor(Math.random() * 100)

                            let spaceToMove: any

                            if (direction <= 25){
                                console.log("move back")
                                spaceToMove = moveMonsterTo[parseInt(spaceNowPos) - 8]

                            }else if (direction > 25 && direction <= 50){
                                console.log("move left")
                                let moveto = parseInt(spaceNowPos) - 1

                                if(((moveto + 1) % 8) == 0){
                                    console.log("cant move here, retry")
                                    continue
                                }
                                spaceToMove = moveMonsterTo[moveto]
                            
                            }else if (direction > 50 && direction <= 75){
                                console.log("move right")
                                let moveto = parseInt(spaceNowPos) + 1

                                if((moveto  % 8) == 0){
                                    console.log("cant move here, retry")
                                    continue
                                }

                                spaceToMove = moveMonsterTo[moveto]
                                                       
                            }else if(direction > 75 && direction <= 100){
                                console.log("move down")

                                spaceToMove = moveMonsterTo[parseInt(spaceNowPos) + 8]

                            }

                            if(spaceToMove){
                                if(spaceToMove.childNodes.length > 0){
                                    if(spaceToMove.children[0].classList.contains("monster")){
                                        spaceToMove.appendChild(activeMonster)
                                        spaceNow.appendChild(spaceToMove.children[0])
                                        moved = true
                                    }else if(spaceToMove.children[0].classList.contains("player")){
                                        new Soundeffect().playThis("allyDie.wav")
                                        spaceToMove.removeChild(spaceToMove.childNodes[0])
                                        spaceToMove.appendChild(activeMonster)
                                        spaceToMove.style.backgroundImage = "url(assets/unicorn_dead.png)"
                                        moved = true    
                                    }else if(spaceToMove.children[0].classList.contains("obstacle")){
                                        console.log('obstacle in the way')
                                        direction = Math.floor(Math.random() * 100)
                                    }
                                }else{
                                    spaceToMove.appendChild(activeMonster)
                                    moved = true
                                } 
                            }else{
                                console.log('space doesnt exist')
                                direction = Math.floor(Math.random() * 100)
                            }
                        
                        }
                    }
                   
                
                }
                else{
                    // otherwise you should have won and the game advances to the next level
                    let board = document.getElementsByTagName("gameboard")[0]

                    if (this.nextLevel == 2){
                        board.parentNode?.removeChild(board)
                        new Level2click()
                        localStorage.setItem('unlocked','2')
                       
                    }
                    else if(this.nextLevel == 3){
                        board.parentNode?.removeChild(board)
                        new Level3click()
                        localStorage.setItem('unlocked','3')
                        
                    }
                    else if(this.nextLevel == 4){
                        board.parentNode?.removeChild(board)
                        new Level4click()
                        localStorage.setItem('unlocked','4')
                        
                    }
                    else if(this.nextLevel == 5){
                        board.parentNode?.removeChild(board)
                        new Level5click()
                        localStorage.setItem('unlocked','5')
                        
                    }
                    else if(this.nextLevel == 6){
                        board.parentNode?.removeChild(board)
                        new Level6click()
                        localStorage.setItem('unlocked','6')
                        
                    }
                    else if(this.nextLevel == 7){
                        //end the game
                    }
                    else{
                        console.log("something is fucked up")
                    }
                }

            }

            this.playerTurn()
        }

        playerTurn() {
            let unicornPlayers = new Array
            let unicornsLeft = document.getElementsByTagName("inventoryitem")
            for (let i = 0; i < unicornsLeft.length; i++) {
                unicornPlayers.push(document.getElementsByTagName("inventoryitem")[i])
            }
            
            
            // loops through all unicorns to decide which spaces are available to move to
            unicornPlayers.forEach(element => {
                element.addEventListener('dragstart', (event: { dataTransfer: { setData: (arg0: string, arg1: any) => void }; target: { id: any } }) => {
                    let spaceNow = element.parentNode.id
                    let number = Number(spaceNow.slice(6, 8))
                    let spacesThen = new Array
                    let numberTop = number - 8
                    let numberRight = number + 1
                    let numberBot = number + 8
                    let numberLeft = number -1
                    element.classList.add("gamer")
                    if (numberTop >= 0) {
                        spacesThen.push(document.getElementById("square" + numberTop))
                    }
                    if (numberRight % 8) {
                        spacesThen.push(document.getElementById("square" + numberRight))
                    }
                    if (numberBot < 64) {
                        spacesThen.push(document.getElementById("square" + numberBot))
                    }
                    if ((numberLeft + 1) % 8){
                        spacesThen.push(document.getElementById("square" + numberLeft))
                    }
                    event.dataTransfer.setData("text", event.target.id);
                    spacesThen.forEach(element => {
                        element.classList.add("canplace")
                        element.addEventListener('dragover', () => this.allowDrop(event))                        
                    });
                })
                element.addEventListener('dragend', () => {
                    element.classList.remove("gamer")
                    let oldSpaces = document.getElementsByClassName("canplace")
                    for (let i = 0; i < oldSpaces.length; i++) {
                        oldSpaces[i].classList.remove("canplace")
                    }
                    for (let i = 0; i < oldSpaces.length; i++) {
                        oldSpaces[i].classList.remove("canplace")
                    }
                    for (let i = 0; i < oldSpaces.length; i++) {
                        oldSpaces[i].classList.remove("canplace")
                    }
                })
            });
        }
}

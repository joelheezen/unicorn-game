class Furniture{

    furniture : HTMLElement
    shakeBox : HTMLElement

    constructor(furnX: number,furnY: number,furnDimX: number,furnDimY:number,contains: string, background: string) {
        this.makeFurniture(furnX,furnY,furnDimX,furnDimY,contains,background)
    }


    //makes the furniture object
    makeFurniture(furnX: number,furnY: number,furnDimX: number,furnDimY:number,contains: string, background: string){
        this.furniture = document.createElement('furniture')

        //box is neccesary for shake animation
        this.shakeBox = document.createElement('shakeBox')
        let game = document.getElementsByTagName('game')[0]

        this.furniture.style.backgroundImage = background
        this.furniture.style.height = `${furnDimY}vh`
        this.furniture.style.width = `${furnDimX}vw`
        this.shakeBox.style.transform = `translate(${furnX}vw,${furnY}vh)`
        this.furniture.classList.add('shake')

        //when clicked an item is dropped to add to your inventory
        this.furniture.addEventListener('click',() => this.additem(contains,furnX,furnY,furnDimX,furnDimY))
        
        //make sound when hovered
        this.furniture.addEventListener('mouseover',()=>{
            new Soundeffect().playThis('rumble.wav')
        })

        //put the furniture inside a box to make the shake animation work with css translate
        this.shakeBox.appendChild(this.furniture)

        //put the box with the furniture in the game
        game.appendChild(this.shakeBox)
    }

    additem(contains: string,furnX: number,furnY: number,furnDimX: number,furnDimY:number){
            
            //removes shake animation to indocate no more item
            this.furniture.classList.remove('shake')
            let game = document.getElementsByTagName("game")[0]

            // puts the item in the center of the furniture
            furnDimX = furnDimX / 2;
            furnDimY = furnDimY / 2;


            if(contains == "none"){
                new Soundeffect().playThis("noItem.mp3")
                let dustcloud = document.createElement("dustcloud")
                game.appendChild(dustcloud)

                dustcloud.style.transform = `translate(calc(${furnX}vw + ${furnDimX}vw - 50px),calc(${furnY}vh + ${furnDimY}vh - 50px))`
                dustcloud.style.transition = "3s"
                dustcloud.style.opacity = "0"

                //gives time for the changes to agnolage the css transition
                setTimeout(()=>{
                    furnY = 70;
                    dustcloud.style.transform = `translate(calc(${furnX}vw + ${furnDimX}vw - 50px),calc(${furnY}vh + ${furnDimY}vh - 50px))`
                    dustcloud.style.opacity = "1"
                    dustcloud.style.transform += "rotate(720deg)"
                },1)
                

                setTimeout(()=>{
                    dustcloud.remove()
                },3000)
            }else{
                new Soundeffect().playThis("foundItem.wav")
                let pickup = document.createElement("pickup")
                let grayout = document.createElement('grayout')
                let itemMessage = document.createElement('itemMessage')
                itemMessage.innerHTML = "You found '"+ contains.replace("_"," ") +"'"

                game.append(itemMessage)
                game.appendChild(grayout)
                game.appendChild(pickup)

                pickup.style.backgroundImage = `url(assets/${contains}.png)`
                pickup.style.transform = `translate(calc(${furnX}vw + ${furnDimX}vw - 25px),calc(${furnY}vh + ${furnDimY}vh - 25px))`

                //when the popup is clicked, remove it and add the item to your inventory
                pickup.addEventListener("click",() =>{
                    pickup.style.marginLeft = "100vw";
                    grayout.remove()
                    itemMessage.remove();
                    new Score().modifyScore(200)
                    setTimeout(()=>{
                        pickup.remove()
                    },1000)

                    //creates new element to add to inventory
                    let inventory = document.getElementsByTagName("inventory")[0]
                    let inventoryItem = document.createElement('inventoryItem')
                    inventoryItem.classList.add('player')
                    inventoryItem.style.backgroundImage = `url(assets/${contains}.png)`

                    inventory.appendChild(inventoryItem)
                })

            }
            //removes eventlistener to make furniture only give one item
            this.furniture.outerHTML = this.furniture.outerHTML;

    }

}

class EvilFurniture{

    furniture : HTMLElement
    shakeBox : HTMLElement
    skulltop: HTMLElement
    skullbottom: HTMLElement

    constructor(furnX: number,furnY: number,furnDimX: number,furnDimY:number,background: string,level:number) {
        this.makeEvilFurniture(furnX,furnY,furnDimX,furnDimY,background,level)
    }

    makeEvilFurniture(furnX: number,furnY: number,furnDimX: number,furnDimY:number, background: string,level:number){
        this.furniture = document.createElement("furniture")
        //box is neccesary for shake animation
        this.shakeBox = document.createElement("shakeBox")
        let game = document.getElementsByTagName("game")[0]

        this.furniture.style.backgroundImage = background
        this.furniture.style.height = `${furnDimY}vh`
        this.furniture.style.width = `${furnDimX}vw`
        this.shakeBox.style.transform = `translate(${furnX}vw,${furnY}vh)`
        this.furniture.classList.add('shake')

        this.furniture.addEventListener('mouseover',()=>{
            new Soundeffect().playThis("rumble.wav")
        })

        //when clicked you start the battle
        this.shakeBox.addEventListener('click',() => this.startbattle(event,level))
        this.shakeBox.appendChild(this.furniture)
        game.appendChild(this.shakeBox)
    }

    startbattle(event: any,level:number){
                
                new Soundeffect().playThis("minionFound.mp3")
                let game = document.getElementsByTagName("game")[0]

                //removes shake animation to indocate no more item
                this.furniture.classList.remove('shake')
                let grayout = document.createElement('grayout')
                let itemMessage = document.createElement('itemMessage')

                itemMessage.innerHTML = "You have found the wizards minion"
                event.target.parentElement.style.zIndex = "150"

                this.shakeBox.style.animation= "enemyappear 3s forwards"
                this.shakeBox.style.animationIterationCount = "1" 

                game.append(itemMessage)
                game.appendChild(grayout)

                this.skulltop = document.createElement('skulltop')
                this.skullbottom = document.createElement('skullbottom')

                this.furniture.appendChild(this.skulltop)
                this.furniture.appendChild(this.skullbottom)

                this.furniture.style.animation = "6s battletransition 2s forwards"
                this.furniture.style.animationIterationCount = "1" 

                let fadetonew = document.createElement("fadetonew")
                game.appendChild(fadetonew)
                
                setTimeout(() => {
                    new BattlePhase(level)
                }, 4000);

                //removes eventlistener
                this.shakeBox.outerHTML = this.shakeBox.outerHTML;

                setTimeout(() => {
                    game.removeChild(fadetonew)
                }, 6000);
    }
}


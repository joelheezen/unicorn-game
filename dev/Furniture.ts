class Furniture{

    furniture : HTMLElement
    shakeBox : HTMLElement

    constructor(furnX: number,furnY: number,furnDim: number,contains: string, background: string) {
        this.makeFurniture(furnX,furnY,furnDim,contains,background)
    }

    //makes the furniture object
    makeFurniture(furnX: number,furnY: number,furnDim: number,contains: string, background: string){
        this.furniture = document.createElement("furniture")
        //box is neccesary for shake animation
        this.shakeBox = document.createElement("shakeBox")
        let game = document.getElementsByTagName("game")[0]

        this.furniture.style.backgroundImage = background
        this.furniture.style.height = `${furnDim}vh`
        this.furniture.style.width = `${furnDim}vh`
        this.shakeBox.style.transform = `translate(${furnX}vw,${furnY}vh)`
        this.furniture.classList.add('shake')

        //when clicked an item is dropped to add to your inventory
        this.furniture.addEventListener('click',() => this.additem(contains,furnX,furnY,furnDim))
        this.shakeBox.appendChild(this.furniture)
        game.appendChild(this.shakeBox)
    }

    additem(contains: string,furnX: number,furnY: number,furnDim: number){

            //removes shake animation to indocate no more item
            this.furniture.classList.remove('shake')
            let game = document.getElementsByTagName("game")[0]

            if(contains == "none"){
                let dustcloud = document.createElement("dustcloud")

                game.appendChild(dustcloud)
            }else{

                let pickup = document.createElement("pickup")
                let grayout = document.createElement('grayout')
                let itemMessage = document.createElement('itemMessage')
                itemMessage.innerHTML = "Item '"+ contains.replace("_"," ") +"' added to inventory"

                game.append(itemMessage)
                game.appendChild(grayout)
                game.appendChild(pickup)

                //when the popup is clicked, remove it and add the item to your inventory
                pickup.addEventListener("click",() =>{
                    pickup.style.marginLeft = "100vw";
                    grayout.remove()
                    itemMessage.remove();
                    setTimeout(()=>{
                        pickup.remove()
                    },1000)
                    //Add item to inventory code here
                    let inventory = document.getElementsByTagName("inventory")[0]
                    let inventoryItem = document.createElement('inventoryItem')
                    inventoryItem.style.backgroundImage = `url(assets/${contains}.png)`

                    inventory.appendChild(inventoryItem)
                })

                furnDim = furnDim / 2 - 30;

                pickup.style.backgroundImage = `url(assets/${contains}.png)`
                pickup.style.transform = `translate(calc(${furnX}vw + ${furnDim}px),calc(${furnY}vh + ${furnDim}px))`

            }
            //removes eventlistener to make furniture only give one item
            this.furniture.outerHTML = this.furniture.outerHTML;

    }

}

window.addEventListener("load", () => testFurniture())

function testFurniture() {
    new Furniture(31,27.5,17,"unicorn_akimbo","url(assets/lamp.png)")
    new Furniture(50,7,15,"unicorn_chair","url(assets/clock.png)")
    new Furniture(44,28,40,"none","url(assets/chair.png)")
}
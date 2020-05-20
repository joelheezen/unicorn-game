class Furniture{

    furniture : HTMLElement
    shakeBox : HTMLElement

    constructor(furnX: number,furnY: number,furnDim: number,contains: string,containsId: string, background: string) {
        this.makeFurniture(furnX,furnY,furnDim,contains, containsId,background)
    }

    //makes the furniture object
    makeFurniture(furnX: number,furnY: number,furnDim: number,contains: string, containsId: string, background: string){
        this.furniture = document.createElement("furniture")
        //box is neccesary for shake animation
        this.shakeBox = document.createElement("shakeBox")
        let game = document.getElementsByTagName("game")[0]

        this.furniture.style.backgroundImage = background
        this.furniture.style.height = `${furnDim}px`
        this.furniture.style.width = `${furnDim}px`
        this.shakeBox.style.transform = `translate(${furnX}vw,${furnY}vh)`
        this.furniture.classList.add('shake')

        //when clicked an item is dropped to add to your inventory
        this.furniture.addEventListener('click',() => this.additem(contains,containsId,furnX,furnY,furnDim))
        this.shakeBox.appendChild(this.furniture)
        game.appendChild(this.shakeBox)
    }

    additem(contains: string,containsId: string,furnX: number,furnY: number,furnDim: number){

            //removes shake animation to indocate no more item
            this.furniture.classList.remove('shake')
            let pickup = document.createElement("pickup")
            let grayout = document.createElement('grayout')
            let itemMessage = document.createElement('itemMessage')
            itemMessage.innerHTML = "Item '"+ containsId +"' added to inventory"
            let game = document.getElementsByTagName("game")[0]

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

            })

            furnDim = furnDim / 2 - 30;

            pickup.style.backgroundImage = contains;
            pickup.style.transform = `translate(calc(${furnX}vw + ${furnDim}px),calc(${furnY}vh + ${furnDim}px))`

            //removes eventlistener to make furniture only give one item
            this.furniture.outerHTML = this.furniture.outerHTML;

    }


}

window.addEventListener("load", () => testFurniture())

function testFurniture() {
    new Furniture(31,27.5,100,"url(assets/present.png)","a thing","url(assets/lamp.png)")
    new Furniture(50,7,70,"url(assets/present.png)","a different thing","url(assets/clock.png)")
    new Furniture(44,28,220,"url(assets/present.png)","a different thing","url(assets/chair.png)")

}
class Furniture{

    furniture : HTMLElement
    shakeBox : HTMLElement
    background : string
    contains : string
    containsId : string

    constructor(furnx: number,furny: number,contains: string,containsId: string, background: string) {
        this.makeFurniture(furnx,furny,contains, containsId,background)
    }

    //makes the furniture object
    makeFurniture(furnx: number,furny: number,contains: string, containsId: string, background: string){
        this.furniture = document.createElement("furniture")
        //box is neccesary for shake animation
        this.shakeBox = document.createElement("shakeBox")
        let game = document.getElementsByTagName("game")[0]

        this.furniture.style.backgroundImage = background
        this.shakeBox.style.transform = `translate(${furnx}vw,${furny}vh)`
        this.furniture.classList.add('shake')

        //when clicked an item is dropped to add to your inventory
        this.furniture.addEventListener('click',() => this.additem(contains,containsId,furnx,furny))
        this.shakeBox.appendChild(this.furniture)
        game.appendChild(this.shakeBox)
    }

    additem(contains: string,containsId: string,furnx: number,furny: number){

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

            

            pickup.style.backgroundImage = contains;
            pickup.style.transform = `translate(calc(${furnx}vw + 30px),calc(${furny}vh + 25px))`

            //removes eventlistener to make furniture only give one item
            this.furniture.outerHTML = this.furniture.outerHTML;

    }


}

window.addEventListener("load", () => new Furniture(31,27.5,"url(assets/present.png)","a thing","url(assets/lamp.png)"))
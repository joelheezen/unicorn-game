class Inventory{

    inventory : HTMLElement

    constructor(){
        this.setInventory()
    }

    setInventory(){
        console.log("Created inventory")
        this.inventory = document.createElement("inventory")
        let game = document.getElementsByTagName("game")[0]

        game.appendChild(this.inventory)
    }
}

class Inventory{

    inventory : HTMLElement

    constructor(){
        this.setInventory()
    }

    setInventory(){
        this.inventory = document.createElement("inventory")
        let game = document.getElementsByTagName("game")[0]

        game.appendChild(this.inventory)
    }
}

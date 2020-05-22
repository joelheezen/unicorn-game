window.addEventListener("load", () => new Level1click())

class Startscreen{

    game = document.getElementsByTagName("game")[0]

    constructor(){
        this.setBackground()
        this.setButtons()
        this.setAssets()
        this.setScreens()
    }

    setBackground(){
        console.log("level 1 loaded")
        let background = document.createElement("background")
        background.style.backgroundImage = "url(assets/startscreen.png)"
        this.game.appendChild(background)
    }

    setAssets(){


    }

    setButtons(){

    }

    setScreens(){

    }
}

class Level1click{

    constructor(){
        this.setFurniture()
        this.setBackground()
        new Hint(60.7,9,12.5,8.6,"dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text")
        new Inventory()
    }



    setBackground(){
        let background = document.createElement("background")
        let game = document.getElementsByTagName("game")[0]
        background.style.backgroundImage = "url(assets/3.png)"
        game.appendChild(background)
    }

    setFurniture(){
        new Furniture(31,27.5,8,17,"unicorn_akimbo","url(assets/lamp.png)")
        new Furniture(50,7,7,15,"unicorn_chair","url(assets/clock.png)")
        new Furniture(44,28,20,40,"none","url(assets/chair.png)")
        new Furniture(65,28,8,35,"unicorn_rambo","url(assets/tree.png)")

        new EvilFurniture(50,57,8,20,"url(assets/plant.png)")
    }
}

class Level1Battle{


}



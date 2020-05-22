window.addEventListener("load", () => new Startscreen())

class Startscreen{

    game = document.getElementsByTagName("game")[0]
    menu = document.createElement('menu')

    constructor(){
        this.setBackground()
        this.setButtons()
        this.setAssets()
    }

    setBackground(){
        console.log("level 1 loaded")
        let background = document.createElement("background")
        background.style.backgroundImage = "url(assets/startscreen.png)"
        this.game.appendChild(background)
    }

    setAssets(){
        let title = document.createElement("title")
        title.innerHTML = "Tactical un  icorn"
        this.game.appendChild(title)

    }

    setButtons(){
        let start = document.createElement("start")
        start.innerHTML = "Start"
        let options = document.createElement("options")
        options.innerHTML = 'Options'
        let credits = document.createElement("credits")
        credits.innerHTML = "Credits"
        let quit = document.createElement("quit")
        quit.innerHTML = "Quit"

        this.menu.appendChild(start)
        this.menu.appendChild(options)
        this.menu.appendChild(credits)
        this.menu.appendChild(quit)

        this.game.appendChild(this.menu)

        start.addEventListener('click',()=>{
                        this.game.innerHTML = ""
                        new Level1click()
        })

        options.addEventListener('click',()=>{
            this.setCredits()
        })

        credits.addEventListener('click',()=>{
            this.setOptions()
        })

        quit.addEventListener('click',()=>{
            close();
        })
        
        
    }

    setCredits(){
        this.menu.remove();
    }

    setOptions(){
        this.menu.remove();
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
        new Furniture(46,28,15,40,"none","url(assets/chair.png)")
        new Furniture(65,28,8,35,"unicorn_rambo","url(assets/tree.png)")

        new EvilFurniture(50,57,8,20,"url(assets/plant.png)")
    }
}

class Level1Battle{


}



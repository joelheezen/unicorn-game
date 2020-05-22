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
        title.innerHTML = "Tactical unicorn"
        this.game.appendChild(title)

        let leftUnicorn = document.createElement("leftUnicorn")
        leftUnicorn.classList.add("bounce-left")
        this.game.appendChild(leftUnicorn)

        let rightUnicorn = document.createElement("rightUnicorn")
        rightUnicorn.classList.add("bounce-right")
        this.game.appendChild(rightUnicorn)

    }

    setButtons(){

        let startButton = document.createElement("startButton")
        startButton.innerHTML = "Start"
        let optionsButton = document.createElement("optionsButton")
        optionsButton.innerHTML = 'Options'
        let creditsButton = document.createElement("creditsButton")
        creditsButton.innerHTML = "Credits"
        let quitButton = document.createElement("quitButton")
        quitButton.innerHTML = "Quit"

        this.menu.appendChild(startButton)
        this.menu.appendChild(optionsButton)
        this.menu.appendChild(creditsButton)
        this.menu.appendChild(quitButton)

        this.game.appendChild(this.menu)

        startButton.addEventListener('click',()=>{
            this.game.innerHTML = ""
            new Level1click()
        })

        optionsButton.addEventListener('click',()=>{
            this.setOptions()
        })

        creditsButton.addEventListener('click',()=>{
            this.setCredits()      
        })

        quitButton.addEventListener('click',()=>{
            close();
        })
        
        
    }

    setCredits(){
            this.menu.innerHTML = "";

            let credits = document.createElement('credits')
            this.game.appendChild(credits)

            credits.innerHTML += "<credit>Assets</credit>"
            credits.innerHTML += "<credit>Point and click mechanics</credit"
            credits.innerHTML += "<credit>Battle mechanics</credit>"

            credits.innerHTML += "<name>Tom Faust</name>"
            credits.innerHTML += "<name>Tom Faust</name>"
            credits.innerHTML += "<name>Joel Heezen</name>"

            credits.innerHTML += "<credit>Cursor</credit>"
            credits.innerHTML += "<credit>gamerules</credit"
            credits.innerHTML += "<credit>Concept</credit>"

            credits.innerHTML += "<name>Luuk s&#039;Gravendijk</name>"
            credits.innerHTML += "<name>Luuk s&#039;Gravendijk</name>"
            credits.innerHTML += "<name>All involved</name>"

            let leave = document.createElement('leave')
            this.game.appendChild(leave)

            leave.addEventListener("click",() =>{
                credits.remove();
                leave.remove();

                this.setButtons();
            })

    }

    setOptions(){
        this.menu.innerHTML = "";
        let options = document.createElement('options')
        this.game.appendChild(options)

        options.innerHTML += "Music Volume"

        let sliderVolume = document.createElement('input')
        options.appendChild(sliderVolume)

        sliderVolume.type = "range"
        sliderVolume.min = "1"
        sliderVolume.max = "100"
        sliderVolume.value = "50"
        sliderVolume.id = 'myRange'

        options.innerHTML +="Sound effect volume"

        let soundEffectVolume = document.createElement('input')
        options.appendChild(soundEffectVolume)

        soundEffectVolume.type = "range"
        soundEffectVolume.min = "1"
        soundEffectVolume.max = "100"
        soundEffectVolume.id = 'myRange'


        let leave = document.createElement('leave')
            this.game.appendChild(leave)

            leave.addEventListener("click",() =>{
                options.remove();
                leave.remove();

                this.setButtons();
            })
        
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



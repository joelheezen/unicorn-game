window.addEventListener("load", () => new Startscreen())

class Startscreen{

    game = document.getElementsByTagName("game")[0]
    menu = document.createElement('menu')
    leftUnicorn: HTMLElement
    rightUnicorn: HTMLElement
    levelIcon: HTMLElement

    constructor(){
        this.setBackground()
        this.setButtons()
        this.setAssets()
    }

    setBackground(){
        let background = document.createElement("background")
        background.style.backgroundImage = "url(assets/startscreen.png)"
        this.game.appendChild(background)
        this.game.innerHTML += '<audio autoplay loop><source src="assets/music.mp3" type="audio/ogg"></audio>'
        document.getElementsByTagName('audio')[0].volume = 0.5
    }

    setAssets(){
        let title = document.createElement("title")
        title.innerHTML = "Tactical unicorn"
        this.game.appendChild(title)

        this.leftUnicorn = document.createElement("leftUnicorn")
        this.leftUnicorn.classList.add("bounce-left")
        this.game.appendChild(this.leftUnicorn)

        this.rightUnicorn = document.createElement("rightUnicorn")
        this.rightUnicorn.classList.add("bounce-right")
        this.game.appendChild(this.rightUnicorn)

    }

    setButtons(){

        let startButton = document.createElement("startButton")
        startButton.innerHTML = "Play"
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
            this.levelSelect()
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

    makeLevelIcon(posX: number,posY: number,width: number,height: number,levelNumber: number){
        this.levelIcon = document.createElement('level')
        this.game.appendChild(this.levelIcon)

        this.levelIcon.innerHTML = "Level " + levelNumber

        this.levelIcon.style.transform = `translate(${posX}vw,${posY}vh)`
        this.levelIcon.style.width = `${width}vw`
        this.levelIcon.style.height = `${height}vh`


    }

    levelSelect(){
        this.menu.innerHTML = ""
        this.leftUnicorn.remove()
        this.rightUnicorn.remove()

        this.makeLevelIcon(14.1,59.7,10.8,36.1,1)
        this.levelIcon.addEventListener("click",()=>{
            this.game.innerHTML = ""
            new Level1click
        })

        this.makeLevelIcon(25.7,52.8,14.75,43.05,2)
        this.levelIcon.addEventListener("click",()=>{
            this.game.innerHTML = ""
            new Level2click
        })

        this.makeLevelIcon(45.1,44.4,19.4,51.4,4)
        this.levelIcon.addEventListener("click",()=>{
            this.game.innerHTML = ""
            new Level4click
        })

        this.makeLevelIcon(40.5,65.3,9.2,30.6,3)
        this.levelIcon.addEventListener("click",()=>{
            this.game.innerHTML = ""
            new Level3click
        })

        this.makeLevelIcon(64.5,57,10.1,38.9,5)
        this.levelIcon.addEventListener("click",()=>{
            this.game.innerHTML = ""
            new Level5click
        })

        this.makeLevelIcon(74.7,45.9,17,49.9,6)
        this.levelIcon.addEventListener("click",()=>{
            this.game.innerHTML = ""
            new Level6click
        })

        let leave = document.createElement('leave')
            this.game.appendChild(leave)

            leave.addEventListener("click",() =>{
                document.getElementsByTagName('level')[0].remove()
                document.getElementsByTagName('level')[0].remove()
                document.getElementsByTagName('level')[0].remove()
                document.getElementsByTagName('level')[0].remove()
                document.getElementsByTagName('level')[0].remove()
                document.getElementsByTagName('level')[0].remove()

                leave.remove();

                this.setButtons();
                this.setAssets();
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

        options.innerHTML +="Music volume"

        let musicVolume = document.createElement('input')
        options.appendChild(musicVolume)

        musicVolume.type = "range"
        musicVolume.min = "1"
        musicVolume.max = "100"
        musicVolume.id = 'myRange'

            musicVolume.addEventListener("input",()=> {
                let volume = parseInt(musicVolume.value)
                volume = volume /100
                document.getElementsByTagName('audio')[0].volume = volume
            })

        let leave = document.createElement('leave')
        this.game.appendChild(leave)
        
    }


}

class Level1click{

    constructor(){
        this.setFurniture()
        this.setBackground()
        new Hint(70.7,9,12.5,8.6,"dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text")
        new Inventory()
    }



    setBackground(){
        let background = document.createElement("background")
        let game = document.getElementsByTagName("game")[0]
        background.style.backgroundImage = "url(assets/1.png)"
        game.appendChild(background)
    }

    setFurniture(){
        new Furniture(8.5,50,18,23,"unicorn_sword","url(assets/television.png)")
        new Furniture(27.3,25.7,9,17,"unicorn_rifle","url(assets/clock.png)")
        new Furniture(80.5,57.6,5,12.1,"none","url(assets/vase.png)")
        new Furniture(12.7,26,6.8,7.4,"unicorn_gun","url(assets/books.png)")

        new EvilFurniture(82,10.9,8,16.6,"url(assets/plant.png)")
    }
}

class Level1Battle{


}

class Level2click{

    constructor(){
        this.setFurniture()
        this.setBackground()
        new Hint(39,26,12.5,11,"dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text")
        new Inventory()
    }

    setBackground(){
        let background = document.createElement("background")
        let game = document.getElementsByTagName("game")[0]
        background.style.backgroundImage = "url(assets/2.png)"
        game.appendChild(background)
    }

    setFurniture(){
        new Furniture(7.9,36.7,6,43.4,"unicorn_laser","url(assets/long_lamp.png)")
        new Furniture(28.7,0,12.3,21.7,"unicorn_robot","url(assets/ceiling_lamp.png)")
        new Furniture(30.6,28.3,7.6,21.7,"none","url(assets/long_frame.png)")
        new Furniture(78.4,41.5,5.7,10.3,"none","url(assets/small_frame.png)")
        new Furniture(62.5,51.6,2,8.4,"unicorn_sword","url(assets/book.png)")
        new Furniture(46.6,66.7,2.8,5,"uni-corn","url(assets/mug.png)") 

        new EvilFurniture(83.1,61.7,5.6,16.5,"url(assets/fire.png)")
    }
}

class Level2Battle{

}

class Level3click{

    constructor(){
        this.setFurniture()
        this.setBackground()
        new Hint(9,12,12.5,11,"dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text")
        new Inventory()
    }

    setBackground(){
        let background = document.createElement("background")
        let game = document.getElementsByTagName("game")[0]
        background.style.backgroundImage = "url(assets/3.png)"
        game.appendChild(background)
    }

    setFurniture(){
        new Furniture(52.8,21.8,8.6,63,"unicorn_robot","url(assets/thin_lamp.png)")
        new Furniture(6.6,32.7,6.2,9.5,"unicorn_rifle","url(assets/mini_frame.png)")
        new Furniture(41.5,18.5,7.6,14.3,"none","url(assets/white_clock.png)")
        new Furniture(79.7,21.8,2.85,10.2,"none","url(assets/tiny_plant.png)")
        new Furniture(22.1,26.9,3.8,5.9,"uni-corn","url(assets/tiny_frame.png)")
        new Furniture(88.7,48.7,5.2,21.9,"unicorn_gun","url(assets/small_lamp.png)") 

        new EvilFurniture(17,57.5,9.9,11.5,"url(assets/pillow.png)")
    }
}

class Level3Battle{
    
}

class Level4click{

    constructor(){
        this.setFurniture()
        this.setBackground()
        new Hint(39,26,12.5,11,"dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text")
        new Inventory()
    }



    setBackground(){
        let background = document.createElement("background")
        let game = document.getElementsByTagName("game")[0]
        background.style.backgroundImage = "url(assets/2.png)"
        game.appendChild(background)
    }

    setFurniture(){
        new Furniture(7.9,36.7,6,43.4,"unicorn_laser","url(assets/long_lamp.png)")
        new Furniture(28.7,0,12.3,21.7,"unicorn_rifle","url(assets/ceiling_lamp.png)")
        new Furniture(30.6,28.3,7.6,21.7,"none","url(assets/long_frame.png)")
        new Furniture(78.4,41.5,5.7,10.3,"none","url(assets/small_frame.png)")
        new Furniture(62.5,51.6,2,8.4,"unicorn_gun","url(assets/book.png)")
        new Furniture(46.6,66.7,2.8,5,"unicorn_gun","url(assets/mug.png)") 

        new EvilFurniture(83.1,61.7,5.6,16.5,"url(assets/fire.png)")
    }
}

class Level4Battle{
    
}

class Level5click{

    constructor(){
        this.setFurniture()
        this.setBackground()
        new Hint(39,26,12.5,11,"dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text")
        new Inventory()
    }



    setBackground(){
        let background = document.createElement("background")
        let game = document.getElementsByTagName("game")[0]
        background.style.backgroundImage = "url(assets/2.png)"
        game.appendChild(background)
    }

    setFurniture(){
        new Furniture(7.9,36.7,6,43.4,"unicorn_laser","url(assets/long_lamp.png)")
        new Furniture(28.7,0,12.3,21.7,"unicorn_rifle","url(assets/ceiling_lamp.png)")
        new Furniture(30.6,28.3,7.6,21.7,"none","url(assets/long_frame.png)")
        new Furniture(78.4,41.5,5.7,10.3,"none","url(assets/small_frame.png)")
        new Furniture(62.5,51.6,2,8.4,"unicorn_gun","url(assets/book.png)")
        new Furniture(46.6,66.7,2.8,5,"unicorn_gun","url(assets/mug.png)") 

        new EvilFurniture(83.1,61.7,5.6,16.5,"url(assets/fire.png)")
    }
}

class Level5Battle{
    
}

class Level6click{

    constructor(){
        this.setFurniture()
        this.setBackground()
        new Hint(39,26,12.5,11,"dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text")
        new Inventory()
    }



    setBackground(){
        let background = document.createElement("background")
        let game = document.getElementsByTagName("game")[0]
        background.style.backgroundImage = "url(assets/2.png)"
        game.appendChild(background)
    }

    setFurniture(){
        new Furniture(7.9,36.7,6,43.4,"unicorn_laser","url(assets/long_lamp.png)")
        new Furniture(28.7,0,12.3,21.7,"unicorn_rifle","url(assets/ceiling_lamp.png)")
        new Furniture(30.6,28.3,7.6,21.7,"none","url(assets/long_frame.png)")
        new Furniture(78.4,41.5,5.7,10.3,"none","url(assets/small_frame.png)")
        new Furniture(62.5,51.6,2,8.4,"unicorn_gun","url(assets/book.png)")
        new Furniture(46.6,66.7,2.8,5,"unicorn_gun","url(assets/mug.png)") 

        new EvilFurniture(83.1,61.7,5.6,16.5,"url(assets/fire.png)")
    }
}

class Level6Battle{
    
}

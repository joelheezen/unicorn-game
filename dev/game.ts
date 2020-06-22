window.addEventListener("load", () => new Startscreen())

class Startscreen{

    protected game = document.getElementsByTagName('game')[0]
    protected menu = document.createElement('menu')
    private leftUnicorn: HTMLElement
    private rightUnicorn: HTMLElement
    private levelIcon: HTMLElement
    unlockStorage = window.localStorage;
    

    constructor(){
        this.game.innerHTML = ''
        this.setBackground()
        this.setButtons()
        this.setAssets()
        new Music().playMusic('music.mp3')
        new Score().displayScore()
    }

    setBackground(){
        let background = document.createElement('background')
        background.style.backgroundImage = 'url(assets/startscreen.png)'
        this.game.appendChild(background)
    }

    setAssets(){
        let title = document.createElement('title')
        title.innerHTML = 'Tactical unicorn'
        this.game.appendChild(title)

        this.leftUnicorn = document.createElement('leftUnicorn')
        this.leftUnicorn.classList.add('bounce-left')
        this.game.appendChild(this.leftUnicorn)

        this.rightUnicorn = document.createElement('rightUnicorn')
        this.rightUnicorn.classList.add('bounce-right')
        this.game.appendChild(this.rightUnicorn)

    }

    setButtons(){

        let startButton = document.createElement('startButton')
        startButton.innerHTML = 'Play'
        startButton.classList.add('button')
        let optionsButton = document.createElement('optionsButton')
        optionsButton.innerHTML = 'Options'
        optionsButton.classList.add('button')
        let creditsButton = document.createElement('creditsButton')
        creditsButton.innerHTML = 'Credits'
        creditsButton.classList.add('button')
        let quitButton = document.createElement('quitButton')
        quitButton.innerHTML = 'Quit'
        quitButton.classList.add('button')

        this.menu.appendChild(startButton)
        this.menu.appendChild(optionsButton)
        this.menu.appendChild(creditsButton)
        this.menu.appendChild(quitButton)

        this.game.appendChild(this.menu)

        startButton.addEventListener('click',()=>{
            this.levelSelect()
            new Music().playMusic('music.mp3')
            new Soundeffect().playThis('menuSelect.mp3')
        })

        optionsButton.addEventListener('click',()=>{
            this.setOptions()
            new Soundeffect().playThis("menuSelect.mp3")
        })

        creditsButton.addEventListener('click',()=>{
            this.setCredits()    
            new Soundeffect().playThis("menuSelect.mp3")
        })

        quitButton.addEventListener('click',()=>{
            window.location.href = "https://www.youtube.com/watch?v=tboEOaqhRpQ"
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

    makeLevelLock(posX: number,posY: number,width: number,height: number){
        this.levelIcon = document.createElement('levelLock')
        this.game.appendChild(this.levelIcon)

        this.levelIcon.style.transform = `translate(${posX}vw,${posY}vh)`
        this.levelIcon.style.width = `${width}vw`
        this.levelIcon.style.height = `${height}vh`
        this.levelIcon.style.backgroundImage = "url(assets/lock.png)"
    }

    levelSelect(){
        this.menu.innerHTML = ""
        this.leftUnicorn.remove()
        this.rightUnicorn.remove()
        var unlocked = this.unlockStorage.unlocked

        this.makeLevelIcon(14.1,59.7,10.8,36.1,1)
        this.levelIcon.addEventListener("click",()=>{
            this.game.innerHTML = ""
            new Soundeffect().playThis("door.wav")
            new Level1click  
        })
        
        if(unlocked >= 2){
        this.makeLevelIcon(25.7,52.8,14.75,43.05,2)
        this.levelIcon.addEventListener("click",()=>{
            this.game.innerHTML = ""
            new Soundeffect().playThis("door.wav")
            new Level2click
        })
        }else{
            this.makeLevelLock(25.7,52.8,14.75,43.05)
        }

        if(unlocked >= 3){
        this.makeLevelIcon(40.5,65.3,9.2,30.6,3)
        this.levelIcon.addEventListener("click",()=>{
            this.game.innerHTML = ""
            new Soundeffect().playThis("door.wav")
            new Level3click
        })
        }else{
            this.makeLevelLock(40.5,65.3,9.2,30.6)
        }

        if(unlocked >= 4){
        this.makeLevelIcon(45.1,44.4,19.4,51.4,4)
        this.levelIcon.addEventListener("click",()=>{
            this.game.innerHTML = ""
            new Soundeffect().playThis("door.wav")
            new Level4click
        })
        }else{
            this.makeLevelLock(45.1,44.4,19.4,51.4)
        }

        if(unlocked >= 5){
        this.makeLevelIcon(64.5,57,10.1,38.9,5)
        this.levelIcon.addEventListener("click",()=>{
            this.game.innerHTML = ""
            new Soundeffect().playThis("door.wav")
            new Level5click
        })
        }else{
            this.makeLevelLock(64.5,57,10.1,38.9)
        }

        if(unlocked >= 6){
        this.makeLevelIcon(74.7,45.9,17,49.9,6)
        this.levelIcon.addEventListener("click",()=>{
            this.game.innerHTML = ""
            new Soundeffect().playThis("door.wav")
            new Level6click
        })
        }else{
            this.makeLevelLock(74.7,45.9,17,49.9)
        }

        let leave = document.createElement('leave')
            this.game.appendChild(leave)

            leave.addEventListener("click",() =>{
            //bug where level elements where still there after going back to main menu (fixed)
            while(document.getElementsByTagName('level').length>0){
                for (let i = 0; i < document.getElementsByTagName('level').length; i++) {
                    document.getElementsByTagName('level')[i].remove()     
                }}

            while(document.getElementsByTagName('levelLock').length>0){
                for (let i = 0; i < document.getElementsByTagName('levelLock').length; i++) {
                    document.getElementsByTagName('levelLock')[i].remove()               
            }}

                

                leave.remove();
                new Soundeffect().playThis("menuBack.wav")
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

            credits.innerHTML += "<name>Luuk 's-Gravendijk</name>"
            credits.innerHTML += "<name>Luuk 's-Gravendijk</name>"
            credits.innerHTML += "<name>All involved</name>"

            let leave = document.createElement('leave')
            this.game.appendChild(leave)

            leave.addEventListener("click",() =>{
                credits.remove();
                leave.remove();
                new Soundeffect().playThis("menuBack.wav")
                this.setButtons();
            })

    }

    setOptions(){
        new Options()
    }


}


class Level1click{

    constructor(){
        new Music().changeMusic('music.mp3')
        this.setFurniture()
        this.setBackground()
        new Hint(70.7,9,15,8.6,"The room is quiet and devoid of life, yet there is something that isn't.It's whispering silently, as not to be heard. It seems like its soul is imprisoned. <br> <br> You hear chanting in the distance as the poor soul weeps. It's something you wouldnt want to have seen. Out of the item comes a slight glow and this glow's colored green.")
        new Inventory()
        new Dialogbox("unicorn_player","Where did that wizard go?*And who does he think he is, chasing my friends into here.*Dont forget that he cursed this innocent funiture*I'd better find them all before i run into him.*What does that note say?*I should start out by reading it and looking in furniture for some friends.")
    }

    setBackground(){
        let background = document.createElement("background")
        let game = document.getElementsByTagName("game")[0]
        background.style.backgroundImage = "url(assets/1.png)"
        game.appendChild(background)
        let arrows = document.createElement("arrows")
        game.appendChild(arrows)
        arrows.style.transform = "translate(64vw, 11vh)"
        let home = document.createElement('backHome')
        game.appendChild(home)
        home.addEventListener('click',() => new Startscreen)
    }

    setFurniture(){
        new Furniture(8.5,50,18,23,"unicorn_sword","url(assets/television.png)")
        new Furniture(27.3,25.7,9,17,"unicorn_rifle","url(assets/clock.png)")
        new Furniture(80.5,57.6,5,12.1,"none","url(assets/vase.png)")
        new Furniture(12.7,26,6.8,7.4,"unicorn_gun","url(assets/books.png)")

        new EvilFurniture(82,10.9,8,16.6,"url(assets/plant.png)",1)
    }
}


class Level2click{

    constructor(){
        new Music().changeMusic('music.mp3')
        this.setFurniture()
        this.setBackground()
        new Hint(60,30,15,11,"Danger gets heated, but it's gone in the night. We depend on its essence, because without it there would be no light. We are blessed by its presence. <br> <br> But this time you feel weird as the object is roaring and in the distance you see and odd-fellow. In the next fight, if you want to win, go after the poor cursed thing that seems yellow.")
        new Inventory()
        new Dialogbox("unicorn_player","What!! furniture is fighting us?*If we want to win we are going to need some more friends*I think the wizard might have gone this way!!!")
    }

    setBackground(){
        let background = document.createElement("background")
        let game = document.getElementsByTagName("game")[0]
        background.style.backgroundImage = "url(assets/2.png)"
        game.appendChild(background)

        let home = document.createElement('backHome')
        game.appendChild(home)
        home.addEventListener('click',() => new Startscreen)
    }

    setFurniture(){
        new Furniture(70.7,9.2,1.5,14.4,"unicorn_laser","url(assets/long_book.png)")
        new Furniture(36.4,68.1,15,5.1,"unicorn_mario","url(assets/couch_cushion.png)")
        new Furniture(75,50.4,21.2,28.6,"none","url(assets/red_chair.png)")
        new Furniture(83.5,23.6, 6.6,7.5,"none","url(assets/standing_clock.png)")
        new Furniture(58.1,61.4,15,17.6,"unicorn_slime","url(assets/glass_table.png)")

        new EvilFurniture(36.8,12.6,8.8,7.6,"url(assets/sun_and_cloud.png)",2)
    }

}

class Level3click{

    constructor(){
        new Music().changeMusic('music.mp3')
        this.setFurniture()
        this.setBackground()
        new Hint(9,12,12.5,11,"Where you feel most safe, enemies strike. Your life might soon be ova. You struggle and struggle, but to no prevail. The danger hides 'round the sofa. <br><br> The magic sounds like buzzing, as you look for a clue. A weird furniture attacks you, as you try to stand your ground you see its hue is colored blue.")
        new Inventory()
        new Dialogbox("unicorn_player","I can smell, his smell, his smelly smell that*SMELLS!!!*Hahah Spongebob*But in all seriousness he must have gone through this room")
    }

    setBackground(){
        let background = document.createElement("background")
        let game = document.getElementsByTagName("game")[0]
        background.style.backgroundImage = "url(assets/3.png)"
        game.appendChild(background)

        let home = document.createElement('backHome')
        game.appendChild(home)
        home.addEventListener('click',() => new Startscreen)
    }

    setFurniture(){
        new Furniture(52.8,21.8,8.6,63,"unicorn_robot","url(assets/thin_lamp.png)")
        new Furniture(6.6,32.7,6.2,9.5,"unicorn_luigi","url(assets/mini_frame.png)")
        new Furniture(41.5,18.5,7.6,14.3,"none","url(assets/white_clock.png)")
        new Furniture(79.7,21.8,2.85,10.2,"none","url(assets/tiny_plant.png)")
        new Furniture(22.1,26.9,3.8,5.9,"uni-corn","url(assets/tiny_frame.png)")
        new Furniture(88.7,48.7,5.2,21.9,"unicorn_ghost","url(assets/small_lamp.png)") 

        new EvilFurniture(17,57.5,9.9,11.5,"url(assets/pillow.png)",3)
    }
}


class Level4click{
    constructor(){
        new Music().changeMusic('music.mp3')
        this.setFurniture()
        this.setBackground()
        new Hint(39,26,12.5,11,"It brings danger and pain, my dearest red flower. Yet this enemy will be outmatched by a shower. <br> <br> Water is its enemy, but anything else it will harm. Its color is red like the roof of a barn.")
        new Inventory()
        new Dialogbox("unicorn_player","The smell is getting stronger and I feel powerful waves of magic*I hope we find him soon")
    }

    setBackground(){
        let background = document.createElement("background")
        let game = document.getElementsByTagName("game")[0]
        background.style.backgroundImage = "url(assets/4.png)"
        game.appendChild(background)

        let home = document.createElement('backHome')
        game.appendChild(home)
        home.addEventListener('click',() => new Startscreen)
    }

    setFurniture(){
        new Furniture(7.9,36.7,6,43.4,"unicorn_furniture","url(assets/long_lamp.png)")
        new Furniture(28.7,0,12.3,21.7,"unicorn_not","url(assets/ceiling_lamp.png)")
        new Furniture(30.6,28.3,7.6,21.7,"none","url(assets/long_frame.png)")
        new Furniture(78.4,41.5,5.7,10.3,"none","url(assets/small_frame.png)")
        new Furniture(62.5,51.6,2,8.4,"unicorn_bandage_girl","url(assets/book.png)")
        new Furniture(46.6,66.7,2.8,5,"unicorn_princess","url(assets/mug.png)") 

        new EvilFurniture(83.1,61.7,5.6,16.5,"url(assets/fire.png)",4)
    }
}


class Level5click{

    constructor(){
        new Music().changeMusic('music.mp3')
        this.setFurniture()
        this.setBackground()
        new Hint(55,17,14,11,"The wizard comes closer with power so great. You can hear him read spells from his scroll. As you feel the magic come from a place in which you might find your console.<br><br> The two handles on its front makes it look like a face. 'Wait a minute, did it just frown?' The wizard made enemies and for some reason his favourite minion is brown.")
        new Inventory()
        new Dialogbox("unicorn_player","The magic is starting to hurt now*aaaaAAAAaaaaAH*aaAAaaaAAAAAaaaaaaaAAAAAAAAAA*It hurts pretty bad, I cant imagine the pain my friends are in*WE NEED TO STOP HIM!!!")
    }

    setBackground(){
        let background = document.createElement("background")
        let game = document.getElementsByTagName("game")[0]
        background.style.backgroundImage = "url(assets/5.png)"
        game.appendChild(background)

        let home = document.createElement('backHome')
        game.appendChild(home)
        home.addEventListener('click',() => new Startscreen)
    }

    setFurniture(){
        new Furniture(5.2,73.1,5.3,11,"unicorn_rainbow","url(assets/plantpot.png)")
        new Furniture(33.1,20.2,6,13.5,"unicorn_shrek","url(assets/dead_plant.png)")
        new Furniture(56.6,34.45,7.6,12.7,"none","url(assets/lamp_shade.png)")
        new Furniture(18.9,56.3,4.2,7.6,"unicorn_army","url(assets/square_pillow.png)")
        new Furniture(72.6,27.7,9,16,"unicorn_super_meat_boy","url(assets/boat_frame.png)")

        new EvilFurniture(77.4,76.5,15,5.9,"url(assets/drawer.png)",5)
    }
}

class Level6click{

    constructor(){
        new Music().changeMusic('music.mp3')
        this.setFurniture()
        this.setBackground()
        new Hint(39,26,9,11,"As you walk into the room you feel a powerfull surge. It's cold like you are in a blizzard. When you find the item in witch he resides you'll find yourself fighting a wizard.")
        new Inventory()
        new Dialogbox("unicorn_player","I can feel he's in the room somewhere")
        new Dialogbox("enemy_wizard","...*...*I hope they dont find me in here*But if they do I will surely destroy them")
    }



    setBackground(){
        let background = document.createElement("background")
        let game = document.getElementsByTagName("game")[0]
        background.style.backgroundImage = "url(assets/6.png)"
        game.appendChild(background)

        let home = document.createElement('backHome')
        game.appendChild(home)
        home.addEventListener('click',() => new Startscreen)
    }

    setFurniture(){
        new Furniture(52.8,0,3.4,13.5,"unicorn_wizard","url(assets/small_ceiling_lamp.png)")
        new Furniture(69.3,14.3,10,6.7,"unicorn_asylum","url(assets/small_cabinet.png)")
        new Furniture(26.9,39.5,7.1,31.1,"unicorn_ninja","url(assets/big_plant.png)")
        new Furniture(85.8,71.4,6.2,9.3,"unicorn_dragon","url(assets/white_plantpot.png)")
        new Furniture(73.1,32.8,1.4,2.5,"none","url(assets/small_bunny.png)")
        new Furniture(57.5,63.1,5.2,8.3,"unicorn_dinosaur","url(assets/two_frames.png)")
        new Furniture(69.8,31.1,2.4,4.3,"unicorn_chocolate_chip","url(assets/large_bunny.png)") 

        new EvilFurniture(14.7,53,9.8,26,"url(assets/large_cabinet.png)",6)
    }
}


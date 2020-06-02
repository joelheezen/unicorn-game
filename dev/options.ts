class Options extends Startscreen{


    constructor(){
        super();
        
        this.menu.innerHTML = "";
        let options = document.createElement('options')
        this.game.appendChild(options)

        //all part of setting the volume of the music
        let musicOptions = document.createElement('musicOptions')
        options.appendChild(musicOptions)

        musicOptions.innerHTML += "Music Volume"

        let muteGame = document.createElement('muteGame')
        musicOptions.appendChild(muteGame)

        let musicSlider = document.createElement('input')
        musicOptions.appendChild(musicSlider)

        musicSlider.type = "range"
        musicSlider.min = "0"
        musicSlider.max = "100"
        musicSlider.id = 'myRange'

        if(document.getElementById('music') ){

            let newVolume = document.getElementById('music')!.volume * 100
            musicSlider.value = newVolume.toString()
        }else{
            musicSlider.value = '0'
        }

        if(parseInt(musicSlider.value) > 0){
            muteGame.style.backgroundImage = "url(assets/unmuted.png)"
        }else{
            muteGame.style.backgroundImage = "url(assets/muted.png)"
        }

            musicSlider.addEventListener("input",()=> {

                let volume = parseInt(musicSlider.value)
                volume = volume /100
                
                document.getElementById('music')!.volume = volume

                if(musicSlider.value !== '0'){
                    document.getElementById('music')!.play()
                    muteGame.style.backgroundImage = 'url(assets/unmuted.png)'
                }else{
                    document.getElementById('music')!.pause() 
                    muteGame.style.backgroundImage = 'url(assets/muted.png)'
                }
            })


        //all part of setting the volume for the soundeffects
        let effectOptions = document.createElement('effectOptions')
        options.appendChild(effectOptions)

        effectOptions.innerHTML += "Soundeffect Volume"

        let muteEffect = document.createElement('muteEffect')
        effectOptions.appendChild(muteEffect)

        let effectSlider = document.createElement('input')
        effectOptions.appendChild(effectSlider)

        effectSlider.type = "range"
        effectSlider.min = "0"
        effectSlider.max = "100"
        effectSlider.id = 'myRange'

        if(document.getElementById('soundeffect') ){

            let newVolume = document.getElementById('soundeffect')!.volume * 100
            effectSlider.value = newVolume.toString()
        }else{
            effectSlider.value = '0'
        }  

        if(parseInt(effectSlider.value) > 0){
            muteEffect.style.backgroundImage = "url(assets/unmuted.png)"
        }else{
            muteEffect.style.backgroundImage = "url(assets/muted.png)"
        }

        effectSlider.addEventListener("input",()=> {

                let volume = parseInt(effectSlider.value)
                volume = volume /100
                
                document.getElementById('soundeffect')!.volume = volume

                if(effectSlider.value !== '0'){
                    muteEffect.style.backgroundImage = 'url(assets/unmuted.png)'
                }else{
                    muteEffect.style.backgroundImage = 'url(assets/muted.png)'
                }
        })

        effectSlider.addEventListener("change",()=>{
            new Soundeffect().playThis('menuSelect.mp3')
        })


        let leave = document.createElement('leave')
        this.game.appendChild(leave)
        
        leave.addEventListener("click",() =>{
            options.remove();
            leave.remove();
            new Soundeffect().playThis("menuBack.wav")
            this.setButtons();
        })

    }

}
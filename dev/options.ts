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

        //make music slider
        let musicSlider = document.createElement('input')
        musicOptions.appendChild(musicSlider)

        musicSlider.type = "range"
        musicSlider.min = "0"
        musicSlider.max = "100"
        musicSlider.id = 'myRange'

        if(localStorage.getItem('musicVolume') == undefined){
            musicSlider.value = '0'
        }else{
            musicSlider.value = localStorage.getItem('musicVolume')!
        }

        //sets an image to show that music is turned off when the slider goes to 0
        if(parseInt(musicSlider.value) > 0){
            muteGame.style.backgroundImage = "url(assets/unmuted.png)"
        }else{
            muteGame.style.backgroundImage = "url(assets/muted.png)"
        }


        musicSlider.addEventListener("input",()=> {

            let volume = musicSlider.value
            
            localStorage.setItem('musicVolume',volume);
            
            (<HTMLAudioElement>document.getElementById('music')).volume = parseInt(localStorage.getItem('musicVolume')!) / 100
            
            if(musicSlider.value !== '0'){
                muteGame.style.backgroundImage = 'url(assets/unmuted.png)'
            }else{
                muteGame.style.backgroundImage = 'url(assets/muted.png)'
            }
    })


        //all part of setting the volume for the soundeffects
        let effectOptions = document.createElement('effectOptions')
        options.appendChild(effectOptions)

        effectOptions.innerHTML += "Soundeffect Volume"

        let muteEffect = document.createElement('muteEffect')
        effectOptions.appendChild(muteEffect)

        //sets sound effect slider
        let effectSlider = document.createElement('input')
        effectOptions.appendChild(effectSlider)

        effectSlider.type = "range"
        effectSlider.min = "0"
        effectSlider.max = "100"
        effectSlider.id = 'myRange'

        if(localStorage.getItem('soundEffectVolume') == undefined){
            effectSlider.value = '10'
        }else{
            effectSlider.value = localStorage.getItem('soundEffectVolume')!
        }
    

        if(parseInt(effectSlider.value) > 0){
            muteEffect.style.backgroundImage = "url(assets/unmuted.png)"
        }else{
            muteEffect.style.backgroundImage = "url(assets/muted.png)"
        }

        effectSlider.addEventListener("input",()=> {

                let volume = effectSlider.value
                
                localStorage.setItem('soundEffectVolume',volume)

                if(effectSlider.value !== '0'){
                    muteEffect.style.backgroundImage = 'url(assets/unmuted.png)'
                }else{
                    muteEffect.style.backgroundImage = 'url(assets/muted.png)'
                }
        })

        effectSlider.addEventListener("change",()=>{
            new Soundeffect().playThis('menuSelect.mp3')
        })

        let delSave = document.createElement('delSave')
        delSave.innerHTML = 'Delete save data'
        delSave.classList.add('button')
        options.appendChild(delSave)

        delSave.addEventListener('click',() =>{
            var r = confirm("Are you sure you want to delete your progress?");
            if (r == true) {
                localStorage.clear();
                window.alert('your save data was succesfully deleted.')
                location.reload();
            } 
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
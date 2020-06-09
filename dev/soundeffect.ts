class Soundeffect{
    
    constructor(){
        
    }

    playThis(src:string){

        let sound:HTMLAudioElement = document.createElement("audio");

            sound.setAttribute("preload", "metadata");
            sound.setAttribute("controls", "none");
            sound.classList.add('soundeffect')
            sound.style.display = "none";
            sound.autoplay = true

            let volume = localStorage.getItem('soundEffectVolume')

            if(volume == undefined){
                volume = '10'
            }

            let newVolume = parseInt(volume)

            sound.volume = newVolume / 100
            document.body.appendChild(sound);   

            (<HTMLAudioElement>sound).src = `assets/${src}`;
            (<HTMLAudioElement>sound).play();
            
            setTimeout(() => {
                setTimeout(() => {
                    (<HTMLAudioElement>sound).remove();
                }, (<HTMLAudioElement>sound).duration * 10000);
                
              }, 100);
    }
     

}
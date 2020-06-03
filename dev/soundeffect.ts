class Soundeffect{

    sound = document.createElement("audio");
    
    constructor(){
        
    }

    setSound(){
            this.sound.setAttribute("preload", "auto");
            this.sound.setAttribute("controls", "none");
            this.sound.id = "soundeffect"
            this.sound.style.display = "none";
            this.sound.autoplay = true
            this.sound.volume = 0.2
            document.body.appendChild(this.sound);      
    }

    playThis(src:string){
        document.getElementById('soundeffect')!.src = `assets/${src}`;
        document.getElementById('soundeffect')!.play();
    }
}
class Soundeffect{

    constructor(src:string){
        this.playSound(src)
    }

    playSound(src:string){

            let sound = document.createElement("audio");
            sound.volume = 0.2
            sound.src = src;
            sound.setAttribute("preload", "auto");
            sound.setAttribute("controls", "none");
            sound.style.display = "none";
            document.body.appendChild(sound);

            setTimeout(() => {
                sound.play();

            }, 0);
            
    }
}
class Music{

    music = document.createElement("audio");

    constructor(){
        
    }

    playMusic(src:string){
            this.music.src = `assets/${src}`;
            this.music.style.display = "none";
            this.music.id = "music"
            document.body.appendChild(this.music);
            this.music.play();
    }

    changeMusic(src:string){
        document.getElementById('music').src = `assets/${src}`;
        document.getElementById('music').play();
    }
    

}
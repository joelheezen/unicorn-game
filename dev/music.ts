class Music{

    music:HTMLAudioElement = document.createElement("audio");

    constructor(){
        
    }

    playMusic(src:string){

            if(document.getElementById('music') !== undefined){
                document.getElementById('music')?.remove()
            }

            this.music.src = `assets/${src}`;
            this.music.style.display = "none";
            this.music.id = "music"
            document.body.appendChild(this.music);
            this.music.play();
            this.music.volume = 0
    }

    changeMusic(src:string){
        (<HTMLAudioElement>document.getElementById('music')).src = `assets/${src}`;
        (<HTMLAudioElement>document.getElementById('music')).play();
    }
    

}
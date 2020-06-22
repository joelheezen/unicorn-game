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

            let volume = localStorage.getItem('musicVolume')

            if(volume == undefined){
                volume = '0'
            }

            let newVolume = parseInt(volume)

            this.music.volume = newVolume / 100;
            (<HTMLAudioElement>document.getElementById('music')).play();
    }

    changeMusic(src:string){
        (<HTMLAudioElement>document.getElementById('music')).src = `assets/${src}`;
        (<HTMLAudioElement>document.getElementById('music')).play();
    }
    

}
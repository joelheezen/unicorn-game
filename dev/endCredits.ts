class EndCredits{

    credits = document.createElement('rollCredits')
    game = document.getElementsByTagName('game')[0]

    constructor(){
        this.makeCredits()
        this.rollCredits()
    }

    makeCredits(){

        this.credits.innerHTML += "<b>Assets</b>"
        this.credits.innerHTML += "Tom Faust"
        this.credits.innerHTML += "<b>Stock Images</b>"
        this.credits.innerHTML += "Adobestock"
        this.credits.innerHTML += "<b>Point and click mechanics</b>"
        this.credits.innerHTML += "Tom Faust"
        this.credits.innerHTML += "<b>Battle mechanics</b>"
        this.credits.innerHTML += "Joel Heezen"
        this.credits.innerHTML += "<b>Cursor</b>"
        this.credits.innerHTML += "Luuk 's-Gravendijk"
        this.credits.innerHTML += "<b>gamerules</b>"
        this.credits.innerHTML += "Luuk 's-Gravendijk"
        this.credits.innerHTML += "<b>Concept</b>"
        this.credits.innerHTML += "All involved"
        this.credits.innerHTML += "<b>Sounds</b>"
        this.credits.innerHTML += "freesound.org"


        this.game.appendChild(this.credits)

        let grayout = document.createElement('grayout')
        this.game.appendChild(grayout)
           
    }

    rollCredits(){
        let creditsHeight = this.credits.offsetHeight
        let rollSpeed = creditsHeight / 60

        this.credits.style.transition = rollSpeed + "s linear"

        setTimeout(() => {
            this.credits.style.top = `-${creditsHeight}px`
        }, 100);

        setTimeout(() => {
            let end = document.createElement("theEnd")
            this.game.appendChild(end)

            setTimeout(() => {
               end.style.top = "35vh"
            }, 100);

           setInterval(() => this.fireworks(),1000)
            
           setTimeout(() => {
            location.reload();
           }, 10000);
            
        }, rollSpeed * 1000);
        
    }

    fireworks(){
        
        let firework = document.createElement('firework')
        firework.style.top = (Math.random() * 100) + 'vh'
        firework.style.left = (Math.random() * 100) + 'vw'

        let dim = (Math.random() * 40) + 50
        firework.style.width = dim + 'vh'
        firework.style.height = dim + 'vh'

        this.game.appendChild(firework)
        
        setTimeout(() => {
            firework.remove();
        }, 6500);
    }

    
}
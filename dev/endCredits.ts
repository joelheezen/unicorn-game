class EndCredits{

    credits = document.createElement('rollCredits')


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


        document.getElementsByTagName('game')[0].appendChild(this.credits)
    }

    rollCredits(){
        let creditsHeight = this.credits.offsetHeight

        this.credits.style.top = `-${creditsHeight}px`
        
    }

    
}
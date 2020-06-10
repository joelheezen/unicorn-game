class Score {

    constructor(){

    }

    displayScore(){

        if(document.getElementsByTagName('score')[0] !== undefined){
            document.getElementsByTagName('score')[0].remove()
        }
        let scoreBoard = document.createElement('score')
        document.body.appendChild(scoreBoard)
        let score = localStorage.getItem('score')

        if(score == undefined){
            score = '0'
        }

        scoreBoard.innerHTML = 'Score: '
        scoreBoard.innerHTML += score

    }

    modifyScore(modify: number){
        document.getElementsByTagName('score')[0].remove()
        let currentScore = localStorage.getItem('score')

        if(currentScore == undefined){
            currentScore = '0'
        }

        let newscore = parseInt(currentScore) + modify
        localStorage.setItem('score',newscore.toString())

        this.displayScore()

        let scoreAdd = document.createElement('scoreAdd')

        if(modify > 0){
        scoreAdd.innerHTML = "+" + modify
        new Soundeffect().playThis('score.wav')
        }else{
            scoreAdd.innerHTML = `${modify}`
            new Soundeffect().playThis('scoreDown.wav')
        }

        document.body.appendChild(scoreAdd)

        setTimeout(() => {
          scoreAdd.style.transform = "translateY(-10vh)"  
        },1);

        setTimeout(() => {
            scoreAdd.remove()
        }, 1000);
    }

    

}
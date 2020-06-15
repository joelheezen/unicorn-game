class WinScreen {

    constructor(nextLevel: number){
        this.youWon(nextLevel)
    }

    youWon(nextLevel: number){

        new Soundeffect().playThis("foundItem.wav")
        let game = document.getElementsByTagName('game')[0]

        let grayout = document.createElement('grayout')
        game.appendChild(grayout)      
    
        let uniWin1 = document.createElement('uniWin')
        uniWin1.style.left = '-20vw'
        game.appendChild(uniWin1)


        let uniWin2 = document.createElement('uniWin')
        uniWin2.style.left = '120vw'
        game.appendChild(uniWin2)

        let gameWin = document.createElement('gameWin')
        game.appendChild(gameWin)
        
        let goNext = document.createElement('tryAgain')
        goNext.innerHTML ='Next level'
        goNext.classList.add('button')
        game.appendChild(goNext)

        setTimeout(() => {
            uniWin1.style.left = '25vw'
            uniWin2.style.left = '65vw'
            gameWin.style.top = '40vh'
            goNext.style.bottom = '20vh'
        }, 500);


        goNext.addEventListener('click',()=>{
            let fadetonew = document.createElement("fadetonew")
            fadetonew.style.animation = 'fadetonew 4s';
            game.appendChild(fadetonew)
         

            setTimeout(() => {
                game.innerHTML = ""
                switch (nextLevel) {
                    case 2:
                        new Level2click();
                        break;
                    case 3:
                        new Level3click();
                        break;
                    case 4:
                        new Level4click();
                        break;
                    case 5:
                        new Level5click();
                        break;
                    case 6:
                        new Level6click();
                        break;
                }
            }, 2000);
        })
    }
}
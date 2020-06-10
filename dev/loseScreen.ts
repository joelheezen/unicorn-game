class loseScreen{
    constructor(level: number){
        this.youLost(level)
    }

    youLost(level: number){
        new Soundeffect().playThis("minionFound.mp3")
        let game = document.getElementsByTagName('game')[0]

        let grayout = document.createElement('grayout')
        game.appendChild(grayout)

        
    
        let skullPlace1 = document.createElement('skullPlace')
        skullPlace1.style.left = '-20vw'

        let skullTop1 = document.createElement('skullTop')
        let skullBottom1 = document.createElement('skullbottom')

        skullPlace1.appendChild(skullTop1)
        skullPlace1.appendChild(skullBottom1)

        game.appendChild(skullPlace1)



        let skullPlace2 = document.createElement('skullPlace')
        skullPlace2.style.left = '120vw'

        let skullTop2 = document.createElement('skullTop')
        let skullBottom2 = document.createElement('skullbottom')

        skullPlace2.appendChild(skullTop2)
        skullPlace2.appendChild(skullBottom2)

        game.appendChild(skullPlace2)


        let gameOver = document.createElement('gameOver')
        game.appendChild(gameOver)
        
        let tryAgain = document.createElement('tryAgain')
        tryAgain.innerHTML ='Try again'
        tryAgain.classList.add('button')
        game.appendChild(tryAgain)


        setTimeout(() => {
            skullPlace1.style.left = '25vw'
            skullPlace2.style.left = '65vw'
            gameOver.style.top = '30vh'
            tryAgain.style.bottom = '10vh'
        }, 500);

        tryAgain.addEventListener('click',()=>{
            let fadetonew = document.createElement("fadetonew")
            fadetonew.style.animation = 'fadetonew 4s';
            game.appendChild(fadetonew)
         

            setTimeout(() => {
                game.innerHTML = ""
                switch (level) {
                    case 1:
                        new Level1click();
                        break;
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
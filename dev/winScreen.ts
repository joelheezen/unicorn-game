class WinScreen {

    constructor(nextLevel: number){

        let game = document.getElementsByTagName('game')[0]

        let grayout = document.createElement('grayout')
        game.appendChild(grayout)

        let gameboard = document.getElementsByTagName('gameboard')[0] as HTMLElement

        gameboard.style.animation = "shake 0.5s"
        gameboard.style.animationIterationCount = "infinite"

        let explosion = setInterval(this.explosion, 200)

        this.enemyDeath(nextLevel)

        setTimeout(() => {
            clearInterval(explosion)
            gameboard.style.animation = ""

            if(nextLevel < 7){
                this.youWon(nextLevel)
            }
        }, 3000);
        
    }

    enemyDeath(nextLevel: number){
        let game = document.getElementsByTagName('game')[0]
        let enemy = document.createElement('deadEnemy')

        let levelEnemy

        switch (nextLevel) {
            case 2:
                levelEnemy = "plant"
                break;
            case 3:
                levelEnemy = "couch"
                break;
            case 4:
                levelEnemy = "dumbell"
                break;
            case 5:
                levelEnemy = "jug"
                break;
            case 6:
                levelEnemy = "cabinet"
                break;
            case 7:
                levelEnemy = "wizard"
                break;
        }

        enemy.style.backgroundImage = `url(assets/enemy_${levelEnemy}.png)`

        game.appendChild(enemy)
    }

    youWon(nextLevel: number){

        new Soundeffect().playThis("foundItem.wav")
        let game = document.getElementsByTagName('game')[0]     
    
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
         
            let board = document.getElementsByTagName("gameboard")[0]
            board.remove()
            let guide = document.getElementsByTagName('guide')[0]
            guide.remove();

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

    explosion(){

        new Soundeffect().playThis('8-bit-explosion.wav')

        let game = document.getElementsByTagName('game')[0]

        let explosion = document.createElement('explosion')
        explosion.style.top = (Math.random() * 100) + 'vh'
        explosion.style.left = (Math.random() * 100) + 'vw'

        let dim = (Math.random() * 40) + 50
        explosion.style.width = dim + 'vh'
        explosion.style.height = dim + 'vh'

        game.appendChild(explosion)
        
        setTimeout(() => {
            explosion.remove();
        }, 400);
    }
}
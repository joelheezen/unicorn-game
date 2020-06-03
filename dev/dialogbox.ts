class Dialogbox{

    game = document.getElementsByTagName('game')[0]

    constructor(player: string, message: string){
        let messages = message.split('*')
        this.newDialog(player,messages)
    }

    newDialog(player: string, messages: any){
            let dialog = document.createElement('dialogWindow')
            this.game.appendChild(dialog)

            let playerIcon = document.createElement('playerIcon')
            this.game.appendChild(playerIcon)

            let nextMessage = document.createElement('nextMessage')
            this.game.appendChild(nextMessage)
            nextMessage.innerHTML =">"

            playerIcon.style.backgroundImage = `url(assets/${player}.png)`
            
            let currentDialog = 0
            dialog.innerHTML = messages[currentDialog]
                
            dialog.addEventListener('click',() =>{
                    currentDialog += 1

                    if(currentDialog < messages.length){
                        dialog.innerHTML = ""
                        dialog.innerHTML += messages[currentDialog]
                    }else{
                        dialog.remove();
                        playerIcon.remove();
                        nextMessage.remove();
                    }
            })
                
             
    }
      
}


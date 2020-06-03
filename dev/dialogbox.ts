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
            dialog.appendChild(playerIcon)
            playerIcon.style.backgroundImage = `url(assets/${player}.png)`
            
            let messageBox = document.createElement('messageBox')
            dialog.appendChild(messageBox)

            let currentDialog = 0

            messageBox.innerHTML = messages[currentDialog]

            dialog.addEventListener('click',() =>{
                    currentDialog += 1

                    if(currentDialog < messages.length){
                        messageBox.innerHTML = ""
                        messageBox.innerHTML += messages[currentDialog]
                        
                    }else{
                        dialog.remove();
                    }
            })


                
             
    }
      
}


class unicornPlayer{
    constructor() {
        this.spawnGlitter()
        this.circleOnClick()
    }

spawnGlitter(){
    //Spawn glitter on move
    let body = document.getElementsByTagName('body')[0]
    document.addEventListener('mousemove', function(pos){
        var d = Math.random()
    
        if (d > 0.90){
            let glitter = document.createElement("glitter")
            body.appendChild(glitter)
            glitter.style.display = "initial"
            glitter.style.filter = "hue-rotate("+String(Math.floor(Math.random() * 350))+"deg)" 
            glitter.style.transform = 'translateY('+(pos.clientY  + Math.random()*40)+'px)';
            glitter.style.transform += 'translateX('+(pos.clientX + Math.random()*60)+'px)';  
            window.setTimeout(function(){body.removeChild(glitter)}, 1000);

        }         
    },true);
}

circleOnClick(){
    //spawn animated circle after click
    let body = document.getElementsByTagName('body')[0]
    document.addEventListener('mousedown', function(pos){
        let circle = document.createElement("circle")
        body.appendChild(circle)
        circle.style.display = "initial" 
        circle.style.transform = `translate(calc(${pos.clientX}px - 3vh),calc(${pos.clientY}px - 3vh)) scale(1)`;
        circle.style.transition = "all 1s"

        setTimeout(() => {
            circle.style.transform = `translate(calc(${pos.clientX}px - 3vh),calc(${pos.clientY}px - 3vh)) scale(2)`;
            circle.style.opacity = '0'
        }, 1);

        window.setTimeout(function(){body.removeChild(circle)}, 1000);

    },true);

}


}

        
window.addEventListener("load", () => new unicornPlayer())
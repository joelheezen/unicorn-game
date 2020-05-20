"use strict";
var Furniture = (function () {
    function Furniture() {
        this.background = "url(../docs/assets/chair.png)";
        this.contains = "url(../docs/assets/unicorn_jetpack.png)";
        var contains = this.contains;
        console.log("Class Furniture Loaded");
        this.furniture = document.createElement("furniture");
        var game = document.getElementsByTagName("game")[0];
        this.furniture.style.backgroundImage = this.background;
        this.furniture.classList.add('shake');
        this.furniture.addEventListener('click', function () {
            this.classList.remove('shake');
            var pickup = document.createElement("pickup");
            pickup.style.backgroundImage = contains;
            this.appendChild(pickup);
            this.outerHTML = this.outerHTML;
        });
        game.appendChild(this.furniture);
    }
    return Furniture;
}());
window.addEventListener("load", function () { return new Furniture(); });
var Game = (function () {
    function Game() {
        console.log("Class Game Loaded");
        var background = document.createElement("background");
        var game = document.getElementsByTagName("game")[0];
        background.style.backgroundImage = "url(assets/3.png)";
        game.appendChild(background);
        var xPosChar = 50;
        var yPosChar = 50;
        var character = document.createElement("character");
        game.appendChild(character);
        character.style.transform = "translate(" + xPosChar + "px, " + yPosChar + "px)";
        var xPosClock = 500;
        var yPosClock = 500;
        var moveSpace = document.createElement("moveSpace");
        game.appendChild(moveSpace);
        moveSpace.style.transform = "translate(" + xPosClock + "px, " + yPosClock + "px)";
        moveSpace.addEventListener("click", function () {
            xPosChar = xPosClock;
            yPosChar = yPosClock;
            character.style.transform = "translate(" + xPosChar + "px, " + yPosChar + "px)";
        });
    }
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var unicornPlayer = (function () {
    function unicornPlayer() {
        changeCursorImage();
        console.log("Class unicornPlayer Loaded");
        var unicornPlayer = document.createElement("unicornPlayer");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(unicornPlayer);
        var posX = 0;
        var posY = 0;
        var maxX = game.getElementsByTagName("background")[0].clientWidth;
        window.addEventListener('keydown', function (e) {
            switch (e.key) {
                case 'ArrowLeft':
                    if (posX < 20) {
                        posX = 20;
                    }
                    posX = posX - 20;
                    unicornPlayer.style.transform = "translate(" + String(posX) + "px," + String(posY) + "px)";
                    break;
                case 'ArrowRight':
                    if (posX > maxX - 300) {
                        posX = maxX - 300;
                    }
                    posX = posX + 20;
                    unicornPlayer.style.transform = "translate(" + String(posX) + "px," + String(posY) + "px)";
                    break;
                case 'ArrowUp':
                    posY = posY - 20;
                    unicornPlayer.style.transform = "translate(" + String(posX) + "px," + String(posY) + "px)";
                    break;
                case 'ArrowDown':
                    posY = posY + 20;
                    unicornPlayer.style.transform = "translate(" + String(posX) + "px," + String(posY) + "px)";
                    break;
            }
        });
        function changeCursorImage() {
            var newPointer = document.createElement("newPointer");
            var game = document.getElementsByTagName("game")[0];
            game.appendChild(newPointer);
            document.addEventListener('mousemove', function (pos) {
                newPointer.style.transform = 'translateY(' + (pos.clientY - 115) + 'px)';
                newPointer.style.transform += 'translateX(' + (pos.clientX - 20) + 'px)';
            }, false);
        }
    }
    return unicornPlayer;
}());
window.addEventListener("load", function () { return new unicornPlayer(); });
//# sourceMappingURL=main.js.map
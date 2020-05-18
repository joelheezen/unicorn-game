"use strict";
var Furniture = (function () {
    function Furniture() {
        console.log("Class Furniture Loaded");
        var furniture = document.createElement("furniture");
        var game = document.getElementsByTagName("game")[0];
        furniture.classList.add('shake');
        furniture.addEventListener('click', function () {
            furniture.classList.remove('shake');
        });
        game.appendChild(furniture);
    }
    return Furniture;
}());
window.addEventListener("load", function () { return new Furniture(); });
var Game = (function () {
    function Game() {
        console.log("Class Game Loaded");
        var background = document.createElement("background");
        var game = document.getElementsByTagName("game")[0];
        background.style.backgroundImage = "url(../docs/assets/3.png)";
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
        console.log("Class unicornPlayer Loaded");
        var unicornPlayer = document.createElement("unicornPlayer");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(unicornPlayer);
        var posX = 0;
        window.addEventListener('keydown', function (e) {
            switch (e.key) {
                case 'ArrowLeft':
                    posX = posX - 20;
                    unicornPlayer.style.transform = "translateX(" + String(posX) + "px)";
                    console.log(posX);
                    break;
                case 'ArrowRight':
                    posX = posX + 20;
                    unicornPlayer.style.transform = "translateX(" + String(posX) + "px)";
                    console.log(posX);
                    break;
            }
        });
    }
    return unicornPlayer;
}());
window.addEventListener("load", function () { return new unicornPlayer(); });
//# sourceMappingURL=main.js.map
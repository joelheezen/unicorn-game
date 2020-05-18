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
        background.style.backgroundImage = "url(../docs/assets/2.png)";
        game.appendChild(background);
    }
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
window.addEventListener("load", function () {
});
//# sourceMappingURL=main.js.map
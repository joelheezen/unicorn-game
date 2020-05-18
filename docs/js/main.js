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
        background.style.backgroundImage = "url(../docs/assets/2.png)";
        game.appendChild(background);
    }
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
window.addEventListener("load", function () {
});
function itemActive() {
    this.style.transform;
}
//# sourceMappingURL=main.js.map
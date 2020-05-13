"use strict";
var Furniture = (function () {
    function Furniture() {
        console.log("Class Furniture Loaded");
        var furniture = document.createElement("furniture");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(furniture);
    }
    return Furniture;
}());
window.addEventListener("load", function () { return new Furniture(); });
var Game = (function () {
    function Game() {
        console.log("Class Game Loaded");
    }
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
window.addEventListener("load", function () {
    var game = document.getElementsByTagName("game")[0];
    var furniture = document.createElement("furniture");
});
//# sourceMappingURL=main.js.map
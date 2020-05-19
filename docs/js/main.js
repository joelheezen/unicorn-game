"use strict";
var Furniture = (function () {
    function Furniture(furnX, furnY, furnDim, contains, containsId, background) {
        this.makeFurniture(furnX, furnY, furnDim, contains, containsId, background);
    }
    Furniture.prototype.makeFurniture = function (furnX, furnY, furnDim, contains, containsId, background) {
        var _this = this;
        this.furniture = document.createElement("furniture");
        this.shakeBox = document.createElement("shakeBox");
        var game = document.getElementsByTagName("game")[0];
        this.furniture.style.backgroundImage = background;
        this.furniture.style.height = furnDim + "px";
        this.furniture.style.width = furnDim + "px";
        this.shakeBox.style.transform = "translate(" + furnX + "vw," + furnY + "vh)";
        this.furniture.classList.add('shake');
        this.furniture.addEventListener('click', function () { return _this.additem(contains, containsId, furnX, furnY, furnDim); });
        this.shakeBox.appendChild(this.furniture);
        game.appendChild(this.shakeBox);
    };
    Furniture.prototype.additem = function (contains, containsId, furnX, furnY, furnDim) {
        this.furniture.classList.remove('shake');
        var pickup = document.createElement("pickup");
        var grayout = document.createElement('grayout');
        var itemMessage = document.createElement('itemMessage');
        itemMessage.innerHTML = "Item '" + containsId + "' added to inventory";
        var game = document.getElementsByTagName("game")[0];
        game.append(itemMessage);
        game.appendChild(grayout);
        game.appendChild(pickup);
        pickup.addEventListener("click", function () {
            pickup.style.marginLeft = "100vw";
            grayout.remove();
            itemMessage.remove();
            setTimeout(function () {
                pickup.remove();
            }, 1000);
        });
        furnDim = furnDim / 2 - 30;
        pickup.style.backgroundImage = contains;
        pickup.style.transform = "translate(calc(" + furnX + "vw + " + furnDim + "px),calc(" + furnY + "vh + " + furnDim + "px))";
        this.furniture.outerHTML = this.furniture.outerHTML;
    };
    return Furniture;
}());
window.addEventListener("load", function () { return testFurniture(); });
function testFurniture() {
    new Furniture(31, 27.5, 100, "url(assets/present.png)", "a thing", "url(assets/lamp.png)");
    new Furniture(50, 7, 70, "url(assets/present.png)", "a different thing", "url(assets/clock.png)");
    new Furniture(44, 28, 220, "url(assets/present.png)", "a different thing", "url(assets/chair.png)");
}
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
                    unicornPlayer.style.transform = "translateX(" + String(posX) + "px)";
                    break;
                case 'ArrowRight':
                    if (posX > maxX - 300) {
                        posX = maxX - 300;
                    }
                    posX = posX + 20;
                    unicornPlayer.style.transform = "translateX(" + String(posX) + "px)";
                    break;
                case 'ArrowUp':
                    posY = posY - 20;
                    console.log(posY);
                    unicornPlayer.style.transform = "translateY(" + String(posY) + "px)";
                    break;
                case 'ArrowDown':
                    posY = posY + 20;
                    unicornPlayer.style.transform = "translateY(" + String(posY) + "px)";
                    break;
            }
        });
    }
    return unicornPlayer;
}());
window.addEventListener("load", function () { return new unicornPlayer(); });
//# sourceMappingURL=main.js.map
"use strict";
var Furniture = (function () {
    function Furniture(furnX, furnY, furnDim, contains, background) {
        this.makeFurniture(furnX, furnY, furnDim, contains, background);
    }
    Furniture.prototype.makeFurniture = function (furnX, furnY, furnDim, contains, background) {
        var _this = this;
        this.furniture = document.createElement("furniture");
        this.shakeBox = document.createElement("shakeBox");
        var game = document.getElementsByTagName("game")[0];
        this.furniture.style.backgroundImage = background;
        this.furniture.style.height = furnDim + "vh";
        this.furniture.style.width = furnDim + "vh";
        this.shakeBox.style.transform = "translate(" + furnX + "vw," + furnY + "vh)";
        this.furniture.classList.add('shake');
        this.furniture.addEventListener('click', function () { return _this.additem(contains, furnX, furnY, furnDim); });
        this.shakeBox.appendChild(this.furniture);
        game.appendChild(this.shakeBox);
    };
    Furniture.prototype.additem = function (contains, furnX, furnY, furnDim) {
        this.furniture.classList.remove('shake');
        var game = document.getElementsByTagName("game")[0];
        if (contains == "none") {
            var dustcloud = document.createElement("dustcloud");
            game.appendChild(dustcloud);
            dustcloud.style.transform = "translate(calc(" + furnX + "vw + " + furnDim + "px),calc(" + furnY + "vh + " + furnDim + "px))";
        }
        else {
            var pickup_1 = document.createElement("pickup");
            var grayout_1 = document.createElement('grayout');
            var itemMessage_1 = document.createElement('itemMessage');
            itemMessage_1.innerHTML = "Item '" + contains.replace("_", " ") + "' added to inventory";
            game.append(itemMessage_1);
            game.appendChild(grayout_1);
            game.appendChild(pickup_1);
            furnDim = furnDim / 2 - 30;
            pickup_1.style.backgroundImage = "url(assets/" + contains + ".png)";
            pickup_1.style.transform = "translate(calc(" + furnX + "vw + " + furnDim + "px),calc(" + furnY + "vh + " + furnDim + "px))";
            pickup_1.addEventListener("click", function () {
                pickup_1.style.marginLeft = "100vw";
                grayout_1.remove();
                itemMessage_1.remove();
                setTimeout(function () {
                    pickup_1.remove();
                }, 1000);
                var inventory = document.getElementsByTagName("inventory")[0];
                var inventoryItem = document.createElement('inventoryItem');
                inventoryItem.style.backgroundImage = "url(assets/" + contains + ".png)";
                inventory.appendChild(inventoryItem);
            });
        }
        this.furniture.outerHTML = this.furniture.outerHTML;
    };
    return Furniture;
}());
window.addEventListener("load", function () { return testFurniture(); });
function testFurniture() {
    new Furniture(31, 27.5, 17, "unicorn_akimbo", "url(assets/lamp.png)");
    new Furniture(50, 7, 15, "unicorn_chair", "url(assets/clock.png)");
    new Furniture(44, 28, 40, "none", "url(assets/chair.png)");
}
var Inventory = (function () {
    function Inventory() {
        this.setInventory();
    }
    Inventory.prototype.setInventory = function () {
        console.log("Created inventory");
        this.inventory = document.createElement("inventory");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this.inventory);
    };
    return Inventory;
}());
window.addEventListener("load", function () { return new Inventory(); });
var battlePhase = (function () {
    function battlePhase() {
        var xPosChar = 50;
        var yPosChar = 50;
        var unicornNumber = 2;
        var squares = 10;
        var xPosClock = 500;
        var yPosClock = 500;
        var hoveredOverSpace;
        var game = document.getElementsByTagName("game")[0];
        var _loop_1 = function (i) {
            var moveSpace = document.createElement("moveSpace");
            game.appendChild(moveSpace);
            moveSpace.id = "square" + i;
            var xPosSquare = xPosClock += 100;
            var yPosSquare = yPosClock;
            moveSpace.style.transform = "translate(" + xPosSquare + "px, " + yPosSquare + "px)";
            moveSpace.addEventListener("dragover", function (event) {
                event.preventDefault();
                hoveredOverSpace = moveSpace.style.transform;
            });
            moveSpace.addEventListener("dragenter", function () {
                console.log("the unicorn is hovering over " + moveSpace.id);
                console.log(hoveredOverSpace);
            });
            moveSpace.addEventListener("dragleave", function () {
                console.log("the unicorn left " + moveSpace.id);
                hoveredOverSpace = "";
                console.log(hoveredOverSpace);
            });
        };
        for (var i = 0; i < squares; i++) {
            _loop_1(i);
        }
        var _loop_2 = function (i) {
            var character = document.createElement("character");
            character.draggable = true;
            character.id = "player" + i;
            game.appendChild(character);
            character.style.transform = "translate(" + xPosChar + "px, " + yPosChar * i + "px)";
            character.addEventListener("dragstart", function () {
                console.log("dragging");
                console.log(character.id);
            });
            character.addEventListener("dragend", function (event) {
                event.preventDefault();
                var draggedChar = document.getElementById(character.id);
                if (draggedChar != null) {
                    draggedChar.style.transform = hoveredOverSpace;
                }
                else {
                    console.log("draggedChar is not set");
                }
            });
        };
        for (var i = 1; i <= unicornNumber; i++) {
            _loop_2(i);
        }
    }
    return battlePhase;
}());
window.addEventListener("load", function () { return new battlePhase(); });
var Game = (function () {
    function Game() {
        console.log("Class Game Loaded");
        var background = document.createElement("background");
        var game = document.getElementsByTagName("game")[0];
        background.style.backgroundImage = "url(assets/3.png)";
        game.appendChild(background);
    }
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var unicornPlayer = (function () {
    function unicornPlayer() {
        this.changeCursorImage();
        this.createUnicorn();
        this.spawnGlitter();
    }
    unicornPlayer.prototype.changeCursorImage = function () {
        var newPointer = document.createElement("newPointer");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(newPointer);
        document.addEventListener('mousemove', function (pos) {
            newPointer.style.display = "initial";
            newPointer.style.transform = 'translateY(' + (pos.clientY - 35) + 'px)';
            newPointer.style.transform += 'translateX(' + (pos.clientX - 20) + 'px)';
        }, false);
    };
    unicornPlayer.prototype.spawnGlitter = function () {
        var game = document.getElementsByTagName("game")[0];
        document.addEventListener('mousemove', function (pos) {
            var d = Math.random();
            if (d > 0.5) {
                var glitter_1 = document.createElement("glitter");
                game.appendChild(glitter_1);
                glitter_1.style.display = "initial";
                glitter_1.style.filter = "hue-rotate(" + String(Math.floor(Math.random() * 350)) + "deg)";
                glitter_1.style.transform = 'translateY(' + (pos.clientY + Math.random() * 40) + 'px)';
                glitter_1.style.transform += 'translateX(' + (pos.clientX + Math.random() * 60) + 'px)';
                window.setTimeout(function () { game.removeChild(glitter_1); }, 1000);
            }
        }, true);
    };
    unicornPlayer.prototype.createUnicorn = function () {
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
    };
    return unicornPlayer;
}());
window.addEventListener("load", function () { return new unicornPlayer(); });
//# sourceMappingURL=main.js.map
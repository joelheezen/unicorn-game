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
        this.furniture.style.height = furnDim + "vh";
        this.furniture.style.width = furnDim + "vh";
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
            var inventory = document.getElementsByTagName("inventory")[0];
            var inventoryItem = document.createElement('inventoryItem');
            inventoryItem.style.backgroundImage = contains;
            inventory.appendChild(inventoryItem);
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
    new Furniture(31, 27.5, 17, "url(assets/unicorn_akimbo.png)", "unicorn akimbo", "url(assets/lamp.png)");
    new Furniture(50, 7, 15, "url(assets/unicorn_chair.png)", "god has left us", "url(assets/clock.png)");
    new Furniture(44, 28, 40, "url(assets/unicorn_jetpack.png)", "unicorn jetpack", "url(assets/chair.png)");
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
var BattleCheck = (function () {
    function BattleCheck() {
        console.log("button created");
        var game = document.getElementsByTagName("game")[0];
        var testButton = document.createElement("button");
        testButton.style.width = "50px";
        testButton.style.height = "50px";
        testButton.style.transform = "translate(90vw, 1vh)";
        testButton.id = "check";
        game.appendChild(testButton);
        if (testButton) {
            testButton.addEventListener("click", function () { return new BattlePhase(); });
        }
    }
    return BattleCheck;
}());
var BattlePhase = (function () {
    function BattlePhase() {
        console.log("button pressed, loading in battlephase");
        var game = document.getElementsByTagName("game")[0];
        var pointer = document.getElementsByTagName("newpointer")[0];
        while (game.firstElementChild != pointer) {
            if (game.firstChild) {
                game.removeChild(game.firstChild);
            }
        }
        while (game.lastElementChild != pointer) {
            if (game.lastChild) {
                game.removeChild(game.lastChild);
            }
        }
        var background = document.createElement("background");
        background.style.backgroundImage = "url(assets/2.png)";
        game.appendChild(background);
        var xPosChar = 0;
        var yPosChar = 0;
        var unicornNumber = 4;
        var squares = 150;
        var xPosSquare = 0;
        var yPosSquare = 0;
        var hoveredOverSpace;
        var _loop_1 = function (i) {
            var moveSpace = document.createElement("moveSpace");
            game.appendChild(moveSpace);
            moveSpace.id = "square" + i;
            moveSpace.style.transform = "translate(" + xPosSquare + "vw, " + yPosSquare + "vh)";
            xPosSquare += 6.67;
            if (xPosSquare > 97) {
                xPosSquare = 0;
                yPosSquare += 10;
            }
            moveSpace.addEventListener("dragover", function (event) {
                event.preventDefault();
                hoveredOverSpace = moveSpace.style.transform;
            });
            moveSpace.addEventListener("dragenter", function () {
                console.log("the unicorn is hovering over " + moveSpace.id);
            });
            moveSpace.addEventListener("dragleave", function () {
                console.log("the unicorn left " + moveSpace.id);
                hoveredOverSpace = "";
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
            character.style.transform = "translate(" + xPosChar + "vw, " + yPosChar + "vh)";
            character.addEventListener("dragstart", function () {
                console.log("dragging");
                console.log(character.id);
                hoveredOverSpace = character.style.transform;
            });
            character.addEventListener("dragend", function (event) {
                event.preventDefault();
                var draggedChar = document.getElementById(character.id);
                if (draggedChar) {
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
    BattlePhase.prototype.createBoard = function () {
    };
    return BattlePhase;
}());
window.addEventListener("load", function () { return new BattleCheck(); });
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
    }
    unicornPlayer.prototype.changeCursorImage = function () {
        var newPointer = document.createElement("newPointer");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(newPointer);
        document.addEventListener('mousemove', function (pos) {
            newPointer.style.transform = 'translateY(' + (pos.clientY - 15) + 'px)';
            newPointer.style.transform += 'translateX(' + (pos.clientX - 20) + 'px)';
        }, false);
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
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
        furnDim = furnDim / 2;
        if (contains == "none") {
            var dustcloud_1 = document.createElement("dustcloud");
            game.appendChild(dustcloud_1);
            dustcloud_1.style.transform = "translate(calc(" + furnX + "vw + " + furnDim + "vh - 50px),calc(" + furnY + "vh + " + furnDim + "vh - 50px))";
            dustcloud_1.style.transition = "3s";
            dustcloud_1.style.opacity = "0";
            setTimeout(function () {
                furnY = 50;
                dustcloud_1.style.transform = "translate(calc(" + furnX + "vw + " + furnDim + "vh - 50px),calc(" + furnY + "vh + " + furnDim + "vh - 50px))";
                dustcloud_1.style.opacity = "1";
                dustcloud_1.style.transform += "rotate(720deg)";
            }, 1);
            setTimeout(function () {
                dustcloud_1.remove();
            }, 3000);
        }
        else {
            var pickup_1 = document.createElement("pickup");
            var grayout_1 = document.createElement('grayout');
            var itemMessage_1 = document.createElement('itemMessage');
            itemMessage_1.innerHTML = "Item '" + contains.replace("_", " ") + "' added to inventory";
            game.append(itemMessage_1);
            game.appendChild(grayout_1);
            game.appendChild(pickup_1);
            pickup_1.style.backgroundImage = "url(assets/" + contains + ".png)";
            pickup_1.style.transform = "translate(calc(" + furnX + "vw + " + furnDim + "vh - 25px),calc(" + furnY + "vh + " + furnDim + "vh - 25px))";
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
        var inv = document.getElementsByTagName("inventory")[0];
        var gameChildren = new Array;
        var children = game.children;
        for (var i = 0; i < children.length; i++) {
            gameChildren.push(children[i]);
        }
        gameChildren.forEach(function (gameChild) {
            if (gameChild != pointer && gameChild != inv) {
                game.removeChild(gameChild);
            }
        });
        var background = document.createElement("background");
        background.style.backgroundImage = "url(assets/2.png)";
        game.appendChild(background);
        var xPosChar = 0;
        var yPosChar = 0;
        var unicornNumber = 4;
        var inventoryItems = document.getElementsByTagName('inventory')[0].children;
        var squares = 140;
        var xPosSquare = 0;
        var yPosSquare = 0;
        var hoveredOverSpace;
        var _loop_1 = function (i) {
            var moveSpace = document.createElement("moveSpace");
            game.appendChild(moveSpace);
            moveSpace.id = "square" + i;
            moveSpace.style.transform = "translate(" + xPosSquare + "vw, " + yPosSquare + "vh)";
            xPosSquare += 6.67;
            if (xPosSquare > 93) {
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
                hoveredOverSpace = "";
            });
        };
        for (var i = 0; i < squares; i++) {
            _loop_1(i);
        }
        var _loop_2 = function (i) {
            console.log(typeof inventoryItems[i]);
            var character = document.createElement("character");
            character.draggable = true;
            character.id = "player" + i;
            game.appendChild(character);
            character.style.transform = "translate(" + xPosChar + "vw, " + yPosChar + "vh)";
            character.addEventListener("dragstart", function () {
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
        for (var i = 0; i < unicornNumber; i++) {
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
        this.spawnGlitter();
    }
    unicornPlayer.prototype.changeCursorImage = function () {
        var newPointer = document.createElement("newPointer");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(newPointer);
        document.addEventListener('mousemove', function (pos) {
            newPointer.style.display = "initial";
            newPointer.style.transform = "translateY(calc(" + pos.clientY + "px - 1vh))";
            newPointer.style.transform += "translateX( calc(" + pos.clientX + "px - 0.5vw))";
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
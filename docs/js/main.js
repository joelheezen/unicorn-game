"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Furniture = (function () {
    function Furniture(furnX, furnY, furnDimX, furnDimY, contains, background) {
        this.makeFurniture(furnX, furnY, furnDimX, furnDimY, contains, background);
    }
    Furniture.prototype.makeFurniture = function (furnX, furnY, furnDimX, furnDimY, contains, background) {
        var _this = this;
        this.furniture = document.createElement('furniture');
        this.shakeBox = document.createElement('shakeBox');
        var game = document.getElementsByTagName('game')[0];
        this.furniture.style.backgroundImage = background;
        this.furniture.style.height = furnDimY + "vh";
        this.furniture.style.width = furnDimX + "vw";
        this.shakeBox.style.transform = "translate(" + furnX + "vw," + furnY + "vh)";
        this.furniture.classList.add('shake');
        this.furniture.addEventListener('click', function () { return _this.additem(contains, furnX, furnY, furnDimX, furnDimY); });
        this.furniture.addEventListener('mouseover', function () {
            new Soundeffect().playThis('rumble.wav');
        });
        this.shakeBox.appendChild(this.furniture);
        game.appendChild(this.shakeBox);
    };
    Furniture.prototype.additem = function (contains, furnX, furnY, furnDimX, furnDimY) {
        this.furniture.classList.remove('shake');
        var game = document.getElementsByTagName("game")[0];
        furnDimX = furnDimX / 2;
        furnDimY = furnDimY / 2;
        if (contains == "none") {
            new Soundeffect().playThis("noItem.mp3");
            var dustcloud_1 = document.createElement("dustcloud");
            game.appendChild(dustcloud_1);
            dustcloud_1.style.transform = "translate(calc(" + furnX + "vw + " + furnDimX + "vw - 50px),calc(" + furnY + "vh + " + furnDimY + "vh - 50px))";
            dustcloud_1.style.transition = "3s";
            dustcloud_1.style.opacity = "0";
            setTimeout(function () {
                furnY = 70;
                dustcloud_1.style.transform = "translate(calc(" + furnX + "vw + " + furnDimX + "vw - 50px),calc(" + furnY + "vh + " + furnDimY + "vh - 50px))";
                dustcloud_1.style.opacity = "1";
                dustcloud_1.style.transform += "rotate(720deg)";
            }, 1);
            setTimeout(function () {
                dustcloud_1.remove();
            }, 3000);
        }
        else {
            new Soundeffect().playThis("foundItem.wav");
            var pickup_1 = document.createElement("pickup");
            var grayout_1 = document.createElement('grayout');
            var itemMessage_1 = document.createElement('itemMessage');
            itemMessage_1.innerHTML = "You found '" + contains.replace("_", " ") + "'";
            game.append(itemMessage_1);
            game.appendChild(grayout_1);
            game.appendChild(pickup_1);
            pickup_1.style.backgroundImage = "url(assets/" + contains + ".png)";
            pickup_1.style.transform = "translate(calc(" + furnX + "vw + " + furnDimX + "vw - 25px),calc(" + furnY + "vh + " + furnDimY + "vh - 25px))";
            pickup_1.addEventListener("click", function () {
                pickup_1.style.marginLeft = "100vw";
                grayout_1.remove();
                itemMessage_1.remove();
                setTimeout(function () {
                    pickup_1.remove();
                }, 1000);
                var inventory = document.getElementsByTagName("inventory")[0];
                var inventoryItem = document.createElement('inventoryItem');
                inventoryItem.classList.add('player');
                inventoryItem.style.backgroundImage = "url(assets/" + contains + ".png)";
                inventory.appendChild(inventoryItem);
            });
        }
        this.furniture.outerHTML = this.furniture.outerHTML;
    };
    return Furniture;
}());
var EvilFurniture = (function () {
    function EvilFurniture(furnX, furnY, furnDimX, furnDimY, background, level) {
        this.makeEvilFurniture(furnX, furnY, furnDimX, furnDimY, background, level);
    }
    EvilFurniture.prototype.makeEvilFurniture = function (furnX, furnY, furnDimX, furnDimY, background, level) {
        var _this = this;
        this.furniture = document.createElement("furniture");
        this.shakeBox = document.createElement("shakeBox");
        var game = document.getElementsByTagName("game")[0];
        this.furniture.style.backgroundImage = background;
        this.furniture.style.height = furnDimY + "vh";
        this.furniture.style.width = furnDimX + "vw";
        this.shakeBox.style.transform = "translate(" + furnX + "vw," + furnY + "vh)";
        this.furniture.classList.add('shake');
        this.furniture.addEventListener('mouseover', function () {
            new Soundeffect().playThis("rumble.wav");
        });
        this.shakeBox.addEventListener('click', function () { return _this.startbattle(event, level); });
        this.shakeBox.appendChild(this.furniture);
        game.appendChild(this.shakeBox);
    };
    EvilFurniture.prototype.startbattle = function (event, level) {
        new Soundeffect().playThis("minionFound.mp3");
        var game = document.getElementsByTagName("game")[0];
        this.furniture.classList.remove('shake');
        var grayout = document.createElement('grayout');
        var itemMessage = document.createElement('itemMessage');
        itemMessage.innerHTML = "You have found the wizards minion";
        event.target.parentElement.style.zIndex = "150";
        this.shakeBox.style.animation = "enemyappear 3s forwards";
        this.shakeBox.style.animationIterationCount = "1";
        game.append(itemMessage);
        game.appendChild(grayout);
        this.skulltop = document.createElement('skulltop');
        this.skullbottom = document.createElement('skullbottom');
        this.furniture.appendChild(this.skulltop);
        this.furniture.appendChild(this.skullbottom);
        this.furniture.style.animation = "6s battletransition 2s forwards";
        this.furniture.style.animationIterationCount = "1";
        var fadetonew = document.createElement("fadetonew");
        game.appendChild(fadetonew);
        setTimeout(function () {
            new BattlePhase(level);
        }, 4000);
        this.shakeBox.outerHTML = this.shakeBox.outerHTML;
        setTimeout(function () {
            game.removeChild(fadetonew);
        }, 6000);
    };
    return EvilFurniture;
}());
var Inventory = (function () {
    function Inventory() {
        this.setInventory();
    }
    Inventory.prototype.setInventory = function () {
        this.inventory = document.createElement("inventory");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this.inventory);
    };
    return Inventory;
}());
var BattlePhase = (function () {
    function BattlePhase(stage) {
        var _this = this;
        this.game = document.getElementsByTagName("game")[0];
        this.battleStarted = false;
        this.monsterCount = 0;
        var pointer = document.getElementsByTagName("newpointer")[0];
        var inv = document.getElementsByTagName("inventory")[0];
        var fadetonew = document.getElementsByTagName('fadetonew')[0];
        var home = document.getElementsByTagName('backhome')[0];
        new Music().changeMusic('battleMusic.mp3');
        var gameChildren = new Array;
        this.nextLevel = stage + 1;
        var children = this.game.children;
        for (var i = 0; i < children.length; i++) {
            gameChildren.push(children[i]);
        }
        gameChildren.forEach(function (gameChild) {
            if (gameChild != pointer && gameChild != inv && gameChild != fadetonew && gameChild != home) {
                _this.game.removeChild(gameChild);
            }
        });
        var background = document.createElement("background");
        background.style.backgroundImage = "url(assets/gameBackground.png)";
        this.game.appendChild(background);
        var inventoryItems = document.getElementsByTagName('inventory')[0].children;
        if (inventoryItems.length == 0) {
            var inventoryItem = document.createElement('inventoryItem');
            var inventoryadd = document.getElementsByTagName("inventory")[0];
            inventoryItem.style.backgroundImage = "url(assets/unicorn_crash_test.png)";
            inventoryItem.classList.add('player');
            inventoryadd.appendChild(inventoryItem);
        }
        var squares = 64;
        var xPosSquare = 8;
        var yPosSquare = 8;
        var spaces = document.getElementsByTagName("moveSpace");
        var monsters = new Array;
        var obstacles = new Array;
        var inventory = document.getElementsByTagName('inventory')[0];
        var gameboard = document.createElement("gameBoard");
        this.game.appendChild(gameboard);
        for (var i = 0; i < squares; i++) {
            var moveSpace = document.createElement("moveSpace");
            gameboard.appendChild(moveSpace);
            moveSpace.id = "square" + i;
            moveSpace.style.transform = "translate(" + xPosSquare + "vh, " + yPosSquare + "vh)";
            xPosSquare += 9.3;
            if (xPosSquare > 73.1) {
                xPosSquare = 8;
                yPosSquare += 9.3;
            }
            if (i > 31) {
                moveSpace.addEventListener("drop", function () { return _this.drop(event); });
                moveSpace.addEventListener("dragover", function () { return _this.allowDrop(event); });
                moveSpace.classList.add("canplace");
            }
        }
        inventory.addEventListener("drop", function () { return _this.drop(event); });
        inventory.addEventListener("dragover", function () { return _this.allowDrop(event); });
        for (var i = 0; i < inventoryItems.length; i++) {
            inventoryItems[i].id = "item" + i;
            inventoryItems[i].draggable = true;
            inventoryItems[i].addEventListener("dragstart", function () { return _this.drag(event); });
        }
        var monsterTypes = ["cabinet", "couch", "dumbell", "lamp", "plant", "jug"];
        var obstacleTypes = ['rock', 'water', 'tree', 'roadblock', 'lava', 'manhole'];
        switch (stage) {
            case 1:
                this.monsterCount = 6;
                this.obstaclePlaces = [2, 12, 26, 20, 16, 31];
                monsterTypes = ["cabinet", "couch", "dumbell", "lamp", "jug"];
                this.monsterKingImg = "plant";
                break;
            case 2:
                this.monsterCount = 7;
                this.obstaclePlaces = [16, 18, 21, 23, 24, 25, 26, 29, 30, 31];
                monsterTypes = ["cabinet", "dumbell", "lamp", "plant", "jug"];
                this.monsterKingImg = "couch";
                break;
            case 3:
                this.monsterCount = 8;
                this.obstaclePlaces = [17, 18, 19, 20, 21, 22];
                monsterTypes = ["cabinet", "couch", "lamp", "plant", "jug"];
                this.monsterKingImg = "dumbell";
                break;
            case 4:
                this.monsterCount = 9;
                this.obstaclePlaces = [25, 26, 27, 28, 29, 30];
                monsterTypes = ["cabinet", "couch", "dumbell", "lamp", "plant"];
                this.monsterKingImg = "jug";
                break;
            case 5:
                this.monsterCount = 10;
                this.obstaclePlaces = [0, 2, 4, 6, 17, 19, 21, 23];
                monsterTypes = ["couch", "dumbell", "lamp", "plant", "jug"];
                this.monsterKingImg = "cabinet";
                break;
            case 6:
                this.monsterCount = 11;
                this.obstaclePlaces = [];
                monsterTypes = ["wizard"];
                this.monsterKingImg = "wizard";
                break;
        }
        for (var i = 0; i < this.obstaclePlaces.length; i++) {
            var obstacle = document.createElement("obstacle");
            obstacle.classList.add("obstacle");
            obstacle.style.backgroundImage = "url(assets/obstacle_" + obstacleTypes[Math.floor(Math.random() * monsterTypes.length)] + ".png)";
            obstacles.push(obstacle);
        }
        for (var i = 0; i < this.obstaclePlaces.length; i++) {
            if (spaces[this.obstaclePlaces[i]].firstChild) {
                i -= 1;
            }
            else {
                spaces[this.obstaclePlaces[i]].appendChild(obstacles[i]);
            }
        }
        for (var i = 0; i < this.monsterCount; i++) {
            var monster = document.createElement("monster");
            monster.classList.add("monster");
            if (i == 0) {
                monster.style.backgroundImage = "url(assets/enemy_" + this.monsterKingImg + ".png)";
            }
            else {
                monster.style.backgroundImage = "url(assets/enemy_" + monsterTypes[Math.floor(Math.random() * monsterTypes.length)] + ".png)";
            }
            monster.id = "monster" + i;
            monsters.push(monster);
        }
        for (var i = 0; i < this.monsterCount; i++) {
            var randomNumber = Math.floor(Math.random() * 32);
            if (spaces[randomNumber].firstChild) {
                i -= 1;
            }
            else {
                spaces[randomNumber].appendChild(monsters[i]);
            }
        }
        this.startBattle = document.createElement('startBattle');
        this.game.appendChild(this.startBattle);
        this.startBattle.innerHTML = "Start Battle";
        this.startBattle.addEventListener("click", function () { return _this.prepareBoard(); });
    }
    BattlePhase.prototype.allowDrop = function (ev) {
        ev.preventDefault();
    };
    BattlePhase.prototype.drag = function (ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    };
    BattlePhase.prototype.drop = function (ev) {
        new Soundeffect().playThis("nes-01-00.wav");
        var data = ev.dataTransfer.getData("text");
        var element = document.getElementById(data);
        if (ev.target.id.substring(0, 4) == "item") {
        }
        else if (element != null) {
            if (!element.classList.contains("gamer")) {
                ev.preventDefault();
                ev.target.appendChild(document.getElementById(data));
            }
        }
        var inventory = document.getElementsByTagName('inventory')[0];
        if (inventory.childNodes.length == 0) {
            this.startBattle.style.opacity = "1";
        }
        if (inventory.childNodes.length > 0) {
            this.startBattle.style.opacity = "0";
        }
        if (element != null) {
            if (element.classList.contains("gamer") && ev.target.classList.contains("canplace")) {
                ev.preventDefault();
                ev.target.appendChild(document.getElementById(data));
                element = document.getElementById(data);
                if (this.battleStarted == true) {
                    this.enemyTurn();
                }
            }
        }
        if (element != null) {
            if (element.classList.contains("gamer") && ev.target.classList.contains("monster") && ev.target.parentElement.classList.contains("canplace")) {
                ev.preventDefault();
                var monsterChild = ev.target;
                var monsterParent = monsterChild.parentNode;
                if (monsterParent) {
                    monsterParent.removeChild(monsterChild);
                    new Soundeffect().playThis("nes-05-07.wav");
                }
                monsterParent.appendChild(document.getElementById(data));
                element = document.getElementById(data);
                if (this.battleStarted == true) {
                    this.enemyTurn();
                }
            }
        }
    };
    BattlePhase.prototype.prepareBoard = function () {
        var _this = this;
        var enemySide = document.getElementsByTagName('movespace');
        for (var index = 0; index <= 31; index++) {
            enemySide[index].addEventListener("drop", function () { return _this.drop(event); });
            enemySide[index].addEventListener("dragover", function () { return _this.allowDrop(event); });
        }
        for (var index = 31; index <= 63; index++) {
            document.getElementsByTagName('movespace')[index].classList.remove('canplace');
        }
        var startbattle = document.getElementsByTagName('startBattle')[0];
        startbattle.remove();
        this.enemyTurn();
        this.battleStarted = true;
    };
    BattlePhase.prototype.enemyTurn = function () {
        var _a, _b, _c, _d, _e;
        for (var i = -1; i < this.monsterCount; i++) {
            if (document.getElementById("monster0")) {
                var activeMonster = document.getElementById("monster" + i);
                if (activeMonster != null) {
                    var spaceNow = activeMonster.parentNode;
                    var spaceNowPos = spaceNow.id.substring(6, 8);
                    var moveMonsterTo = document.getElementsByTagName('movespace');
                    var moved = false;
                    while (moved == false) {
                        var direction = Math.floor(Math.random() * 100);
                        var spaceToMove = void 0;
                        if (direction <= 25) {
                            spaceToMove = moveMonsterTo[parseInt(spaceNowPos) - 8];
                        }
                        else if (direction > 25 && direction <= 50) {
                            var moveto = parseInt(spaceNowPos) - 1;
                            if (((moveto + 1) % 8) == 0) {
                                continue;
                            }
                            spaceToMove = moveMonsterTo[moveto];
                        }
                        else if (direction > 50 && direction <= 75) {
                            var moveto = parseInt(spaceNowPos) + 1;
                            if ((moveto % 8) == 0) {
                                continue;
                            }
                            spaceToMove = moveMonsterTo[moveto];
                        }
                        else if (direction > 75 && direction <= 100) {
                            spaceToMove = moveMonsterTo[parseInt(spaceNowPos) + 8];
                        }
                        if (spaceToMove) {
                            if (spaceToMove.childNodes.length > 0) {
                                if (spaceToMove.children[0].classList.contains("monster")) {
                                    spaceToMove.appendChild(activeMonster);
                                    spaceNow.appendChild(spaceToMove.children[0]);
                                    moved = true;
                                }
                                else if (spaceToMove.children[0].classList.contains("player")) {
                                    new Soundeffect().playThis("allyDie.wav");
                                    spaceToMove.removeChild(spaceToMove.childNodes[0]);
                                    spaceToMove.appendChild(activeMonster);
                                    spaceToMove.style.backgroundImage = "url(assets/unicorn_dead.png)";
                                    moved = true;
                                }
                                else if (spaceToMove.children[0].classList.contains("obstacle")) {
                                    direction = Math.floor(Math.random() * 100);
                                }
                            }
                            else {
                                spaceToMove.appendChild(activeMonster);
                                moved = true;
                            }
                        }
                        else {
                            direction = Math.floor(Math.random() * 100);
                        }
                    }
                }
            }
            else {
                var board = document.getElementsByTagName("gameboard")[0];
                if (this.nextLevel == 2) {
                    (_a = board.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(board);
                    new Level2click();
                    localStorage.setItem('unlocked', '2');
                }
                else if (this.nextLevel == 3) {
                    (_b = board.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(board);
                    new Level3click();
                    localStorage.setItem('unlocked', '3');
                }
                else if (this.nextLevel == 4) {
                    (_c = board.parentNode) === null || _c === void 0 ? void 0 : _c.removeChild(board);
                    new Level4click();
                    localStorage.setItem('unlocked', '4');
                }
                else if (this.nextLevel == 5) {
                    (_d = board.parentNode) === null || _d === void 0 ? void 0 : _d.removeChild(board);
                    new Level5click();
                    localStorage.setItem('unlocked', '5');
                }
                else if (this.nextLevel == 6) {
                    (_e = board.parentNode) === null || _e === void 0 ? void 0 : _e.removeChild(board);
                    new Level6click();
                    localStorage.setItem('unlocked', '6');
                }
                else if (this.nextLevel == 7) {
                }
                else {
                    console.log("something is fucked up");
                }
            }
        }
        this.playerTurn();
    };
    BattlePhase.prototype.playerTurn = function () {
        var _this = this;
        var unicornPlayers = new Array;
        var unicornsLeft = document.getElementsByTagName("inventoryitem");
        for (var i = 0; i < unicornsLeft.length; i++) {
            unicornPlayers.push(document.getElementsByTagName("inventoryitem")[i]);
        }
        unicornPlayers.forEach(function (element) {
            element.addEventListener('dragstart', function (event) {
                var spaceNow = element.parentNode.id;
                var number = Number(spaceNow.slice(6, 8));
                var spacesThen = new Array;
                var numberTop = number - 8;
                var numberRight = number + 1;
                var numberBot = number + 8;
                var numberLeft = number - 1;
                element.classList.add("gamer");
                if (numberTop >= 0) {
                    spacesThen.push(document.getElementById("square" + numberTop));
                }
                if (numberRight % 8) {
                    spacesThen.push(document.getElementById("square" + numberRight));
                }
                if (numberBot < 64) {
                    spacesThen.push(document.getElementById("square" + numberBot));
                }
                if ((numberLeft + 1) % 8) {
                    spacesThen.push(document.getElementById("square" + numberLeft));
                }
                event.dataTransfer.setData("text", event.target.id);
                spacesThen.forEach(function (element) {
                    element.classList.add("canplace");
                    element.addEventListener('dragover', function () { return _this.allowDrop(event); });
                });
            });
            element.addEventListener('dragend', function () {
                element.classList.remove("gamer");
                var oldSpaces = document.getElementsByClassName("canplace");
                for (var i = 0; i < oldSpaces.length; i++) {
                    oldSpaces[i].classList.remove("canplace");
                }
                for (var i = 0; i < oldSpaces.length; i++) {
                    oldSpaces[i].classList.remove("canplace");
                }
                for (var i = 0; i < oldSpaces.length; i++) {
                    oldSpaces[i].classList.remove("canplace");
                }
            });
        });
    };
    return BattlePhase;
}());
var CutScene = (function () {
    function CutScene() {
    }
    CutScene.prototype.playCutScene = function () {
    };
    return CutScene;
}());
var Dialogbox = (function () {
    function Dialogbox(player, message) {
        this.game = document.getElementsByTagName('game')[0];
        var messages = message.split('*');
        this.newDialog(player, messages);
    }
    Dialogbox.prototype.newDialog = function (player, messages) {
        var dialog = document.createElement('dialogWindow');
        this.game.appendChild(dialog);
        var playerIcon = document.createElement('playerIcon');
        dialog.appendChild(playerIcon);
        playerIcon.style.backgroundImage = "url(assets/" + player + ".png)";
        var messageBox = document.createElement('messageBox');
        dialog.appendChild(messageBox);
        var currentDialog = 0;
        messageBox.innerHTML = messages[currentDialog];
        dialog.addEventListener('click', function () {
            currentDialog += 1;
            if (currentDialog < messages.length) {
                messageBox.innerHTML = "";
                messageBox.innerHTML += messages[currentDialog];
            }
            else {
                dialog.remove();
            }
        });
    };
    return Dialogbox;
}());
window.addEventListener("load", function () { return new Startscreen(); });
var Startscreen = (function () {
    function Startscreen() {
        this.game = document.getElementsByTagName('game')[0];
        this.menu = document.createElement('menu');
        this.unlockStorage = window.localStorage;
        this.game.innerHTML = '';
        this.setBackground();
        this.setButtons();
        this.setAssets();
        new Music().playMusic('music.mp3');
        new Soundeffect().setSound();
    }
    Startscreen.prototype.setBackground = function () {
        var background = document.createElement('background');
        background.style.backgroundImage = 'url(assets/startscreen.png)';
        this.game.appendChild(background);
    };
    Startscreen.prototype.setAssets = function () {
        var title = document.createElement('title');
        title.innerHTML = 'Tactical unicorn';
        this.game.appendChild(title);
        this.leftUnicorn = document.createElement('leftUnicorn');
        this.leftUnicorn.classList.add('bounce-left');
        this.game.appendChild(this.leftUnicorn);
        this.rightUnicorn = document.createElement('rightUnicorn');
        this.rightUnicorn.classList.add('bounce-right');
        this.game.appendChild(this.rightUnicorn);
    };
    Startscreen.prototype.setButtons = function () {
        var _this = this;
        var startButton = document.createElement('startButton');
        startButton.innerHTML = 'Play';
        startButton.classList.add('button');
        var optionsButton = document.createElement('optionsButton');
        optionsButton.innerHTML = 'Options';
        optionsButton.classList.add('button');
        var creditsButton = document.createElement('creditsButton');
        creditsButton.innerHTML = 'Credits';
        creditsButton.classList.add('button');
        var quitButton = document.createElement('quitButton');
        quitButton.innerHTML = 'Quit';
        quitButton.classList.add('button');
        this.menu.appendChild(startButton);
        this.menu.appendChild(optionsButton);
        this.menu.appendChild(creditsButton);
        this.menu.appendChild(quitButton);
        this.game.appendChild(this.menu);
        startButton.addEventListener('click', function () {
            _this.levelSelect();
            new Soundeffect().playThis('menuSelect.mp3');
        });
        optionsButton.addEventListener('click', function () {
            _this.setOptions();
            new Soundeffect().playThis("menuSelect.mp3");
        });
        creditsButton.addEventListener('click', function () {
            _this.setCredits();
            new Soundeffect().playThis("menuSelect.mp3");
        });
        quitButton.addEventListener('click', function () {
            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        });
    };
    Startscreen.prototype.makeLevelIcon = function (posX, posY, width, height, levelNumber) {
        this.levelIcon = document.createElement('level');
        this.game.appendChild(this.levelIcon);
        this.levelIcon.innerHTML = "Level " + levelNumber;
        this.levelIcon.style.transform = "translate(" + posX + "vw," + posY + "vh)";
        this.levelIcon.style.width = width + "vw";
        this.levelIcon.style.height = height + "vh";
    };
    Startscreen.prototype.makeLevelLock = function (posX, posY, width, height) {
        this.levelIcon = document.createElement('levelLock');
        this.game.appendChild(this.levelIcon);
        this.levelIcon.style.transform = "translate(" + posX + "vw," + posY + "vh)";
        this.levelIcon.style.width = width + "vw";
        this.levelIcon.style.height = height + "vh";
        this.levelIcon.style.backgroundImage = "url(assets/lock.png)";
    };
    Startscreen.prototype.setUnlock = function () {
        var unlockeds;
        unlockeds = [];
        var lvlAchieved = this.unlockStorage.getItem('unlocked');
        if (lvlAchieved == "1") {
            unlockeds = [false, true, true, true, true, true];
        }
        if (lvlAchieved == "2") {
            unlockeds = [false, false, true, true, true, true];
        }
        if (lvlAchieved == "3") {
            unlockeds = [false, false, false, true, true, true];
        }
        if (lvlAchieved == "4") {
            unlockeds = [false, false, false, false, true, true];
        }
        if (lvlAchieved == "5") {
            unlockeds = [false, false, false, false, false, true];
        }
        if (lvlAchieved == "6") {
            unlockeds = [false, false, false, false, false, false];
        }
        return unlockeds;
    };
    Startscreen.prototype.levelSelect = function () {
        var _this = this;
        this.menu.innerHTML = "";
        this.leftUnicorn.remove();
        this.rightUnicorn.remove();
        var unlocked = this.setUnlock();
        this.makeLevelIcon(14.1, 59.7, 10.8, 36.1, 1);
        this.levelIcon.addEventListener("click", function () {
            _this.game.innerHTML = "";
            new Soundeffect().playThis("door.wav");
            new Level1click;
        });
        if (unlocked[1] == false) {
            this.makeLevelIcon(25.7, 52.8, 14.75, 43.05, 2);
            this.levelIcon.addEventListener("click", function () {
                _this.game.innerHTML = "";
                new Soundeffect().playThis("door.wav");
                new Level2click;
            });
        }
        else {
            console.log('level 6 locked');
            this.makeLevelLock(25.7, 52.8, 14.75, 43.05);
        }
        if (unlocked[2] == false) {
            this.makeLevelIcon(40.5, 65.3, 9.2, 30.6, 3);
            this.levelIcon.addEventListener("click", function () {
                _this.game.innerHTML = "";
                new Soundeffect().playThis("door.wav");
                new Level3click;
            });
        }
        else {
            console.log('level 6 locked');
            this.makeLevelLock(40.5, 65.3, 9.2, 30.6);
        }
        if (unlocked[3] == false) {
            this.makeLevelIcon(45.1, 44.4, 19.4, 51.4, 4);
            this.levelIcon.addEventListener("click", function () {
                _this.game.innerHTML = "";
                new Soundeffect().playThis("door.wav");
                new Level4click;
            });
        }
        else {
            this.makeLevelLock(45.1, 44.4, 19.4, 51.4);
        }
        if (unlocked[4] == false) {
            this.makeLevelIcon(64.5, 57, 10.1, 38.9, 5);
            this.levelIcon.addEventListener("click", function () {
                _this.game.innerHTML = "";
                new Soundeffect().playThis("door.wav");
                new Level5click;
            });
        }
        else {
            this.makeLevelLock(64.5, 57, 10.1, 38.9);
        }
        if (unlocked[5] == false) {
            this.makeLevelIcon(74.7, 45.9, 17, 49.9, 6);
            this.levelIcon.addEventListener("click", function () {
                _this.game.innerHTML = "";
                new Soundeffect().playThis("door.wav");
                new Level6click;
            });
        }
        else {
            this.makeLevelLock(74.7, 45.9, 17, 49.9);
        }
        var leave = document.createElement('leave');
        this.game.appendChild(leave);
        leave.addEventListener("click", function () {
            while (document.getElementsByTagName('level').length > 0) {
                for (var i = 0; i < document.getElementsByTagName('level').length; i++) {
                    document.getElementsByTagName('level')[i].remove();
                }
            }
            while (document.getElementsByTagName('levelLock').length > 0) {
                for (var i = 0; i < document.getElementsByTagName('levelLock').length; i++) {
                    document.getElementsByTagName('levelLock')[i].remove();
                }
            }
            leave.remove();
            new Soundeffect().playThis("menuBack.wav");
            _this.setButtons();
            _this.setAssets();
        });
    };
    Startscreen.prototype.setCredits = function () {
        var _this = this;
        this.menu.innerHTML = "";
        var credits = document.createElement('credits');
        this.game.appendChild(credits);
        credits.innerHTML += "<credit>Assets</credit>";
        credits.innerHTML += "<credit>Point and click mechanics</credit";
        credits.innerHTML += "<credit>Battle mechanics</credit>";
        credits.innerHTML += "<name>Tom Faust</name>";
        credits.innerHTML += "<name>Tom Faust</name>";
        credits.innerHTML += "<name>Joel Heezen</name>";
        credits.innerHTML += "<credit>Cursor</credit>";
        credits.innerHTML += "<credit>gamerules</credit";
        credits.innerHTML += "<credit>Concept</credit>";
        credits.innerHTML += "<name>Luuk 's-Gravendijk</name>";
        credits.innerHTML += "<name>Luuk 's-Gravendijk</name>";
        credits.innerHTML += "<name>All involved</name>";
        var leave = document.createElement('leave');
        this.game.appendChild(leave);
        leave.addEventListener("click", function () {
            credits.remove();
            leave.remove();
            new Soundeffect().playThis("menuBack.wav");
            _this.setButtons();
        });
    };
    Startscreen.prototype.setOptions = function () {
        new Options();
    };
    return Startscreen;
}());
var Level1click = (function () {
    function Level1click() {
        new Music().changeMusic('music.mp3');
        this.setFurniture();
        this.setBackground();
        new Hint(70.7, 9, 15, 8.6, "The room is quiet and devoid of life, yet there is something that isnt.Its whispering silently, as not to be heard. It seems like its soul is imprisoned. <br> <br> You hear chanting in the distance as the poor soul weeps. Its something you wouldnt want to have seen. Out of the item comes a slight glow and this glows colored green.");
        new Inventory();
        new Dialogbox("unicorn_player", "Where did that wizard go?*And who does he think he is, chasing my friends into here.*Dont forget that he cursed these innocent funitures*I better find them all before i run into him.*What does that note say?");
    }
    Level1click.prototype.setBackground = function () {
        var background = document.createElement("background");
        var game = document.getElementsByTagName("game")[0];
        background.style.backgroundImage = "url(assets/1.png)";
        game.appendChild(background);
        var home = document.createElement('backHome');
        game.appendChild(home);
        home.addEventListener('click', function () { return new Startscreen; });
    };
    Level1click.prototype.setFurniture = function () {
        new Furniture(8.5, 50, 18, 23, "unicorn_sword", "url(assets/television.png)");
        new Furniture(27.3, 25.7, 9, 17, "unicorn_rifle", "url(assets/clock.png)");
        new Furniture(80.5, 57.6, 5, 12.1, "none", "url(assets/vase.png)");
        new Furniture(12.7, 26, 6.8, 7.4, "unicorn_gun", "url(assets/books.png)");
        new EvilFurniture(82, 10.9, 8, 16.6, "url(assets/plant.png)", 1);
    };
    return Level1click;
}());
var Level2click = (function () {
    function Level2click() {
        new Music().changeMusic('music.mp3');
        this.setFurniture();
        this.setBackground();
        new Hint(60, 30, 15, 11, "Danger gets heated, but its gone in the night. We depend on its essence, because without it there would be no light. We are blessed by its presence. <br> <br> But this time you feel weird as the object is roaring and in the distance you see and odd-fellow. In the next fight, if you want to win, go after the poor cursed thing that seems yellow.");
        new Inventory();
        new Dialogbox("unicorn_player", "What!! furniture is fighting us?*If we want to win we are going to need some more friends*I think the wizzard might has gone this way!!!");
    }
    Level2click.prototype.setBackground = function () {
        var background = document.createElement("background");
        var game = document.getElementsByTagName("game")[0];
        background.style.backgroundImage = "url(assets/2.png)";
        game.appendChild(background);
        var home = document.createElement('backHome');
        game.appendChild(home);
        home.addEventListener('click', function () { return new Startscreen; });
    };
    Level2click.prototype.setFurniture = function () {
        new Furniture(70.7, 9.2, 1.5, 14.4, "unicorn_laser", "url(assets/long_book.png)");
        new Furniture(36.4, 68.1, 15, 5.1, "unicorn_mario", "url(assets/couch_cushion.png)");
        new Furniture(75, 50.4, 21.2, 28.6, "none", "url(assets/red_chair.png)");
        new Furniture(83.5, 23.6, 6.6, 7.5, "none", "url(assets/standing_clock.png)");
        new Furniture(58.1, 61.4, 15, 17.6, "unicorn_slime", "url(assets/glass_table.png)");
        new EvilFurniture(36.8, 12.6, 8.8, 7.6, "url(assets/sun_and_cloud.png)", 2);
    };
    return Level2click;
}());
var Level3click = (function () {
    function Level3click() {
        new Music().changeMusic('music.mp3');
        this.setFurniture();
        this.setBackground();
        new Hint(9, 12, 12.5, 11, "Were you feel most safe, enemies strike. Your life might soon be ova. You struggle and struggle, but no prevail. The danger hides 'round the sofa. <br><br> The magic sounds like buzzing, as you look for a clue. A weird furniture attacks you, as you try to stand your ground you see its hue is colored blue.");
        new Inventory();
        new Dialogbox("unicorn_player", "I can smell, his smell, his smelly smell that*SMELLS!!!*Hahah Spongebob*But in all seriousness he must have gone through this room");
    }
    Level3click.prototype.setBackground = function () {
        var background = document.createElement("background");
        var game = document.getElementsByTagName("game")[0];
        background.style.backgroundImage = "url(assets/3.png)";
        game.appendChild(background);
        var home = document.createElement('backHome');
        game.appendChild(home);
        home.addEventListener('click', function () { return new Startscreen; });
    };
    Level3click.prototype.setFurniture = function () {
        new Furniture(52.8, 21.8, 8.6, 63, "unicorn_robot", "url(assets/thin_lamp.png)");
        new Furniture(6.6, 32.7, 6.2, 9.5, "unicorn_luigi", "url(assets/mini_frame.png)");
        new Furniture(41.5, 18.5, 7.6, 14.3, "none", "url(assets/white_clock.png)");
        new Furniture(79.7, 21.8, 2.85, 10.2, "none", "url(assets/tiny_plant.png)");
        new Furniture(22.1, 26.9, 3.8, 5.9, "uni-corn", "url(assets/tiny_frame.png)");
        new Furniture(88.7, 48.7, 5.2, 21.9, "unicorn_ghost", "url(assets/small_lamp.png)");
        new EvilFurniture(17, 57.5, 9.9, 11.5, "url(assets/pillow.png)", 3);
    };
    return Level3click;
}());
var Level4click = (function () {
    function Level4click() {
        new Music().changeMusic('music.mp3');
        this.setFurniture();
        this.setBackground();
        new Hint(39, 26, 12.5, 11, "It brings danger and pain, my dearest red flower. Yet this enemy will be outmatched by a shower. <br> <br> Water is its enemy, but anything else it will harm. Its color is red like the roof of a barn.");
        new Inventory();
        new Dialogbox("unicorn_player", "The smell is getting stronger and I feel powerfull waves of magic*I hope we find him soon");
    }
    Level4click.prototype.setBackground = function () {
        var background = document.createElement("background");
        var game = document.getElementsByTagName("game")[0];
        background.style.backgroundImage = "url(assets/4.png)";
        game.appendChild(background);
        var home = document.createElement('backHome');
        game.appendChild(home);
        home.addEventListener('click', function () { return new Startscreen; });
    };
    Level4click.prototype.setFurniture = function () {
        new Furniture(7.9, 36.7, 6, 43.4, "unicorn_furniture", "url(assets/long_lamp.png)");
        new Furniture(28.7, 0, 12.3, 21.7, "unicorn_not", "url(assets/ceiling_lamp.png)");
        new Furniture(30.6, 28.3, 7.6, 21.7, "none", "url(assets/long_frame.png)");
        new Furniture(78.4, 41.5, 5.7, 10.3, "none", "url(assets/small_frame.png)");
        new Furniture(62.5, 51.6, 2, 8.4, "unicorn_bandage_girl", "url(assets/book.png)");
        new Furniture(46.6, 66.7, 2.8, 5, "unicorn_princess", "url(assets/mug.png)");
        new EvilFurniture(83.1, 61.7, 5.6, 16.5, "url(assets/fire.png)", 4);
    };
    return Level4click;
}());
var Level5click = (function () {
    function Level5click() {
        new Music().changeMusic('music.mp3');
        this.setFurniture();
        this.setBackground();
        new Hint(55, 17, 14, 11, "The wizard comes closer with power so great. You can hear him read spells from his scroll. As you feel the magic come from a place in which you might find your console.<br><br> The two handles on its front makes it look like a face. 'Wait a minute, did it just frown?' The wizzard made enemies and for some reason his favourite minion is brown.");
        new Inventory();
        new Dialogbox("unicorn_player", "The magic is starting to hurt now*aaaaAAAAaaaaAH*aaAAaaaAAAAAaaaaaaaAAAAAAAAAA*It hurts pretty bad, I cant imagine the pain my friends are in*WE NEED TO STOP HIM!!!");
    }
    Level5click.prototype.setBackground = function () {
        var background = document.createElement("background");
        var game = document.getElementsByTagName("game")[0];
        background.style.backgroundImage = "url(assets/5.png)";
        game.appendChild(background);
        var home = document.createElement('backHome');
        game.appendChild(home);
        home.addEventListener('click', function () { return new Startscreen; });
    };
    Level5click.prototype.setFurniture = function () {
        new Furniture(5.2, 73.1, 5.3, 11, "unicorn_rainbow", "url(assets/plantpot.png)");
        new Furniture(33.1, 20.2, 6, 13.5, "unicorn_shrek", "url(assets/dead_plant.png)");
        new Furniture(56.6, 34.45, 7.6, 12.7, "none", "url(assets/lamp_shade.png)");
        new Furniture(18.9, 56.3, 4.2, 7.6, "unicorn_army", "url(assets/square_pillow.png)");
        new Furniture(72.6, 27.7, 9, 16, "unicorn_super_meat_boy", "url(assets/boat_frame.png)");
        new EvilFurniture(77.4, 76.5, 15, 5.9, "url(assets/drawer.png)", 5);
    };
    return Level5click;
}());
var Level6click = (function () {
    function Level6click() {
        new Music().changeMusic('music.mp3');
        this.setFurniture();
        this.setBackground();
        new Hint(39, 26, 9, 11, "As you walk into the room you feel a powerfull surge. Its cold like you are in a blizzard. When you find the item in witch he resides youll find yourself fighting a wizard.");
        new Inventory();
        new Dialogbox("unicorn_player", "I can feel hes in the room somewhere");
        new Dialogbox("enemy_wizard", "...*...*I hope they dont find me in here*But if they do I will surely destroy them");
    }
    Level6click.prototype.setBackground = function () {
        var background = document.createElement("background");
        var game = document.getElementsByTagName("game")[0];
        background.style.backgroundImage = "url(assets/6.png)";
        game.appendChild(background);
        var home = document.createElement('backHome');
        game.appendChild(home);
        home.addEventListener('click', function () { return new Startscreen; });
    };
    Level6click.prototype.setFurniture = function () {
        new Furniture(52.8, 0, 3.4, 13.5, "unicorn_wizard", "url(assets/small_ceiling_lamp.png)");
        new Furniture(69.3, 14.3, 10, 6.7, "unicorn_asylum", "url(assets/small_cabinet.png)");
        new Furniture(26.9, 39.5, 7.1, 31.1, "unicorn_ninja", "url(assets/big_plant.png)");
        new Furniture(85.8, 71.4, 6.2, 9.3, "unicorn_dragon", "url(assets/white_plantpot.png)");
        new Furniture(73.1, 32.8, 1.4, 2.5, "none", "url(assets/small_bunny.png)");
        new Furniture(57.5, 63.1, 5.2, 8.3, "unicorn_dinosaur", "url(assets/two_frames.png)");
        new Furniture(69.8, 31.1, 2.4, 4.3, "unicorn_chocolate_chip", "url(assets/large_bunny.png)");
        new EvilFurniture(14.7, 53, 9.8, 26, "url(assets/large_cabinet.png)", 6);
    };
    return Level6click;
}());
var Hint = (function () {
    function Hint(x, y, h, w, message) {
        this.setHint(x, y, h, w, message);
    }
    Hint.prototype.setHint = function (x, y, h, w, message) {
        var game = document.getElementsByTagName("game")[0];
        var hint = document.createElement("hint");
        game.appendChild(hint);
        hint.style.transform = "translate(" + x + "vw," + y + "vh)";
        hint.style.height = h + "vh";
        hint.style.width = w + "vw";
        hint.innerHTML = "<p>" + message + "</p>";
        hint.addEventListener('click', zoomin);
        var zoomed = document.createElement("zoomed");
        var grayfade = document.createElement('grayout');
        function zoomin() {
            new Soundeffect().playThis("readHint.mp3");
            game.appendChild(zoomed);
            game.appendChild(grayfade);
            zoomed.innerHTML = message;
            zoomed.addEventListener("click", function () { return zoomout(); });
        }
        function zoomout() {
            new Soundeffect().playThis("readHint.mp3");
            zoomed.remove();
            grayfade.remove();
        }
    };
    return Hint;
}());
var Music = (function () {
    function Music() {
        this.music = document.createElement("audio");
    }
    Music.prototype.playMusic = function (src) {
        this.music.src = "assets/" + src;
        this.music.style.display = "none";
        this.music.id = "music";
        document.body.appendChild(this.music);
        this.music.play();
        this.music.volume = 0;
    };
    Music.prototype.changeMusic = function (src) {
        document.getElementById('music').src = "assets/" + src;
        document.getElementById('music').play();
    };
    return Music;
}());
var Options = (function (_super) {
    __extends(Options, _super);
    function Options() {
        var _this = _super.call(this) || this;
        _this.menu.innerHTML = "";
        var options = document.createElement('options');
        _this.game.appendChild(options);
        var musicOptions = document.createElement('musicOptions');
        options.appendChild(musicOptions);
        musicOptions.innerHTML += "Music Volume";
        var muteGame = document.createElement('muteGame');
        musicOptions.appendChild(muteGame);
        var musicSlider = document.createElement('input');
        musicOptions.appendChild(musicSlider);
        musicSlider.type = "range";
        musicSlider.min = "0";
        musicSlider.max = "100";
        musicSlider.id = 'myRange';
        if (document.getElementById('music')) {
            var newVolume = document.getElementById('music').volume * 100;
            musicSlider.value = newVolume.toString();
        }
        else {
            musicSlider.value = '0';
        }
        if (parseInt(musicSlider.value) > 0) {
            muteGame.style.backgroundImage = "url(assets/unmuted.png)";
        }
        else {
            muteGame.style.backgroundImage = "url(assets/muted.png)";
        }
        musicSlider.addEventListener("input", function () {
            var volume = parseInt(musicSlider.value);
            volume = volume / 100;
            document.getElementById('music').volume = volume;
            if (musicSlider.value !== '0') {
                document.getElementById('music').play();
                muteGame.style.backgroundImage = 'url(assets/unmuted.png)';
            }
            else {
                document.getElementById('music').pause();
                muteGame.style.backgroundImage = 'url(assets/muted.png)';
            }
        });
        var effectOptions = document.createElement('effectOptions');
        options.appendChild(effectOptions);
        effectOptions.innerHTML += "Soundeffect Volume";
        var muteEffect = document.createElement('muteEffect');
        effectOptions.appendChild(muteEffect);
        var effectSlider = document.createElement('input');
        effectOptions.appendChild(effectSlider);
        effectSlider.type = "range";
        effectSlider.min = "0";
        effectSlider.max = "100";
        effectSlider.id = 'myRange';
        if (document.getElementById('soundeffect')) {
            var newVolume = document.getElementById('soundeffect').volume * 100;
            effectSlider.value = newVolume.toString();
        }
        else {
            effectSlider.value = '0';
        }
        if (parseInt(effectSlider.value) > 0) {
            muteEffect.style.backgroundImage = "url(assets/unmuted.png)";
        }
        else {
            muteEffect.style.backgroundImage = "url(assets/muted.png)";
        }
        effectSlider.addEventListener("input", function () {
            var volume = parseInt(effectSlider.value);
            volume = volume / 100;
            document.getElementById('soundeffect').volume = volume;
            if (effectSlider.value !== '0') {
                muteEffect.style.backgroundImage = 'url(assets/unmuted.png)';
            }
            else {
                muteEffect.style.backgroundImage = 'url(assets/muted.png)';
            }
        });
        effectSlider.addEventListener("change", function () {
            new Soundeffect().playThis('menuSelect.mp3');
        });
        var delSave = document.createElement('delSave');
        delSave.innerHTML = 'Delete save data';
        delSave.classList.add('button');
        options.appendChild(delSave);
        delSave.addEventListener('click', function () {
            var r = confirm("Are you sure you want to delete your progress?");
            if (r == true) {
                localStorage.clear();
                window.alert('your save data was succesfully deleted.');
            }
        });
        var leave = document.createElement('leave');
        _this.game.appendChild(leave);
        leave.addEventListener("click", function () {
            options.remove();
            leave.remove();
            new Soundeffect().playThis("menuBack.wav");
            _this.setButtons();
        });
        return _this;
    }
    return Options;
}(Startscreen));
var Soundeffect = (function () {
    function Soundeffect() {
        this.sound = document.createElement("audio");
    }
    Soundeffect.prototype.setSound = function () {
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.id = "soundeffect";
        this.sound.style.display = "none";
        this.sound.autoplay = true;
        this.sound.volume = 0.1;
        document.body.appendChild(this.sound);
    };
    Soundeffect.prototype.playThis = function (src) {
        document.getElementById('soundeffect').src = "assets/" + src;
        document.getElementById('soundeffect').play();
    };
    return Soundeffect;
}());
var unicornPlayer = (function () {
    function unicornPlayer() {
        this.changeCursorImage();
        this.spawnGlitter();
        this.circleOnClick();
    }
    unicornPlayer.prototype.changeCursorImage = function () {
        var newPointer = document.createElement("newPointer");
        var game = document.getElementsByTagName("body")[0];
        game.appendChild(newPointer);
        document.addEventListener('mousemove', function (pos) {
            newPointer.style.display = "initial";
            newPointer.style.transform = "translateY(calc(" + pos.clientY + "px - 1vh))";
            newPointer.style.transform += "translateX( calc(" + pos.clientX + "px - 0.5vw))";
        }, false);
    };
    unicornPlayer.prototype.spawnGlitter = function () {
        var body = document.getElementsByTagName('body')[0];
        document.addEventListener('mousemove', function (pos) {
            var d = Math.random();
            if (d > 0.90) {
                var glitter_1 = document.createElement("glitter");
                body.appendChild(glitter_1);
                glitter_1.style.display = "initial";
                glitter_1.style.filter = "hue-rotate(" + String(Math.floor(Math.random() * 350)) + "deg)";
                glitter_1.style.transform = 'translateY(' + (pos.clientY + Math.random() * 40) + 'px)';
                glitter_1.style.transform += 'translateX(' + (pos.clientX + Math.random() * 60) + 'px)';
                window.setTimeout(function () { body.removeChild(glitter_1); }, 1000);
            }
        }, true);
    };
    unicornPlayer.prototype.circleOnClick = function () {
        var body = document.getElementsByTagName('body')[0];
        document.addEventListener('mousedown', function (pos) {
            var circle = document.createElement("circle");
            body.appendChild(circle);
            circle.style.display = "initial";
            circle.style.transform = "translate(calc(" + pos.clientX + "px - 3vh),calc(" + pos.clientY + "px - 3vh)) scale(1)";
            circle.style.transition = "all 1s";
            setTimeout(function () {
                circle.style.transform = "translate(calc(" + pos.clientX + "px - 3vh),calc(" + pos.clientY + "px - 3vh)) scale(2)";
                circle.style.opacity = '0';
            }, 1);
            window.setTimeout(function () { body.removeChild(circle); }, 1000);
        }, true);
    };
    return unicornPlayer;
}());
window.addEventListener("load", function () { return new unicornPlayer(); });
//# sourceMappingURL=main.js.map
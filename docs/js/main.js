var Furniture = (function () {
    function Furniture(furnX, furnY, furnDimX, furnDimY, contains, background) {
        this.makeFurniture(furnX, furnY, furnDimX, furnDimY, contains, background);
    }
    Furniture.prototype.makeFurniture = function (furnX, furnY, furnDimX, furnDimY, contains, background) {
        var _this = this;
        this.furniture = document.createElement("furniture");
        this.shakeBox = document.createElement("shakeBox");
        var game = document.getElementsByTagName("game")[0];
        this.furniture.style.backgroundImage = background;
        this.furniture.style.height = furnDimY + "vh";
        this.furniture.style.width = furnDimX + "vw";
        this.shakeBox.style.transform = "translate(" + furnX + "vw," + furnY + "vh)";
        this.furniture.classList.add('shake');
        this.furniture.addEventListener('click', function () { return _this.additem(contains, furnX, furnY, furnDimX, furnDimY); });
        this.shakeBox.appendChild(this.furniture);
        game.appendChild(this.shakeBox);
    };
    Furniture.prototype.additem = function (contains, furnX, furnY, furnDimX, furnDimY) {
        this.furniture.classList.remove('shake');
        var game = document.getElementsByTagName("game")[0];
        furnDimX = furnDimX / 2;
        furnDimY = furnDimY / 2;
        if (contains == "none") {
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
        this.shakeBox.addEventListener('click', function () { return _this.startbattle(event, level); });
        this.shakeBox.appendChild(this.furniture);
        game.appendChild(this.shakeBox);
    };
    EvilFurniture.prototype.startbattle = function (event, level) {
        var game = document.getElementsByTagName("game")[0];
        this.furniture.classList.remove('shake');
        var grayout = document.createElement('grayout');
        var itemMessage = document.createElement('itemMessage');
        itemMessage.innerHTML = "You have found the wizards minion";
        event.target.parentElement.style.zIndex = "150";
        this.shakeBox.style.animation = "enemyappear 2s forwards";
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
        console.log("Created inventory");
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
        console.log("button pressed, loading in battlephase");
        var pointer = document.getElementsByTagName("newpointer")[0];
        var inv = document.getElementsByTagName("inventory")[0];
        var fadetonew = document.getElementsByTagName('fadetonew')[0];
        new Music().changeMusic('battleMusic.mp3');
        var gameChildren = new Array;
        var children = this.game.children;
        for (var i = 0; i < children.length; i++) {
            gameChildren.push(children[i]);
        }
        gameChildren.forEach(function (gameChild) {
            if (gameChild != pointer && gameChild != inv && gameChild != fadetonew) {
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
            inventoryadd.appendChild(inventoryItem);
        }
        var squares = 64;
        var xPosSquare = 8;
        var yPosSquare = 8;
        var spaces = document.getElementsByTagName("moveSpace");
        var monsters = new Array;
        var monsterCount = 0;
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
            }
        }
        inventory.addEventListener("drop", function () { return _this.drop(event); });
        inventory.addEventListener("dragover", function () { return _this.allowDrop(event); });
        for (var i = 0; i < inventoryItems.length; i++) {
            inventoryItems[i].id = "item" + i;
            inventoryItems[i].draggable = true;
            inventoryItems[i].addEventListener("dragstart", function () { return _this.drag(event); });
        }
        var monsterTypes = ["enemy_cabinet", "enemy_couch", "enemy_dumbell", "enemy_lamp", "enemy_plant"];
        switch (stage) {
            case 1:
                monsterCount = 4;
                break;
            case 2:
                monsterCount = 4;
                break;
            case 3:
                monsterCount = 4;
                break;
            case 4:
                monsterCount = 4;
                break;
            case 5:
                monsterCount = 4;
                break;
            case 6:
                monsterCount = 7;
                monsterTypes = ["wizard"];
                break;
        }
        for (var i = 0; i < monsterCount; i++) {
            var monster = document.createElement("monster");
            monster.classList.add("monster");
            monster.style.backgroundImage = "url(assets/" + monsterTypes[Math.floor(Math.random() * monsterTypes.length)] + ".png)";
            console.log(monster.style.backgroundImage);
            monster.id = "monster" + i;
            monsters.push(monster);
        }
        for (var i = 0; i < monsterCount; i++) {
            var randomNumber = Math.floor(Math.random() * 31);
            console.log(randomNumber);
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
        new Soundeffect("assets/nes-01-00.wav");
        var data = ev.dataTransfer.getData("text");
        var element = document.getElementById(data);
        if (ev.target.id.substring(0, 4) == "item") {
            console.log("space already has an item in it");
        }
        else if (element != null) {
            if (!element.classList.contains("gamer")) {
                ev.preventDefault();
                ev.target.appendChild(document.getElementById(data));
            }
        }
        var inventory = document.getElementsByTagName('inventory')[0];
        if (inventory.childNodes.length == 0) {
            console.log('no items in inventory');
            this.startBattle.style.opacity = "1";
        }
        if (inventory.childNodes.length > 0) {
            console.log('items in inventory');
            this.startBattle.style.opacity = "0";
        }
        if (element != null) {
            if (element.classList.contains("gamer") && ev.target.classList.contains("dropzone")) {
                ev.preventDefault();
                ev.target.appendChild(document.getElementById(data));
                element = document.getElementById(data);
            }
        }
        if (element != null) {
            if (element.classList.contains("gamer") && ev.target.classList.contains("monster")) {
                ev.preventDefault();
                console.log("you hit a monster");
                var monsterChild = ev.target;
                var monsterParent = monsterChild.parentNode;
                if (monsterParent) {
                    monsterParent.removeChild(monsterChild);
                    new Soundeffect("assets/nes-05-07.wav");
                }
                monsterParent.appendChild(document.getElementById(data));
                element = document.getElementById(data);
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
        var startbattle = document.getElementsByTagName('startBattle')[0];
        startbattle.innerHTML = "End your turn";
        this.enemyTurn();
    };
    BattlePhase.prototype.enemyTurn = function () {
        if (document.getElementById("monster0")) {
            console.log("the enemies are advancing");
            var monstersLeft = document.getElementsByTagName("monster");
            var activeMonster = document.getElementById("monster" + Math.floor(Math.random() * monstersLeft.length));
            if (activeMonster != null) {
                var spaceNow = activeMonster.parentNode;
                console.log(spaceNow.id);
                var direction = Math.floor(Math.random() * 100);
                if (direction < 10) {
                    console.log("move back");
                }
                else if (direction < 20 && direction >= 10) {
                    console.log("move left");
                }
                else if (direction < 30 && direction >= 20) {
                    console.log("move right");
                }
                else {
                    console.log("move forward");
                }
            }
            console.log(activeMonster);
            this.playerTurn();
        }
        else {
            console.log("you won");
        }
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
                if (numberTop > 0) {
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
                console.log(spaceNow);
                console.log(spacesThen);
                event.dataTransfer.setData("text", event.target.id);
                spacesThen.forEach(function (element) {
                    element.classList.add("dropzone");
                    element.addEventListener('dragover', function () { return _this.allowDrop(event); });
                });
            });
            element.addEventListener('dragend', function () {
                element.classList.remove("gamer");
                var oldSpaces = document.getElementsByClassName("dropzone");
                for (var i = 0; i < oldSpaces.length; i++) {
                    oldSpaces[i].classList.remove("dropzone");
                }
                for (var i = 0; i < oldSpaces.length; i++) {
                    oldSpaces[i].classList.remove("dropzone");
                }
                for (var i = 0; i < oldSpaces.length; i++) {
                    oldSpaces[i].classList.remove("dropzone");
                }
            });
        });
        console.log(unicornPlayers);
        console.log(unicornsLeft);
    };
    return BattlePhase;
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
        this.game.appendChild(playerIcon);
        var nextMessage = document.createElement('nextMessage');
        this.game.appendChild(nextMessage);
        nextMessage.innerHTML = ">";
        playerIcon.style.backgroundImage = "url(assets/" + player + ".png)";
        var currentDialog = 0;
        dialog.innerHTML = messages[currentDialog];
        nextMessage.addEventListener('click', function () {
            currentDialog += 1;
            if (currentDialog < messages.length) {
                dialog.innerHTML = "";
                dialog.innerHTML += messages[currentDialog];
            }
            else {
                dialog.remove();
                playerIcon.remove();
                nextMessage.remove();
            }
        });
    };
    return Dialogbox;
}());
window.addEventListener("load", function () { return new Startscreen(); });
var Startscreen = (function () {
    function Startscreen() {
        this.game = document.getElementsByTagName("game")[0];
        this.menu = document.createElement('menu');
        this.game.innerHTML = "";
        this.setBackground();
        this.setButtons();
        this.setAssets();
        new Music().playMusic('music.mp3');
        document.getElementById('music').volume = 0;
    }
    Startscreen.prototype.setBackground = function () {
        var background = document.createElement("background");
        background.style.backgroundImage = "url(assets/startscreen.png)";
        this.game.appendChild(background);
    };
    Startscreen.prototype.setAssets = function () {
        var title = document.createElement("title");
        title.innerHTML = "Tactical unicorn";
        this.game.appendChild(title);
        this.leftUnicorn = document.createElement("leftUnicorn");
        this.leftUnicorn.classList.add("bounce-left");
        this.game.appendChild(this.leftUnicorn);
        this.rightUnicorn = document.createElement("rightUnicorn");
        this.rightUnicorn.classList.add("bounce-right");
        this.game.appendChild(this.rightUnicorn);
    };
    Startscreen.prototype.setButtons = function () {
        var _this = this;
        var startButton = document.createElement("startButton");
        startButton.innerHTML = "Play";
        var optionsButton = document.createElement("optionsButton");
        optionsButton.innerHTML = 'Options';
        var creditsButton = document.createElement("creditsButton");
        creditsButton.innerHTML = "Credits";
        var quitButton = document.createElement("quitButton");
        quitButton.innerHTML = "Quit";
        this.menu.appendChild(startButton);
        this.menu.appendChild(optionsButton);
        this.menu.appendChild(creditsButton);
        this.menu.appendChild(quitButton);
        this.game.appendChild(this.menu);
        startButton.addEventListener('click', function () {
            _this.levelSelect();
        });
        optionsButton.addEventListener('click', function () {
            _this.setOptions();
        });
        creditsButton.addEventListener('click', function () {
            _this.setCredits();
        });
        quitButton.addEventListener('click', function () {
            close();
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
    Startscreen.prototype.setUnlock = function (lvlAchieved) {
        var unlockeds;
        unlockeds = [];
        if (lvlAchieved == 0) {
            unlockeds = [false, true, true, true, true, true];
        }
        if (lvlAchieved == 1) {
            unlockeds = [false, false, true, true, true, true];
        }
        if (lvlAchieved == 2) {
            unlockeds = [false, false, false, true, true, true];
        }
        if (lvlAchieved == 3) {
            unlockeds = [false, false, false, false, true, true];
        }
        if (lvlAchieved == 4) {
            unlockeds = [false, false, false, false, false, true];
        }
        if (lvlAchieved == 5) {
            unlockeds = [false, false, false, false, false, false];
        }
        return unlockeds;
    };
    Startscreen.prototype.levelSelect = function () {
        var _this = this;
        this.menu.innerHTML = "";
        this.leftUnicorn.remove();
        this.rightUnicorn.remove();
        var unlocked = this.setUnlock(5);
        if (unlocked[0] == false) {
            this.makeLevelIcon(14.1, 59.7, 10.8, 36.1, 1);
            this.levelIcon.addEventListener("click", function () {
                _this.game.innerHTML = "";
                new Level1click;
            });
        }
        if (unlocked[1] == false) {
            this.makeLevelIcon(25.7, 52.8, 14.75, 43.05, 2);
            this.levelIcon.addEventListener("click", function () {
                _this.game.innerHTML = "";
                new Level2click;
            });
        }
        if (unlocked[3] == false) {
            this.makeLevelIcon(45.1, 44.4, 19.4, 51.4, 4);
            this.levelIcon.addEventListener("click", function () {
                _this.game.innerHTML = "";
                new Level4click;
            });
        }
        if (unlocked[2] == false) {
            this.makeLevelIcon(40.5, 65.3, 9.2, 30.6, 3);
            this.levelIcon.addEventListener("click", function () {
                _this.game.innerHTML = "";
                new Level3click;
            });
        }
        if (unlocked[4] == false) {
            this.makeLevelIcon(64.5, 57, 10.1, 38.9, 5);
            this.levelIcon.addEventListener("click", function () {
                _this.game.innerHTML = "";
                new Level5click;
            });
        }
        if (unlocked[5] == false) {
            this.makeLevelIcon(74.7, 45.9, 17, 49.9, 6);
            this.levelIcon.addEventListener("click", function () {
                _this.game.innerHTML = "";
                new Level6click;
            });
        }
        var leave = document.createElement('leave');
        this.game.appendChild(leave);
        leave.addEventListener("click", function () {
            while (document.getElementsByTagName('level').length > 0) {
                for (var i = 0; i < document.getElementsByTagName('level').length; i++) {
                    document.getElementsByTagName('level')[i].remove();
                }
            }
            leave.remove();
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
        credits.innerHTML += "<name>Luuk s&#039;Gravendijk</name>";
        credits.innerHTML += "<name>Luuk s&#039;Gravendijk</name>";
        credits.innerHTML += "<name>All involved</name>";
        var leave = document.createElement('leave');
        this.game.appendChild(leave);
        leave.addEventListener("click", function () {
            credits.remove();
            leave.remove();
            _this.setButtons();
        });
    };
    Startscreen.prototype.setOptions = function () {
        var _this = this;
        this.menu.innerHTML = "";
        var options = document.createElement('options');
        this.game.appendChild(options);
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
        musicSlider.addEventListener("input", function () {
            var musicVolume = parseInt(musicSlider.value);
            console.log(musicVolume);
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
        var leave = document.createElement('leave');
        this.game.appendChild(leave);
        leave.addEventListener("click", function () {
            options.remove();
            leave.remove();
            _this.setButtons();
        });
    };
    return Startscreen;
}());
var Level1click = (function () {
    function Level1click() {
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
        this.setFurniture();
        this.setBackground();
        new Hint(39, 26, 9, 11, "As you walk into the room you feel a powerfull surge. Its cold like you are in a blizzard. When you find the item in witch he resides youll find yourself fighting a wizard.");
        new Inventory();
        new Dialogbox("unicorn_player", "I can feel hes in the room somewhere");
        new Dialogbox("wizard", "...*...*I hope they dont find me in here*But if they do I will surely destroy them");
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
        function zoomin() {
            game.style.zoom = "450%";
            var xzoom = x - h / 2.5;
            var yzoom = y - w / 2.5;
            if (xzoom < 0) {
                xzoom = 0;
            }
            if (yzoom < 0) {
                yzoom = 0;
            }
            game.style.transform += "translate(-" + xzoom + "vw,-" + yzoom + "vh)";
            hint.removeEventListener('click', zoomin);
            hint.addEventListener('click', zoomout);
        }
        function zoomout() {
            game.style.zoom = "100%";
            game.style.transform = "";
            hint.removeEventListener('click', zoomout);
            hint.addEventListener('click', zoomin);
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
    };
    Music.prototype.changeMusic = function (src) {
        document.getElementById('music').src = "assets/" + src;
        document.getElementById('music').play();
    };
    return Music;
}());
var Soundeffect = (function () {
    function Soundeffect(src) {
        this.playSound(src);
    }
    Soundeffect.prototype.playSound = function (src) {
        var sound = document.createElement("audio");
        sound.src = src;
        sound.setAttribute("preload", "auto");
        sound.setAttribute("controls", "none");
        sound.style.display = "none";
        document.body.appendChild(sound);
        sound.play();
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
            if (d > 0.5) {
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
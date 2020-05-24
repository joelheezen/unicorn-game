"use strict";
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
            itemMessage_1.innerHTML = "Item '" + contains.replace("_", " ") + "' added to inventory";
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
    function EvilFurniture(furnX, furnY, furnDimX, furnDimY, background) {
        this.makeEvilFurniture(furnX, furnY, furnDimX, furnDimY, background);
    }
    EvilFurniture.prototype.makeEvilFurniture = function (furnX, furnY, furnDimX, furnDimY, background) {
        var _this = this;
        this.furniture = document.createElement("furniture");
        this.shakeBox = document.createElement("shakeBox");
        var game = document.getElementsByTagName("game")[0];
        this.furniture.style.backgroundImage = background;
        this.furniture.style.height = furnDimY + "vh";
        this.furniture.style.width = furnDimX + "vw";
        this.shakeBox.style.transform = "translate(" + furnX + "vw," + furnY + "vh)";
        this.furniture.classList.add('shake');
        this.shakeBox.addEventListener('click', function () { return _this.startbattle(event); });
        this.shakeBox.appendChild(this.furniture);
        game.appendChild(this.shakeBox);
    };
    EvilFurniture.prototype.startbattle = function (event) {
        var game = document.getElementsByTagName("game")[0];
        this.furniture.classList.remove('shake');
        var grayout = document.createElement('grayout');
        var itemMessage = document.createElement('itemMessage');
        itemMessage.innerHTML = "You have found the enemy";
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
            new BattlePhase();
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
    function BattlePhase() {
        console.log("button pressed, loading in battlephase");
        var game = document.getElementsByTagName("game")[0];
        var pointer = document.getElementsByTagName("newpointer")[0];
        var inv = document.getElementsByTagName("inventory")[0];
        var fadetonew = document.getElementsByTagName('fadetonew')[0];
        var gameChildren = new Array;
        var children = game.children;
        for (var i = 0; i < children.length; i++) {
            gameChildren.push(children[i]);
        }
        gameChildren.forEach(function (gameChild) {
            if (gameChild != pointer && gameChild != inv && gameChild != fadetonew) {
                game.removeChild(gameChild);
            }
        });
        var background = document.createElement("background");
        background.style.backgroundImage = "url(assets/2.png)";
        game.appendChild(background);
        var inventoryItems = document.getElementsByTagName('inventory')[0].children;
        var squares = 140;
        var xPosSquare = 0;
        var yPosSquare = 0;
        var inventory = document.getElementsByTagName('inventory')[0];
        function allowDrop(ev) {
            ev.preventDefault();
        }
        function drag(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
        }
        function drop(ev) {
            if (ev.target.id.substring(0, 4) == "item") {
                console.log("space already has an item in it");
            }
            else {
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                ev.target.appendChild(document.getElementById(data));
            }
        }
        for (var i = 0; i < squares; i++) {
            var moveSpace = document.createElement("moveSpace");
            game.appendChild(moveSpace);
            moveSpace.id = "square" + i;
            moveSpace.style.transform = "translate(" + xPosSquare + "vw, " + yPosSquare + "vh)";
            xPosSquare += 6.67;
            if (xPosSquare > 93) {
                xPosSquare = 0;
                yPosSquare += 10;
            }
            moveSpace.addEventListener("drop", function () { return drop(event); });
            moveSpace.addEventListener("dragover", function () { return allowDrop(event); });
            inventory.addEventListener("drop", function () { return drop(event); });
            inventory.addEventListener("dragover", function () { return allowDrop(event); });
        }
        for (var i = 0; i < inventoryItems.length; i++) {
            inventoryItems[i].id = "item" + i;
            inventoryItems[i].draggable = true;
            inventoryItems[i].addEventListener("dragstart", function () { return drag(event); });
        }
    }
    BattlePhase.prototype.createBoard = function () {
    };
    return BattlePhase;
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
    Startscreen.prototype.levelSelect = function () {
        var _this = this;
        this.menu.innerHTML = "";
        this.leftUnicorn.remove();
        this.rightUnicorn.remove();
        this.makeLevelIcon(14.1, 59.7, 10.8, 36.1, 1);
        this.levelIcon.addEventListener("click", function () {
            _this.game.innerHTML = "";
            new Level1click;
        });
        this.makeLevelIcon(25.7, 52.8, 14.75, 43.05, 2);
        this.levelIcon.addEventListener("click", function () {
            _this.game.innerHTML = "";
            new Level2click;
        });
        this.makeLevelIcon(45.1, 44.4, 19.4, 51.4, 4);
        this.levelIcon.addEventListener("click", function () {
            _this.game.innerHTML = "";
            new Level4click;
        });
        this.makeLevelIcon(40.5, 65.3, 9.2, 30.6, 3);
        this.levelIcon.addEventListener("click", function () {
            _this.game.innerHTML = "";
            new Level3click;
        });
        this.makeLevelIcon(64.5, 57, 10.1, 38.9, 5);
        this.levelIcon.addEventListener("click", function () {
            _this.game.innerHTML = "";
            new Level5click;
        });
        this.makeLevelIcon(74.7, 45.9, 17, 49.9, 6);
        this.levelIcon.addEventListener("click", function () {
            _this.game.innerHTML = "";
            new Level6click;
        });
        var leave = document.createElement('leave');
        this.game.appendChild(leave);
        leave.addEventListener("click", function () {
            document.getElementsByTagName('level')[0].remove();
            document.getElementsByTagName('level')[0].remove();
            document.getElementsByTagName('level')[0].remove();
            document.getElementsByTagName('level')[0].remove();
            document.getElementsByTagName('level')[0].remove();
            document.getElementsByTagName('level')[0].remove();
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
        options.innerHTML += "Music volume";
        var musicVolume = document.createElement('input');
        options.appendChild(musicVolume);
        musicVolume.type = "range";
        musicVolume.min = "1";
        musicVolume.max = "100";
        musicVolume.id = 'myRange';
        musicVolume.addEventListener("input", function () {
            var volume = parseInt(musicVolume.value);
            volume = volume / 100;
            document.getElementsByTagName('audio')[0].volume = volume;
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
        new Hint(70.7, 9, 12.5, 8.6, "dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text");
        new Inventory();
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
        new EvilFurniture(82, 10.9, 8, 16.6, "url(assets/plant.png)");
    };
    return Level1click;
}());
var Level1Battle = (function () {
    function Level1Battle() {
    }
    return Level1Battle;
}());
var Level2click = (function () {
    function Level2click() {
        this.setFurniture();
        this.setBackground();
        new Hint(60, 30, 12.5, 11, "dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text");
        new Inventory();
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
        new EvilFurniture(36.8, 12.6, 8.8, 7.6, "url(assets/sun_and_cloud.png)");
    };
    return Level2click;
}());
var Level2Battle = (function () {
    function Level2Battle() {
    }
    return Level2Battle;
}());
var Level3click = (function () {
    function Level3click() {
        this.setFurniture();
        this.setBackground();
        new Hint(9, 12, 12.5, 11, "dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text");
        new Inventory();
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
        new EvilFurniture(17, 57.5, 9.9, 11.5, "url(assets/pillow.png)");
    };
    return Level3click;
}());
var Level3Battle = (function () {
    function Level3Battle() {
    }
    return Level3Battle;
}());
var Level4click = (function () {
    function Level4click() {
        this.setFurniture();
        this.setBackground();
        new Hint(39, 26, 12.5, 11, "dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text");
        new Inventory();
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
        new EvilFurniture(83.1, 61.7, 5.6, 16.5, "url(assets/fire.png)");
    };
    return Level4click;
}());
var Level4Battle = (function () {
    function Level4Battle() {
    }
    return Level4Battle;
}());
var Level5click = (function () {
    function Level5click() {
        this.setFurniture();
        this.setBackground();
        new Hint(39, 26, 12.5, 11, "dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text");
        new Inventory();
    }
    Level5click.prototype.setBackground = function () {
        var background = document.createElement("background");
        var game = document.getElementsByTagName("game")[0];
        background.style.backgroundImage = "url(assets/2.png)";
        game.appendChild(background);
        var home = document.createElement('backHome');
        game.appendChild(home);
        home.addEventListener('click', function () { return new Startscreen; });
    };
    Level5click.prototype.setFurniture = function () {
        new Furniture(7.9, 36.7, 6, 43.4, "unicorn_laser", "url(assets/long_lamp.png)");
        new Furniture(28.7, 0, 12.3, 21.7, "unicorn_rifle", "url(assets/ceiling_lamp.png)");
        new Furniture(30.6, 28.3, 7.6, 21.7, "none", "url(assets/long_frame.png)");
        new Furniture(78.4, 41.5, 5.7, 10.3, "none", "url(assets/small_frame.png)");
        new Furniture(62.5, 51.6, 2, 8.4, "unicorn_gun", "url(assets/book.png)");
        new Furniture(46.6, 66.7, 2.8, 5, "unicorn_gun", "url(assets/mug.png)");
        new EvilFurniture(83.1, 61.7, 5.6, 16.5, "url(assets/fire.png)");
    };
    return Level5click;
}());
var Level5Battle = (function () {
    function Level5Battle() {
    }
    return Level5Battle;
}());
var Level6click = (function () {
    function Level6click() {
        this.setFurniture();
        this.setBackground();
        new Hint(39, 26, 12.5, 11, "dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text");
        new Inventory();
    }
    Level6click.prototype.setBackground = function () {
        var background = document.createElement("background");
        var game = document.getElementsByTagName("game")[0];
        background.style.backgroundImage = "url(assets/2.png)";
        game.appendChild(background);
        var home = document.createElement('backHome');
        game.appendChild(home);
        home.addEventListener('click', function () { return new Startscreen; });
    };
    Level6click.prototype.setFurniture = function () {
        new Furniture(7.9, 36.7, 6, 43.4, "unicorn_laser", "url(assets/long_lamp.png)");
        new Furniture(28.7, 0, 12.3, 21.7, "unicorn_rifle", "url(assets/ceiling_lamp.png)");
        new Furniture(30.6, 28.3, 7.6, 21.7, "none", "url(assets/long_frame.png)");
        new Furniture(78.4, 41.5, 5.7, 10.3, "none", "url(assets/small_frame.png)");
        new Furniture(62.5, 51.6, 2, 8.4, "unicorn_gun", "url(assets/book.png)");
        new Furniture(46.6, 66.7, 2.8, 5, "unicorn_gun", "url(assets/mug.png)");
        new EvilFurniture(83.1, 61.7, 5.6, 16.5, "url(assets/fire.png)");
    };
    return Level6click;
}());
var Level6Battle = (function () {
    function Level6Battle() {
    }
    return Level6Battle;
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
            game.style.zoom = "300%";
            var xzoom = x - h;
            var yzoom = y - w;
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
var unicornPlayer = (function () {
    function unicornPlayer() {
        this.changeCursorImage();
        this.spawnGlitter();
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
    return unicornPlayer;
}());
window.addEventListener("load", function () { return new unicornPlayer(); });
//# sourceMappingURL=main.js.map
// ==UserScript==
// @name         PH - Gem Cauldron
// @namespace    https://github.com/warpKaiba
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http*://pokeheroes.com/gem_cauldron*
// @grant        none
// @downloadURL  https://github.com/warpKaiba/TMpokeheroes/raw/master/PHGemCauldron.user.js
// @icon         https://vignette.wikia.nocookie.net/pkmnshuffle/images/7/7f/Ducklett.png/revision/latest?cb=20170409032016
// ==/UserScript==

var wantedGems = $("[style*='margin-left: 106px']")
var choiceGems = $("[onclick*='addGem']")

var cauldronInterval = setInterval(function() {
    if (displayedGem >= 0) {
        getPixelFrom(wantedGems[displayedGem].src)
    }
}, 300)

function getPixelFrom(gemg) {
    var img = new Image;

    var canvas = document.createElement('canvas');
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
        var pixelData = canvas.getContext('2d').getImageData(40, 45, 1, 1).data;
        clickGem(pixelData.toString())
    }
    img.src = gemg + ".png";
}


function clickGem(gemg) {
    switch(gemg) {
        case "156,173,247,255": //flying
            addGem('Flying')
        case "156,189,33,255": //bug
            addGem('Bug')
        case "198,181,181,255": //normal
            addGem('Normal')
        case "148,74,123,255": //fighting
            addGem('Fighting')
        case "107,99,140,255": //poison
            addGem('Poison')
        case "165,107,33,255": //ground
            addGem('Ground')
        case "140,115,90,255": //rock
            addGem('Rock')
        case "80,64,152,255": //ghost
            addGem('Ghost')
        case "99,99,99,255": //steel
            addGem('Steel')
        case "240,64,48,255": //fire
            addGem('Fire')
        case "48,144,248,255": //water
            addGem('Water')
        case "66,206,82,255": //grass
            addGem('Grass')
        case "231,206,0,255": //electric
            addGem('Electric')
        case "214,57,140,255": //psychic
            addGem('Psychic')
        case "49,214,255,255": //ice
            addGem('Ice')
        case "132,99,231,255": //dragon
            addGem('Dragon')
        case "54,54,54,255": //dark
            addGem('Dark')
        case "232,146,191,255": //fairy
            addGem('Fairy')
    }
}

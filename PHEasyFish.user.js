// ==UserScript==
// @name         PH - Easy Fish
// @namespace    https://github.com/warpKaiba
// @version      0.1
// @description  adds fishing buttons
// @author       You
// @match        https://pokeheroes.com/beach*
// @downloadURL  https://github.com/warpKaiba/TMpokeheroes/raw/master/PHEasyFish.user.js
// @icon         https://vignette.wikia.nocookie.net/pkmnshuffle/images/7/7f/Ducklett.png/revision/latest?cb=20170409032016
// @grant        none
// ==/UserScript==

var fishingDiv = $("#rodinterface")[0]
fishingDiv.insertAdjacentHTML("afterend", "<button id=catchafish>Catch a fish</button> <button id=catchmanyfish>Catch every fish</button> <button id=stopfishing>Stop fishing</button>")

$("#catchafish")[0].addEventListener("click", catchAFish)
$("#catchmanyfish")[0].addEventListener("click", catchManyFish)
$("#stopfishing")[0].addEventListener("click", stopFishing)

var fishingTimer;
function catchManyFish() {
    var fishingTimer = setInterval(function(){
        catchAFish()
    }, 420)
    }


function catchAFish() {
    isCatchOnRod = true
    if (getFishingEnergy() > MIN_REQ_ENERGY) {
        pullRodBack(false)
        setTimeout(function(){
            catchFish()
        }, 200)
    }
}

function stopFishing() {
    clearInterval(fishingTimer)
}
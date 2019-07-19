// ==UserScript==
// @name         PH - Lottery Quick Buy
// @namespace    https://github.com/warpKaiba
// @version      0.1
// @description  Pokeheroes hangman word suggester
// @author       You
// @match        https://pokeheroes.com/gc_lottery*
// @grant        none
// @downloadURL  https://github.com/warpKaiba/TMpokeheroes/raw/master/PHlottery.user.js
// @icon         https://vignette.wikia.nocookie.net/pkmnshuffle/images/7/7f/Ducklett.png/revision/latest?cb=20170409032016
// ==/UserScript==

$("form")[1].insertAdjacentHTML("beforeend", "<button id='500tickets'>Buy 500</button>")
$("#500tickets").on("click", function() {
    $("[name=random_lot]")[0].value = 500
})
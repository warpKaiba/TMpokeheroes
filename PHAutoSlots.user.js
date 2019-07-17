// ==UserScript==
// @name         PH - Auto Slots
// @namespace    https://github.com/warpKaiba
// @version      0.2
// @description  automatically spins slots
// @author       You
// @match        https://pokeheroes.com/golden_slot*
// @downloadURL  https://github.com/warpKaiba/TMpokeheroes/raw/master/PHAutoSlots.user.js
// @icon         https://vignette.wikia.nocookie.net/pkmnshuffle/images/7/7f/Ducklett.png/revision/latest?cb=20170409032016
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var winnings = showWin.toString().match(/\"(.*)\"/)


    if (winnings != null) {
        document.getElementById("golden_slot").insertAdjacentHTML("beforebegin", "<p style='text-align: center;font-weight: bold;font-size: 1.3em;'>" + winnings[1] + "</p>")

        showWin = function showWin() {console.log(winnings[1])}
    } else document.getElementById("golden_slot").insertAdjacentHTML("beforebegin", "<p style='text-align: center;font-weight: bold;font-size: 1.3em;'>Sorry, you didn't win anything.</p>")

    if (window.location.search.includes("spin=true")) {
        location.reload()
    }
})();
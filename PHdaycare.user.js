// ==UserScript==
// @name         PH - Daycare
// @namespace    https://github.com/warpKaiba
// @version      0.1
// @description  Auto scans eggs on page load
// @author       kaiba
// @match        https://pokeheroes.com/daycare*
// @downloadURL  https://github.com/warpKaiba/TMpokeheroes/raw/master/PHdaycare.user.js
// @icon         https://vignette.wikia.nocookie.net/pkmnshuffle/images/7/7f/Ducklett.png/revision/latest?cb=20170409032016
// ==/UserScript==

(function() {
    'use strict';
    var scanButtons = $("a[href^='?scan']")
    if (scanButtons.length > 0) {
        scanButtons[0].click()
    }

    var eggElements = $("a[onclick^=adoptEgg]")
    var eggID;

    if (eggElements.length > 0) {
        eggElements[0].parentNode.insertAdjacentHTML("beforeend", "<button id=adoptalleggs style='padding: 0px 10px'>Adopt All</button>")
        $("#adoptalleggs").on("click", (function (){adoptAllEggs}))
    }

    function adoptAllEggs() {
        if (eggElements.length > 0) {
            for (var i = 0; i < eggElements.length; i++) {
                eggID = $("a[onclick^=adoptEgg]")[i].onclick.toString().match(/Egg\((.*)\)/)[1]
                $('<div>').load('daycare?adopt='+eggID);
                eggElements[i].parentNode.hidden = true
            }
        }
    }
})();
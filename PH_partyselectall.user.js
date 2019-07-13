// ==UserScript==
// @name         PH - Select party at storage box
// @namespace    https://github.com/warpKaiba
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        https://pokeheroes.com/storage_box
// @grant        none
// @downloadURL  https://github.com/warpKaiba/TMpokeheroes/raw/master/PH_partyselectall.user.js
// @icon         https://vignette.wikia.nocookie.net/pkmnshuffle/images/7/7f/Ducklett.png/revision/latest?cb=20170409032016
// ==/UserScript==

(function() {
    'use strict';
    document.getElementById("pkmn_sel_list").parentNode.insertAdjacentHTML('beforebegin', '<button id="selectall">Select All</button>')
    document.getElementById("selectall").addEventListener("click", selectAll)
    function selectAll() {
        var checkboxes = document.getElementById("storage_box").querySelectorAll("[type='checkbox']")
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].click()
        }
    }
    // Your code here...
})();
// ==UserScript==
// @name         PH - Select party at storage box
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://pokeheroes.com/storage_box
// @grant        none
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
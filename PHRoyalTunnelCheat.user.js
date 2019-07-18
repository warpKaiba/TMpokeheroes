// ==UserScript==
// @name         PH - Royal Tunnel Cheat
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://pokeheroes.com/royal_tunnel*
// @grant        none
// @downloadURL  https://github.com/warpKaiba/TMpokeheroes/raw/master/PHRoyalTunnelCheat.user.js
// @icon         https://vignette.wikia.nocookie.net/pkmnshuffle/images/7/7f/Ducklett.png/revision/latest?cb=20170409032016
// ==/UserScript==

(function() {
    'use strict';

    document.getElementById("footer").insertAdjacentHTML("beforebegin", "<div><div id='dex1'>empty</div><div id='dex2'>empty</div><div id='dex3'>empty</div></div>")

    $('#dex1').load('includes/ajax/pokedex/view_entry.php', {pkdxnr: parseInt($(".royal_pkmn1")[0].src.match(/(\d*)\.png/)[1])});
    $('#dex2').load('includes/ajax/pokedex/view_entry.php', {pkdxnr: parseInt($(".royal_pkmn2")[0].src.match(/(\d*)\.png/)[1])});
    $('#dex3').load('includes/ajax/pokedex/view_entry.php', {pkdxnr: parseInt($(".royal_pkmn3")[0].src.match(/(\d*)\.png/)[1])});
    // Your code here...
})();
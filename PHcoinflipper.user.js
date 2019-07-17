// ==UserScript==
// @name         PH - Coin Flipper
// @namespace    https://github.com/warpKaiba
// @version      0.4
// @description  Adds buttons to flip the coin for you
// @author       You
// @match        https://pokeheroes.com/gc_coinflip*
// @grant        none
// @downloadURL  https://github.com/warpKaiba/TMpokeheroes/raw/master/PHcoinflipper.user.js
// @icon         https://vignette.wikia.nocookie.net/pkmnshuffle/images/7/7f/Ducklett.png/revision/latest?cb=20170409032016
// ==/UserScript==

(function() {
    'use strict';
    var i = 0, max = 10, delay = 200, run
    run = function() {

        coinflip() // website function

        if(i++ < max || max == 0){
            setTimeout(run, delay);
        }
    }


    var flipButton = document.querySelector("[onclick='coinflip();']")
    flipButton.insertAdjacentHTML("afterend", " <button id='flip10'>Flip 10x</button> <button id='flip100'>Flip 100x</button> <button id='flip1000'>Flip 1000x</button><br><br> <button id='flipinf'>Flip forever</button> <button id='stopflip'>Stop flipping</button><br><br><div><div>Statistics:</div><div>Total flips: </div><div id='totalflips'>0</div><div>Successes: </div><div id='successflips'>0</div><div>Win rate: </div><div id='winpercent'>%0</div><div>Spent: </div><div id='divspent'>0</div><div>Winnings: </div><div id='divwinnings'>0</div></div>")
    document.getElementById("flip10").addEventListener("click", flip10)
    document.getElementById("flip100").addEventListener("click", flip100)
    document.getElementById("flip1000").addEventListener("click", flip1000)
    document.getElementById("flipinf").addEventListener("click", flipInf)
    document.getElementById("stopflip").addEventListener("click", stopFlip)
    var totalFlips = document.getElementById("totalflips")
    var successFlips = document.getElementById("successflips")
    var winPercent = document.getElementById("winpercent")
    var divSpent = document.getElementById("divspent")
    var divWinnings = document.getElementById("divwinnings")


    coinflip = function coinflip() {

        var side = $('input[name=coinside]:checked').val();
        if (side != null && side != "") {
            var bet = $("input[name=bet]").val();
            divSpent.innerText = parseInt(divSpent.innerText) + parseInt(bet)
            coinLoading = true;
            $(".coinflip_loader").height("260px").load("includes/ajax/game_center/coinflip.php", {
                'coinside': side,
                'bet': bet
            }, function(response) {
                coinLoading = false;
                totalFlips.innerText = parseInt(totalFlips.innerText) + 1
                if (!response.includes("lost")) {
                    successFlips.innerText = parseInt(successFlips.innerText) + 1
                    divWinnings.innerText = parseInt(divWinnings.innerText) + (bet * 2)
                }
                winPercent.innerText = "%" + ((parseInt(successFlips.innerText) / parseInt(totalFlips.innerText))*100)
            });
        } else {
            alert("Please select Heads or Tails!");
        }
    }
    function flip10() {
        max = 10
        i = 0
        run()
    }

    function flip100() {
        max = 100
        i = 0
        run()
    }
    function flip1000() {
        max = 1000
        i = 0
        run()
    }
    function flipInf() {
        max = 0
        i = 0
        run()
    }
    function stopFlip() {
        max = 1
    }

    // Your code here...
})();
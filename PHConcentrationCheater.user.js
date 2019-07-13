// ==UserScript==
// @name         PH - Concentration Cheater
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  just straight up cheats the hell out of the concentration game, only use if you're a weenie
// @author       You
// @match        https://pokeheroes.com/gc_concentration*
// @grant        none
// @icon         https://vignette.wikia.nocookie.net/pkmnshuffle/images/7/7f/Ducklett.png/revision/latest?cb=20170409032016
// @downloadURL  https://github.com/warpKaiba/TMpokeheroes/raw/master/PHcoinflipper.user.js
// ==/UserScript==


setCard = function setCard(i, pkdxnr) {
    $("td#concenCard" + i + " .back")
        .html('<img src="//staticpokeheroes.com/img/pokemon/bw_front/0'+pkdxnr+'.png" style="position: absolute; z-index: 2; width: 100%; max-width: 96px"><img src="//staticpokeheroes.com/img/game_center/concentration/card_blank.png" style="width: 100%">');
     $("td#concenCard" + i + " .front")
        .html('<img src="//staticpokeheroes.com/img/pokemon/bw_front/0'+pkdxnr+'.png" style="cursor: pointer; position: absolute; z-index: 2; width: 100%; max-width: 96px" onClick="flipCard('+i+');"><img src="//staticpokeheroes.com/img/game_center/concentration/card_blank.png" style="width: 100%">');
    $("td#concenCard" + i + " div.inner").addClass('concenFlipped').flip(true);
}

function checkEndGame() {
    if ($("table#game_table div.inner").length <= 0)
        location.href = '?';
}

var cardLoading = false;

function flipCard(i) {
    if (cardLoading)
        return;
    cardLoading = true;
    $("<div>").load("includes/ajax/game_center/concentration_flip.php", {
        'card': i
    }, function() {
        if ($(this).find(".pkdxnr").length > 0)
            setCard(i, parseInt($(this).find(".pkdxnr").text()));
        var t = this;
        if ($(t).find(".succ").length > 0) {
            window.setTimeout(function() {
                if ($(t).find(".succ").text() == "0") {
                    incWrongGuesses();
                    $(".concenFlipped").each(function() {
                        $(this).flip(false);
                        $(this).removeClass('concenFlipped');
                    });
                } else {
                    incPoints();
                    $(".concenFlipped").remove();
                    checkEndGame();
                }

                if ($(t).find(".dartober_event").length > 0)
                    darktoberAnimation();
                cardLoading = false;
            }, 1200);
        } else {
            cardLoading = false;
        }
    });
}

function incWrongGuesses() {
    w = $(".concWrong");
    w.text(parseInt(w.text()) + 1);
}

function setPoints(i) {
    $(".concPoints").text(i);
}

function incPoints() {
    setPoints(parseInt($(".concPoints").text()) + 2);
}

function darktoberAnimation() {
    $('<div style="display: none; background: black; position: fixed; left: 0; top: 0; width: 100%; z-index: 200"><img src="//staticpokeheroes.com/img/darktober/dark_fountain.png" style="width: 100%"></div>')
        .appendTo("body")
        .fadeIn(2000, function() {
        $(this).delay(2000).fadeOut(2000);
    });
}

$("td[id^=concenCard] div.inner").flip({ trigger: 'manual'});

setPoints(0);
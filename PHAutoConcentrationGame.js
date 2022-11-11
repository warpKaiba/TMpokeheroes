// ==UserScript==
// @name         PH - Concentration Game
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       ewei068
// @match        https://pokeheroes.com/gc_concentration*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pokeheroes.com
// @grant        none
// ==/UserScript==

async function flipCard(i) {
    if (cardLoading)
        return;
    cardLoading = true;
    var num = -1;
    const myPromise = new Promise((resolve, reject) => {
        $("<div>").load("includes/ajax/game_center/concentration_flip.php", {
            'card': i,
        }, function() {
            if ($(this).find(".pkdxnr").length > 0) {
                setCard(i, parseInt($(this).find(".pkdxnr").text()));
                console.log(parseInt($(this).find(".pkdxnr").text()));
                num = parseInt($(this).find(".pkdxnr").text())
            }
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
                }, 100);
            } else {
                cardLoading = false;
            }
            resolve(num)
        });
    });
    num = await myPromise
    return num
}

const numPkmn = 36
covered = Array.from(Array(numPkmn).keys())
const pkmnMap = {}

try {
    while (covered) {
        id1 = covered.pop()
        pkmn1 = await flipCard(id1)
        await new Promise(r => setTimeout(r, 100));
        if (pkmn1 in pkmnMap) {
            await flipCard(pkmnMap[pkmn1])
        } else {
            id2 = covered.pop()
            pkmn2 = await flipCard(id2)
            if (pkmn1 != pkmn2) {
                pkmnMap[pkmn1] = id1
                if (pkmn2 in pkmnMap) {
                    covered.push(id2)
                } else {
                    pkmnMap[pkmn2]=id2
                }
            }
        }
        await new Promise(r => setTimeout(r, 100));
    }
} catch (e) {
    await new Promise(r => setTimeout(r, 2500));
    window.location.href = 'https://pokeheroes.com/gc_concentration?d=2';
}
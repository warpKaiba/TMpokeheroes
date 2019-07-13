// ==UserScript==
// @name         PH - Now This Is Epic HeHe
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Automatically runs on clicklist
// @author       You
// @match        https://pokeheroes.com/pokemon_lite*
// @grant        GM.xmlHttpRequest
// @connect      pokeheroes.com
// @connect      staticpokeheroes.com
// @downloadURL  https://github.com/warpKaiba/TMpokeheroes/raw/master/PHEpicScriptEPIC.user.js
// ==/UserScript==


if (document.getElementsByClassName("cheat_valid")[0] != undefined) {
    'use strict';
    var pokemonTestInc = 0;
    var pokemonTest = [];
    var cheatContainer = document.getElementsByClassName("cheat_valid"); //div that contains everything
    var pokemonURLs = cheatContainer[0].querySelectorAll('img[onclick]'); //clickable images; the three pokemon choices
    var pokemonValidationNumbers = [];

    for (var j = 0; j < pokemonURLs.length; j++) {
        pokemonValidationNumbers.push(pokemonURLs[j].src.match(/\d+/));
    }

    console.log("pokemonURLs : " + pokemonURLs);
    console.log("pokemon validation no.s : " + pokemonValidationNumbers);

    var pokemonAnswer = cheatContainer[0].querySelector('img').src.match(/\d+/);

    console.log("Answer: " + pokemonAnswer)

    for(var i = 0; i<pokemonValidationNumbers.length; i++) {
        GM.xmlHttpRequest({
            method: "GET",
            url: pokemonURLs[i].src,
            headers: {
                "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
                "Accept": "text/xml"            // If not specified, browser defaults will be used.
            },
            onload: function(response) {
                var responseXML = null;
                // Inject responseXML into existing Object (only appropriate for XML content).
                if (!response.responseXML) {
                    responseXML = new DOMParser()
                        .parseFromString(response.responseText, "text/xml");
                }

                console.log([
                    response.finalUrl,
                    responseXML
                ].join("\n"));

                pokemonTest.push(response.finalUrl.match(/\d+/))

                console.log("pokemonTest : " + pokemonTest)

                console.log("response is: " + response.finalUrl.match(/\d+/));
                console.log("Does this match: " + (parseInt(pokemonTest[pokemonTestInc])) +" and " + (pokemonAnswer) +" and also right now increment = " + pokemonTestInc)

                if(parseInt(pokemonTest[pokemonTestInc]) == pokemonAnswer) {

                    console.log(pokemonValidationNumbers + pokemonTestInc)
                    console.log("Yes it does match, now i will epicly validate this number: " + (parseInt(pokemonValidationNumbers[pokemonTestInc])))

                    i = 3
                    chooseValidation(parseInt(pokemonValidationNumbers[pokemonTestInc]))
                    setTimeout(function() {
                        location.reload();
                    }, 500)

                } else { pokemonTestInc += 1 }
            }
        });
    }
} else {
    function performInteraction(id, sid, method) {


        if (method == "feed" && int_berry != "") {
            for (i = 0; i < berry_bag.length; i++) {
                if (berry_bag[i][0] == int_berry) {
                    berry_bag[i][1]--;
                }
            }
        }
        $("div#interact_tab").load("includes/ajax/pokemon/lite_interact.php", {
            'pkmnid': id,
            'pkmnsid': sid,
            'method': method,
            'berry': int_berry,
            'timeclick': new Date().getTime(),
            'inarow': cl_c
        }, function() {
            int_lock = false;
            $(this).show();
            if ($(this).html().indexOf("success") > -1)
                cl_c++;
            loadNextPkmn();
        });

    }

    setInterval(function(){for (var i = 0; i<pkmn_arr.length; i++) {
        if(pkmn_arr[i].length>15) {
            performInteraction(pkmn_arr[i][0], pkmn_arr[i][1], "train")
        } else {performInteraction(pkmn_arr[i][0], pkmn_arr[i][1], "warm")}
        console.log("interacted with " + pkmn_arr[i][10])
    }}, 300)

}


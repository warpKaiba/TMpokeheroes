// ==UserScript==
// @name         PH - Interaction Captcha Bypass
// @namespace    https://github.com/warpKaiba
// @version      1.3
// @description  Automatically bypasses human-checking
// @author       You
// @match        https://pokeheroes.com/pokemon_lite*
// @grant        GM.xmlHttpRequest
// @connect      pokeheroes.com
// @connect      staticpokeheroes.com
// @downloadURL  https://github.com/warpKaiba/TMpokeheroes/raw/master/PHcaptcha.user.js
// @icon         https://vignette.wikia.nocookie.net/pkmnshuffle/images/7/7f/Ducklett.png/revision/latest?cb=20170409032016
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
}
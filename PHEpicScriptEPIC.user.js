// ==UserScript==
// @name         PH - Epic Clicker
// @namespace    https://github.com/warpKaiba
// @version      2.0
// @description  Automatically runs on clicklist + speed option
// @author       You
// @match        https://pokeheroes.com/pokemon_lite*
// @grant        GM.xmlHttpRequest
// @connect      pokeheroes.com
// @connect      staticpokeheroes.com
// @downloadURL  https://github.com/warpKaiba/TMpokeheroes/raw/master/PHEpicScriptEPIC.user.js
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
} else {

    var oldPKMN = 0;

    if (getCookie("clickSpeed") == "") {
        var clickSpeed = 500;
    } else { clickSpeed = getCookie("clickSpeed"); console.log("click speed: " + clickSpeed) }

    function startClick() {
        window.clickInterval = setInterval(clickPoke, clickSpeed)
    }

    function stopClick() {
        clearInterval(window.clickInterval);
    }

    $("#textbar")[0].insertAdjacentHTML("afterbegin", "<input id=clickspeedinput type=number value="+clickSpeed+"> Click interval ms </input><button id=clickspeedsubmit>Submit</button><br>The lower the number, the faster it will go. 1 second = 1000 ms. The normal site limit is 200.")
    $("#clickspeedsubmit")[0].addEventListener("click", function(){
        clickSpeed = Math.abs($("#clickspeedinput")[0].value)
        console.log("clickSpeed="+clickSpeed)
        document.cookie = "clickSpeed="+clickSpeed

        stopClick()
        startClick()
    })

    function performInteraction(id, sid, method, poke) {


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
            oldPKMN = poke
            loadNextPkmn();
        });

    }

    //     setInterval(function(){for (var i = 0; i<pkmn_arr.length; i++) {
    //         if(pkmn_arr[i].length>15) {
    //             performInteraction(pkmn_arr[i][0], pkmn_arr[i][1], "train")
    //         } else {performInteraction(pkmn_arr[i][0], pkmn_arr[i][1], "warm")}
    //         console.log("interacted with " + pkmn_arr[i][10])
    //     }}, 300)



    function clickPoke() {
        if(pkmn_arr[0] != undefined) {
            if(pkmn_arr[0] != oldPKMN) {
                if(pkmn_arr[0].length>15) {
                    performInteraction(pkmn_arr[0][0], pkmn_arr[0][1], "train", pkmn_arr[0])
                    console.log("interacted with " + pkmn_arr[0][10])
                } else {
                    performInteraction(pkmn_arr[0][0], pkmn_arr[0][1], "warm", pkmn_arr[0])
                    console.log("interacted with egg")
                }
            }
        }
    }


    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    addGlobalStyle("#greenfield {height: 5em;}")
    startClick()

}


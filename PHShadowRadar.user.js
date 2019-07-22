// ==UserScript==
// @name         shadow radar beta
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        https://pokeheroes.com/shadowradar*
// @grant        none
// @downloadURL  https://github.com/warpKaiba/TMpokeheroes/raw/master/PHShadowRadar.user.js
// @icon         https://vignette.wikia.nocookie.net/pkmnshuffle/images/7/7f/Ducklett.png/revision/latest?cb=20170409032016
// ==/UserScript==

$("#shiny_radar_background")[0].insertAdjacentHTML("afterend", "<button id='autopilot'>Auto pilot</button>")
$("#autopilot")[0].addEventListener("click", generateKaiba)

var autoFind;
var shadowIncrement = 0

var chain_length = 0;
var chain_pkdxnr = 15;
var chain_spechar = "";

var current_x = 0;
var current_y = 0;

function generate0() {
    window.clearInterval(generate);
    current_x = 0
    current_y = 0
    fightShadow()
}

function generate9() {
    window.clearInterval(generate);
    current_x = 9
    current_y = 9
    fightShadow()
}

function generateKaiba() {
    shadowIncrement++
    if (shadowIncrement % 2 == 0) {
        generate0()
    } else {
        generate9()
    }
}

function updateRadar() {
    $("#current_chain").children().hide();
    if (chain_length <= 0) {
        $("#current_chain .offline_radar").show();
    } else {
        $("#current_chain .online_radar .chain_length").text(chain_length);
        $("#current_chain .online_radar .pkmn_normal").attr('src', '//staticpokeheroes.com/img/pokemon/bw_front/0' + chain_pkdxnr + chain_spechar + '.png');
        $("#current_chain .online_radar .pkmn_shadow").attr('src', '//staticpokeheroes.com/img/pokemon/bw_front/2' + chain_pkdxnr + chain_spechar + '.png');
        $("#current_chain .online_radar").show();
    }
}

var generate;

function generateWild() {
    $("#pokemon_shadow").empty();
    current_x = Math.floor(Math.random() * 10);
    current_y = Math.floor(Math.random() * 10);
    var l = current_x * 19;
    var t = current_y * 20;
    $("#pokemon_shadow")
        .append('<img src="//staticpokeheroes.com/img/shiny_radar/shadow_' + Math.ceil(Math.random() * 4) + '.gif" style="margin-top: ' + t + 'px; margin-left: ' + l + 'px" onclick="fightShadow();">');
}

fightShadow = function fightShadow() { //onClick event on shadow sprite
    window.clearInterval(generate);
    $("#pokemon_shadow").empty();
    $("#shiny_fight").load("/includes/ajax/shadowradar/fight.php", {
        'x': current_x,
        'y': current_y
    }, function (data) {
        $("#shiny_fight").fadeTo(50, 0.95);
        if (data.indexOf("Ball") >= 0) {
            window.clearInterval(autoFind)
        } else {generateKaiba()}
    });

}

function throwPokeball(e, pb) {
    $("#pokeball_choose").hide();

    e = $(e).find(".pb_amount");
    if (e.length == 0)
        return;
    var pbAmount = parseInt(e.text());
    if (pbAmount <= 0) {
        alert("No Poké Balls left!");
        return;
    }

    e.text((pbAmount - 1) + "");

    $("<div>").load("includes/ajax/shadowradar/throw_pokeball.php", {
        'pb': pb
    }, function () {
        $("#shiny_fight").append($(this).html());
    });
}

function pokeballAnimation(pbimg, spin, caught, fled) {
    spin--;
    $("#battle .pokeball").html(pbimg).show();
    $("#battle .pkmn_sprite").fadeOut(400, function () {
        $("#battle .pokeball").delay(600).animate({bottom: "20%"}, 400, "swing", function () {
            $(this).animate({bottom: "0"}, 1000, "easeOutBounce", function () {
                if (spin > 0) {
                    pokeballAnimation(pbimg, spin, caught, fled);
                } else {
                    if (caught || fled) {
                        $("#shiny_fight").children().hide();
                        if (caught) {
                            $("#shiny_fight .caught_window").show();
                        } else {
                            $("#shiny_fight .fled_window").show();
                        }
                    } else {
                        $("#battle .pokeball").hide();
                        $("#battle .pkmn_sprite").fadeIn(400, function () {
                            $("#pokeball_choose").show();
                        });
                    }
                }
            });
        });
    });
}

var isFleeBlocked = false;

flee = function flee() {
    if (isFleeBlocked)
        return;

    isFleeBlocked = true;
    $("#shiny_fight").fadeOut(50, function () {
        $(this).html("");
        //generate = window.setInterval(generateWild, 3000);
        isFleeBlocked = false;
    });
}

updateRadar();

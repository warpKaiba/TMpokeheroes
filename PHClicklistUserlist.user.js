// ==UserScript==
// @name         PH - Clicklist-Userlist
// @namespace    https://github.com/warpKaiba
// @version      1.0
// @description  Easy access list of friends to click on
// @author       kaiba
// @match        https://pokeheroes.com/clicklist
// @grant        none
// @downloadURL  https://github.com/warpKaiba/TMpokeheroes/raw/master/PHClicklistUserlist.user.js
// @icon         https://vignette.wikia.nocookie.net/pkmnshuffle/images/7/7f/Ducklett.png/revision/latest?cb=20170409032016
// ==/UserScript==

(function() {

    var toAdd;

    $("#textbar").append("<br><br><b>Add user(s): </b><input type='text' id='kaibauser'></input> <button id='kaibauserbutton'>Submit</button>")
    $("#kaibauserbutton")[0].addEventListener("click", function(){
        toAdd = $("#kaibauser")[0].value;
        addUsers();
    })

    function addUsers() {
        localStorage.clicklistUsers += "," + toAdd
        //console.log(toAdd)
        var locStoreCheck = localStorage.clicklistUsers.split(",");
        for (var i = 0; i < locStoreCheck.length; i++) {
            for (var j = 0; j < locStoreCheck.length; j++) {
                if (i != j && locStoreCheck[i] == locStoreCheck[j]) {
                    locStoreCheck[j] = false
                }
            }
        }
        for (i = 0; i < locStoreCheck.length; i++) {
            if (locStoreCheck[i] == false) {
                locStoreCheck.splice(i, 1);
                i--;
            }
        }
        localStorage.clicklistUsers = locStoreCheck
        location.reload()
    }

    function getUsers() {
        var toSet = localStorage.clicklistUsers.split(",");
        //toSet.shift();
        var userlistHTML = "<tbody>";
        for (var i = 0; i<toSet.length; i++) {
            if (i % 3 == 0) { userlistHTML += "<tr>"; }
            userlistHTML += "<th><a href='https://pokeheroes.com/pokemon_lite?cl_type=mass_" + toSet[i] + "'><button style='margin: 1px; width: 13em;'>" + toSet[i] + "</button></a> </th>";
            if (i % 3 == 2) { userlistHTML += "</tr>"; }
            if (i == toSet.length-1 && i != 2) { userlistHTML += "</tr>"; }
        }
        userlistHTML += "</tbody>";
        //console.log(userlistHTML);
        $("#textbar").append(userlistHTML);
        $("#textbar").append("<br><button id='kaibaRemove'>Remove All</button>  <button id='kaibaExport'>Export list</button>");
        $("#textbar").append("<p>You can add multiple users by seperating them with commas. (No spaces!!)</p>");

        $("#kaibaRemove")[0].addEventListener("click", function() {
            localStorage.clicklistUsers = "";
            location.reload()
        });

        $("#kaibaExport")[0].addEventListener("click", function() {
            $("#textbar").append("<div style='overflow-wrap: break-word;'>" + localStorage.clicklistUsers + "</div>");
        });
    }

    getUsers();

})();
# TMpokeheroes
## A collection of user-scripts for ease of use, cheating, and profit for Pokeheroes.

Pokeheroes is a Pokemon fan-game website where users can perform various activities such as breeding, catching, raising, and collecting Pokemon by interacting with the website. Known as a "Poke-Clicker", Pokeheroes is one of a handful of Pokemon fan-game with a similar play style.
The scripts in this repository can aid in making certain features of Pokeheroes easier. The scripts execute code in the user's browser to accomplish this.
 
DISCLAIMER: Use these at your own risk. I hold no responsiblity if you decide to use these and get banned.

## How to install

1.) You will need either the Tampermonkey, Greasemonkey, Violentmonkey or Scriptify browser extension, depending on your browser. I've only tested these with [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) on Chrome. Tampermonkey is also available for [Firefox.](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

2.) Click on the script you want in the list above, then click Raw. It should bring up a new tab asking if you would like to install it. ![image](https://i.imgur.com/v1ZHsIo.png)

3.) Scripts will automatically update per your extension settings.

# Script Info

## PHAutoSlots.user.js
Affects the golden slot machines.

Removes the delayed alert-box popup when you win a prize. Instead, the message appears above the slot machine immediately.
![autoslots](https://i.imgur.com/sOutpiD.png)

## PHConcentrationCheater.user.js
Affects the concentration card flip game in the game center.

This script will make cards stay face up after you get an incorrect match.

## PHEpicScriptEPIC.user.js
Affects all clicklists.

This script will automatically "click" through a clicklist for as long as you have the tab open.
It is not recommended to keep the tab open for an extended period of time. This thing racks up interactions extremely quickly, even faster than an autoclicker.

## PH_partyselectall.user.js
Affects the storage box page.

This script adds a "Select All" button to the party, or the box currently selected.

![image](https://i.imgur.com/EeE2Ryr.png)

## PHberries.user.js
Affects the berry garden and toolshed.

This script allows you to plant every vacant spot of land in the current garden with the currently selected seed, and water every plant simutaneously as well. There is also an easy-seed-select button that you can easily configure yourself by editting the script. Just change -
```javascript
var berryType = "Pecha";
```
to equal whatever berry-seed you want. It will only select level 1 seeds.

The script in action:

![gif](https://i.imgur.com/2TaRFk8.gif)


## PHcoinflipper.user.js
Affects the coin flip game in the game center.

This script adds several buttons for flipping the coin 10, 100, and 1000 times, as well as an infinite flip button. There is also a stop button to make the flipping stop for any of these options.

## PHhangman.user.js
Affects the hangman game in the game center.

This script will display a list of possible solutions to the hangman. The word bank is not complete, but can solve most of them.

![hangman](https://i.imgur.com/3hO4bYM.png)

## Support

Feel free to ask for new features, submit bug reports, and ask questions in the issues tab. I recommend not having a username that can be traced back to a Pokeheroes account.

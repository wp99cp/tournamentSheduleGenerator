// Eingabewerte (hier lokal festgelegt, später aus den Eingabefeldern ausgelesen)
var sports = ['A', 'B', 'C', 'D', 'E'], //document.getElementById('sports').value,
    groups = 7, //document.getElementById('groups').value,
    rounds = 6; //document.getElementById('rounds').value;


calculate();

function listArray(elem, index) {
    sports.push(elem);
}


// Formular wurde ausgefüllt
function submit() {

    sports = [];

    groups = document.getElementById("groups").value;
    rounds = document.getElementById("games").value;

    var simplestring = document.getElementById("sports").value;

    var sportart = simplestring.split(',');
    sportart.forEach(listArray);

    calculate();
}

// Berechnung der Partien
function calculate() {

    console.log("Die Berechnung wird durchgeführt:\n" +
        "\nSportarten: " + sports +
        "\n# Gruppen:  " + groups +
        "\n# Spiele:   " + rounds + "\n\n");

    // Berechnet mögliche Begegnungen (als Reserve vier mal zu viele...)
    var encounters = getEncounters(groups, rounds * groups * 5);

    // Berechnet zusätzlich alle Sportarten ein...
    var encountersAndSports = getEncountersAndSports(encounters, sports);

    // Auserwählte Begegnungen für den Spielplan
    var partien = [];



    var gamesInRound;

    var arry = [];

    var alreadyPlayed = [];
    for (var jy = 0; jy < groups; jy++) {
        alreadyPlayed.push(goclone(arry));
    }

    var alreadyPlayedAgainst = [];
    for (var jyz = 0; jyz < groups; jyz++) {
        alreadyPlayedAgainst.push(goclone(arry));
    }

    // Loop für die Runden
    for (var i = 1; i <= rounds; i++) {

        gamesInRound = 0;
        var start = 0;

        while (groups / 2 - gamesInRound > 1) {


            var partienInRunde = [];
            var sportsInRunde = [];

            gamesInRound = 0;

            // Reset Variables
            var groupsGameCounter = [];
            for (var j = 1; j <= groups; j++) {
                groupsGameCounter.push(0);
            }

            var groupsSportsCounter = [];
            for (j = 1; j <= sports; j++) {
                groupsSportsCounter.push(groupsGameCounter);
            }


            // Search encountersAndSports
            for (var choseGame = start; gamesInRound < groups / 2 && choseGame < encountersAndSports.length; choseGame++) {

                // Gruppen können nur bei einer Partie mitspielen
                if (groupsGameCounter[encountersAndSports[choseGame][0] - 1] == 0 &&
                    groupsGameCounter[encountersAndSports[choseGame][1] - 1] == 0)

                    // Sportarten können nur von einer Partie besetzt werden
                    if (!sportsInRunde.includes(encountersAndSports[choseGame][2]))
                        //  Teams sollen nicht zweimal die selbe Sportart spielen müssen
                        if (
                            (!alreadyPlayed[encountersAndSports[choseGame][0] - 1].includes(encountersAndSports[choseGame][2]) &&
                                !alreadyPlayed[encountersAndSports[choseGame][1] - 1].includes(encountersAndSports[choseGame][2])
                            ) || encountersAndSports.length / choseGame < 2.75
                        ) {
                            /*  if (encountersAndSports.length / choseGame < 8)
                                  console.log('cheat: Sportart'); */
                            // Team sollen möglichst nicht zweimal gegen den selben Gegner spielen
                            if (!alreadyPlayedAgainst[encountersAndSports[choseGame][1] - 1].includes(encountersAndSports[choseGame][0]) ||
                                encountersAndSports.length / choseGame < 2) {

                                if (start > choseGame || start == 0) {
                                    start = choseGame;
                                }

                                /* if (encountersAndSports.length / choseGame < 4)
                                    console.log('cheat: Gegner'); */

                                groupsGameCounter[encountersAndSports[choseGame][1] - 1] = 1;
                                groupsGameCounter[encountersAndSports[choseGame][0] - 1] = 1;

                                alreadyPlayed[encountersAndSports[choseGame][0] - 1].push(encountersAndSports[choseGame][2]);
                                alreadyPlayed[encountersAndSports[choseGame][1] - 1].push(encountersAndSports[choseGame][2]);

                                alreadyPlayedAgainst[encountersAndSports[choseGame][0] - 1].push(encountersAndSports[choseGame][1]);
                                alreadyPlayedAgainst[encountersAndSports[choseGame][1] - 1].push(encountersAndSports[choseGame][0]);

                                sportsInRunde.push(encountersAndSports[choseGame][2]);
                                partienInRunde.push(encountersAndSports[choseGame]);

                                encountersAndSports = removeElement(encountersAndSports, choseGame);
                                gamesInRound++;
                                choseGame = 0;
                            }
                        }
            }

        }

        partien.push(partienInRunde);

    }

    for (var u in partien) {
        print(partien[u]);
    }
}



function print(array) {

    var output = 'Partien der Spielrunde:\n';
    for (var i in array) {
        output += array[i][0] + ' : ' + array[i][1] + ' (' + array[i][2] + ')\n';
    }

    console.log(output);

}

function removeElement(encounters, choseGame) {
    encounters.splice(choseGame, 1);
    return encounters;
}

// Fügt die Sportarten hinzu
function getEncountersAndSports(encounters, sports) {

    // Variable für den Return
    var encountersAndSports = [];

    // Loop durch alle Partiene
    // erstellt eine Kopie jeder Partie für jede Sportart
    for (var s in sports) {
        for (var i in encounters) {
            var encounter = goclone(encounters[i]);
            encounter.push(sports[s]);
            encountersAndSports.push(goclone(encounter));
        }
    }

    return encountersAndSports;

}


function getEncounters(groups, games) {

    var encounters = [];

    var counter = 0;
    for (var j = 1; j < groups; j++) {
        for (var i = 1; i + j <= groups; i++) {
            encounters[counter] = [i, i + j];
            counter++;
        }
    }
    var maxNewGames = binomialCoefficient(groups, 2);

    var returnedEncounters = [];

    // Return gewünschte Anzahl Partien
    counter = 0;
    while (returnedEncounters.length < games) {
        returnedEncounters.push(encounters[counter]);
        if (counter + 1 == encounters.length) {
            counter = 0;
        } else {
            counter++;
        }
    }
    return returnedEncounters;
}

function goclone(source) {
    if (Object.prototype.toString.call(source) === '[object Array]') {
        var clone = [];
        for (var i = 0; i < source.length; i++) {
            clone[i] = goclone(source[i]);
        }
        return clone;
    } else if (typeof(source) == "object") {
        var clone = {};
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                clone[prop] = goclone(source[prop]);
            }
        }
        return clone;
    } else {
        return source;
    }
}

// Returns the binomial coefficient
// where a is the total set of posibbilites
// and b is the number of combinatios we're interested in
function binomialCoefficient(a, b) {
    var numerator = fact(a);
    var denominator = fact(a - b) * fact(b);
    return numerator / denominator;
}

// Factorial function.
function fact(x) {
    if (x == 0) return 1;
    return x * fact(x - 1);
}

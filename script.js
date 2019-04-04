let playersObj = [];
const btnLineups = document.getElementById('btnLineups');
const jsDisplayPlayer = document.getElementById('js__displayPlayer');
const jsDisplayInning = document.getElementById('js__displayInning');

btnLineups.addEventListener('click', function() {
   
    let jsNumOfInnings = Number(document.getElementById('js__numOfInnings').value);
    let playersArr = [];
    let players = document.querySelectorAll('.js__player');
    
    // convert node list of players to array list of players and remove empty spaces
    players.forEach(cur => {
        if(cur.value.trim() !== '') {playersArr.push(cur.value)} 
    });
    
    // create an array of player objects including names and array of positions
    for(let i = 0; i < playersArr.length; i++) {
        playersObj[i] = {
            name: playersArr[i],
            positions: []
        }
    }
    
    // all the magic happens
    let lineups = randomizeLineups(playersArr);
    console.log(`lineups is ${lineups}`);
    assignPositions(playersObj, jsNumOfInnings);
    clearDisplay();
    displayLineups(lineups, playersObj, jsNumOfInnings);

});

function randomizeLineups(arr) {
    
    // randomize lineups
    let r;
    let newArr = [];
    for(let i = 0; i < arr.length + i; i++) {
        r = Math.floor(Math.random() * arr.length);
        newArr.push(arr[r]);
        arr.splice(r, 1);
    }
    return newArr;
}

function assignPositions(playersArray, numOfInnings) {
    
    let index = 0;
    for(let i = 0; i < numOfInnings; i++) {
        
        // list all positions in an array and remove additional positions to match amount of players on team
        let positions = ['Pitcher', '1st Base', '2nd Base', '3rd Base', 'Shortstop', 'Left Field', 'Right Field', 'Center Field', 'Right Center Field', 'Left Center Field', 'Bench/Optional', 'Bench/Optional', 'Bench/Optional', 'Bench/Optional', 'Bench/Optional'];
        positions.splice(playersArray.length);
        
        // loop through randomPositions and add positions to each player in playersObj array
        for(let i = 0; i < positions.length; i++) {
            if(i + index > positions.length - 1) {
                playersObj[i].positions.push(positions[(i + index) % positions.length]);
            } else {
                playersObj[i].positions.push(positions[i + index]);
            }
        }
        index += 3;
    }
    console.log(playersObj);
}

function clearDisplay() {
    
    // clear modal box before displaying lineups
    $("#clearTable").find("tr:gt(0)").remove();
    jsDisplayInning.innerHTML = '<th>#</th><th>Name</th>';
}

function displayLineups(lineupsArr, objPlayers, numInnings) {
    
    // display team name
    let teamName = document.getElementById('js__teamName').value;
    let displayTeam = document.getElementById('js__displayTeam');
    displayTeam.innerHTML = teamName + ' Team Lineups';
    
    // display inning numbers
    jsNumOfInnings = document.getElementById('js__numOfInnings').value;
    for(let i = 1; i <= jsNumOfInnings; i++) {
        jsDisplayInning.insertAdjacentHTML('beforeend', 
                '<th>Inning ' + i + '</th>'); 
    }
    
    // need to organize objPlayers in same order as lineupsArr
    let newObjPlayers = [];
    for(let i = 0; i < lineupsArr.length; i++) {
        for(let j = 0; j < objPlayers.length; j++) {
            if(lineupsArr[i] === objPlayers[j].name) {
                newObjPlayers.push(objPlayers[j]);
            }
        }
    }
    
    let row; 
    for(let i = 0; i < newObjPlayers.length; i++) {
        row = jsDisplayPlayer.insertRow(i);
        row.insertCell(0).innerHTML = (i + 1);
        row.insertCell(1).innerHTML = newObjPlayers[i].name;
        for(let j = 0; j < newObjPlayers[i].positions.length; j++) {
            row.insertCell(j + 2).innerHTML = newObjPlayers[i].positions[j];
        }
    }
    
    /*
    let row;
    for(let i = 0; i < lineupsArr.length; i++) {
        for(let j = 0; j < objPlayers.length; j++) {
            if(lineupsArr[i] === objPlayers[j].name) {
                row = jsDisplayPlayer.insertRow(j);
                row.insertCell(0).innerHTML = (j + 1);
                row.insertCell(1).innerHTML = objPlayers[j].name;
                for(let k = 0; k < numInnings; k++) {
                    row.insertCell(k + 2).innerHTML = objPlayers[j].positions[k];
                }
            }
        }
    }
    




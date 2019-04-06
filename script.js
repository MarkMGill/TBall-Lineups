let playersObj = [];
const btnLineups = document.getElementById('btnLineups');
const jsDisplayPlayer = document.getElementById('js__displayPlayer');
const jsDisplayInning = document.getElementById('js__displayInning');

btnLineups.addEventListener('click', function() {
   
    let jsNumOfInnings = Number(document.getElementById('js__numOfInnings').value);
    let players = document.querySelectorAll('.js__player');
    
    // convert node list of players to array list of players and remove empty spaces
    players.forEach(cur => {
        if(cur.value.trim() !== '') {playersObj.push(
        {
                name: cur.value,
                positions: []
            }
        )} 
    });
    
    console.log(playersObj);
    // all the magic happens
    let lineups = randomizeLineups(playersObj);
    assignPositions(lineups, jsNumOfInnings);
    clearDisplay();
    //console.log(lineups);
    displayLineups(lineups, jsNumOfInnings);
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
        console.log(playersArray);
        console.log(positions);
        // loop through randomPositions and add positions to each player in players array
        for(let i = 0; i < positions.length; i++) {
            if(i + index > positions.length - 1) {
                playersArray[i].positions.push(positions[(i + index) % positions.length]);
            } else {
                playersArray[i].positions.push(positions[i + index]);
            }
        }
        index += (playersArray.length % 3 === 0) ? 4 : 3;
    }
}

function clearDisplay() {
    
    // clear modal box before displaying lineups
    $("#clearTable").find("tr:gt(0)").remove();
    jsDisplayInning.innerHTML = '<th>#</th><th>Name</th>';
}

function displayLineups(lineupsArr, numInnings) {
    
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

    let row; 
    for(let i = 0; i < lineupsArr.length; i++) {
        row = jsDisplayPlayer.insertRow(i);
        row.insertCell(0).innerHTML = (i + 1);
        row.insertCell(1).innerHTML = lineupsArr[i].name;
        for(let j = 0; j < lineupsArr[i].positions.length; j++) {
            row.insertCell(j + 2).innerHTML = lineupsArr[i].positions[j];
        }
    }
}







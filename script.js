let playersObj = [];
const btnLineups = document.getElementById('btnLineups');
const jsDisplayPlayer = document.getElementById('js__displayPlayer');
const jsDisplayInning = document.getElementById('js__displayInning');

btnLineups.addEventListener('click', function() {
   
    let jsNumOfInnings = Number(document.getElementById('js__numOfInnings').value);
    let playersArr = [];
    let players = document.querySelectorAll('.js__player');
    players.forEach(cur => {
        if(cur.value.trim() !== '') {playersArr.push(cur.value)} 
    });
    for(let i = 0; i < playersArr.length; i++) {
        playersObj[i] = {
            name: playersArr[i],
            positions: []
            //lastTwo: []
        }
    }
    let lineups = randomizeLineups(playersArr);
    assignPositions(playersObj, jsNumOfInnings);
    clearDisplay();
    displayLineups(lineups);
    console.log(playersObj);
});

function randomizeLineups(arr) {
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
        console.log('index is ' + index);
        // loop through randomPositions and add positions to each player in playersObj array
        for(let i = 0; i < positions.length; i++) {
            if(i + index > positions.length - 1) {
                playersObj[i].positions.push(positions[(i + index) % positions.length]);
                console.log(i + index % positions.length);
            } else {
                playersObj[i].positions.push(positions[i + index]);
                console.log(i + index);
            }
        }
        index += 3;
    }
    console.log(playersObj);
}

function clearDisplay() {
    jsDisplayPlayer.innerHTML = '';
    jsDisplayInning.innerHTML = '<th>#</th><th>Name</th>';
}

function displayLineups(arr) {
    
    jsNumOfInnings = document.getElementById('js__numOfInnings').value;
    for(let i = 1; i <= jsNumOfInnings; i++) {
        jsDisplayInning.insertAdjacentHTML('beforeend', 
                '<th>Inning ' + i + '</th>'); 
    }
    let flag = true;
    for(let i = 0; i < arr.length; i++) {
        let bgLightContent = '<tr><th scope="row">' + [i + 1] + '</th><td>' + arr[i] + '</td><td>jdoe@yeah</td></tr>';
        let bgWhiteContent = '<tr class="bg-white"><th scope="row">' + [i + 1] + '</th><td>' + arr[i] + '</td><td>jdoe@yeah</td></tr>';
        if(flag === true) {
            jsDisplayPlayer.insertAdjacentHTML('beforebegin', bgLightContent
                );
        } else if(flag === false) {
            jsDisplayPlayer.insertAdjacentHTML('beforebegin', bgWhiteContent 
                );
        }
        (flag === true) ? flag = false : flag = true;
    }
}











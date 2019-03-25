let positions = ['Pitcher', '1st Base', '2nd Base', '3rd Base', 'Shortstop', 'Left Field', 'Right Field', 'Center Field', 'Right Center Field', 'Left Center Field'];
const btnLineups = document.getElementById('btnLineups');

btnLineups.addEventListener('click', function() {
    
    let playersArr = [];
    let players = document.querySelectorAll('.js__player');
    players.forEach(cur => {
        if(cur.value.trim() !== '') {playersArr.push(cur.value)} 
    });
    let lineups = randomizeLineups(playersArr);
    displayLineups(lineups);
    console.log(lineups);
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

function displayLineups(arr) {
    const jsDisplayPlayer = document.getElementById('js__displayPlayer');
    let flag = true;
    arr.forEach(cur => {
        if(flag === true) {
            jsDisplayPlayer.insertAdjacentHTML('beforebegin', 
                '<tr><th scope="row">1</th><td>' + cur + '</td><td>jdoe@yeah</td></tr>');
        } else if(flag === false) {
            jsDisplayPlayer.insertAdjacentHTML('beforebegin', 
                '<tr class="bg-white"><th scope="row">1</th><td>' + cur + '</td><td>jdoe@yeah</td></tr>');
        }
        (flag === true) ? flag = false : flag = true;
    });
}







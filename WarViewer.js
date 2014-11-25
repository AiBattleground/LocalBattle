function setPlayerCount(grid) {
    var redCount = 0;
    var blueCount = 0;
    for (var i = 0; i < grid.length; i++) {
        var myChar = grid[i];
        if (myChar == '1') {
            redCount++;
        }
        else if (myChar == '2') {
            blueCount++;
        }
    }
    document.getElementById('blue-count').innerHTML = blueCount;
    document.getElementById('red-count').innerHTML = redCount;
}

function setWinner(state) {
    if (state.winner != null) {
        var blueInfo = document.getElementById('blue-wrap');
        var redInfo = document.getElementById('red-wrap');
        if (state.winner == 'p1') {
            document.getElementById('red-game-end-message').innerHTML = "Winner!";
            document.getElementById('blue-game-end-message').innerHTML = "Loser!";
			redInfo.className = 'alert-success';
            blueInfo.className = 'alert-warning';
        }
        else if (state.winner == 'p2') {
			document.getElementById('blue-game-end-message').innerHTML = "Winner!";
            document.getElementById('red-game-end-message').innerHTML = "Loser!";
			blueInfo.className = 'alert-success';
            redInfo.className = 'alert-warning';
        }
    }
}

function showTurn(state) {
    setPlayerCount(state.grid);
	document.getElementById('red-energy').innerHTML = state.p1.energy;
	document.getElementById('blue-energy').innerHTML = state.p2.energy;
    setWinner(state);
    document.getElementById('turn-number').innerHTML = state.turnsElapsed + " / " + state.maxTurns;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.strokeStyle = 'lightgrey';
    var coordWidth = c.width / state.cols;
    for (var i = 1; i < state.cols; i++) {
        var x = i * coordWidth;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, c.height);
        ctx.stroke();
    }

    var coordHeight = c.height / state.rows;
    for (var i = 1; i < state.rows; i++) {
        var y = i * coordHeight;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(c.width, y);
        ctx.stroke();
    }
    if (!state.p1.spawnDisabled) {
        var p1Spawn = indexToCoord(state, state.p1.spawn);
        ctx.fillStyle = 'rgba(242, 97, 64, 0.5)';
        ctx.beginPath();
        ctx.rect(p1Spawn.x * coordWidth, p1Spawn.y * coordHeight, coordWidth, coordHeight);
        ctx.fill();
    }
    if (!state.p2.spawnDisabled) {
        var p2Spawn = indexToCoord(state, state.p2.spawn);
        ctx.beginPath();
        ctx.fillStyle = 'rgba(110, 161, 215, 0.5)';
        ctx.rect(p2Spawn.x * coordWidth, p2Spawn.y * coordHeight, coordWidth, coordHeight);
        ctx.fill();
    }

    var p1Headcount = 0;
    var p2Headcount = 0;
    for (var i = 0; i < state.grid.length; i++) {
        var gridId = state.grid[i];
        if (gridId !== '.') {
            var coord = indexToCoord(state, i);
            var x = coord.x * coordWidth + coordWidth / 2;
            var y = coord.y * coordHeight + coordHeight / 2;

            switch (gridId) {
                case '1':
                    p1Headcount++;
                    ctx.fillStyle = '#F26140';
                    ctx.beginPath();
                    ctx.arc(x, y, coordWidth / 2 - 2, 0, 2 * Math.PI);
                    ctx.fill();
                    break;
                case '2':
                    p2Headcount++;
                    ctx.fillStyle = '#6EA1D7';
                    ctx.beginPath();
                    ctx.arc(x, y, coordWidth / 2 - 2, 0, 2 * Math.PI);
                    ctx.fill();
                    break;
                case '*':
                    ctx.drawImage(energyImage, 679, 51, 94, 94, x - coordWidth / 2, y - coordHeight / 2, coordWidth, coordHeight);
                    break;
                case 'x':
                    ctx.fillStyle = '#F26140';
                    ctx.beginPath();
                    ctx.arc(x, y, coordWidth / 2 - 2, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.strokeStyle = 'black';
                    ctx.beginPath();
                    ctx.moveTo(x - coordWidth / 4, y - coordWidth / 4);
                    ctx.lineTo(x + coordWidth / 4, y + coordWidth / 4);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(x - coordWidth / 4, y + coordWidth / 4);
                    ctx.lineTo(x + coordWidth / 4, y - coordWidth / 4);
                    ctx.stroke();
                    break;
                case 'X':
                    ctx.fillStyle = '#6EA1D7';
                    ctx.beginPath();
                    ctx.arc(x, y, coordWidth / 2 - 2, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.strokeStyle = 'black';
                    ctx.beginPath();
                    ctx.moveTo(x - coordWidth / 4, y - coordWidth / 4);
                    ctx.lineTo(x + coordWidth / 4, y + coordWidth / 4);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(x - coordWidth / 4, y + coordWidth / 4);
                    ctx.lineTo(x + coordWidth / 4, y - coordWidth / 4);
                    ctx.stroke();
                    break;
                default:
                    console.log(gridId);
            }
        }
    }
}

function indexToCoord(state, index) {
    var x = index % state.cols;
    var y = Math.floor(index / state.cols);
    return { x: x, y: y };
}

var ctx;
var energyImage;
c = document.getElementById('game');
ctx = c.getContext('2d');
energyImage = document.getElementById("energy-image");




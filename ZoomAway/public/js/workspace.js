var workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    trashcan: true
});

function checkRight(player) {
    let wallArray = document.getElementsByClassName('wall');

    let playerTop = parseInt(player.style.top, 10);
    let playerLeft = parseInt(player.style.left, 10);

    for (let i = 0; i < wallArray.length; i++) {
        let wallTop = parseInt(wallArray[i].style.top);
        if (playerTop == wallTop) {
            let wallLeft = parseInt(wallArray[i].style.left);
            wallLeft -= 64;
            if (playerLeft == wallLeft) {
                return true;
            }
        }
    }
    return false;
}

function checkLeft(player) {
    let wallArray = document.getElementsByClassName('wall');

    let playerTop = parseInt(player.style.top, 10);
    let playerLeft = parseInt(player.style.left, 10);

    for (let i = 0; i < wallArray.length; i++) {
        let wallTop = parseInt(wallArray[i].style.top);
        if (playerTop == wallTop) {
            let wallLeft = parseInt(wallArray[i].style.left);
            wallLeft += 64;
            if (playerLeft == wallLeft) {
                return true;
            }
        }
    }
    return false;
}

function checkTop(player) {
    let wallArray = document.getElementsByClassName('wall');

    let playerTop = parseInt(player.style.top, 10);
    let playerLeft = parseInt(player.style.left, 10);

    for (let i = 0; i < wallArray.length; i++) {
        let wallLeft = parseInt(wallArray[i].style.left);
        if (playerLeft == wallLeft) {
            let wallTop = parseInt(wallArray[i].style.top);
            wallTop += 64;
            if (playerTop == wallTop) {
                return true;
            }
        }
    }
    return false;
}

function move_up() {
    let player = document.getElementById('player');
    if (checkTop(player)) {
        console.log('OOF!');
    } else {
        let top = parseInt(player.style.top, 10);
        top -= 64;
        if (top < 0) {
            console.log('Out of bounds!');
        } else {
            player.style.top = top + 'px';
        }
    }
}

function move_right() {
    let player = document.getElementById('player');
    if (checkRight(player)) {
        console.log('OOF!');
    } else {
        let left = parseInt(player.style.left, 10);
        left += 64;
        if (left < 0) {
            console.log('Out of bounds!');
        } else {
            player.style.left = left + 'px';
        }
    }
}

function move_left() {
    let player = document.getElementById('player');
    if (checkLeft(player)) {
        console.log('OOF!');
    } else {
        let left = parseInt(player.style.left, 10);
        left -= 64;
        if (left < 0) {
            console.log('Out of bounds!');
        } else {
            player.style.left = left + 'px';
        }
    }
}

function clearWorkspace() {
    workspace.clear();
    console.log("Workspace cleared");
    document.getElementById('runCode').removeAttribute('disabled');
    resetMaze();
}

function runCode() {
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        if (code != '') {
            document.getElementById('runCode').disabled = true;
            runCodeDelay(code);
        }
    } catch (e) {
        alert(e);
    }
}

function checkGoal() {
    let player = document.getElementById('player');
    let goal = document.getElementById('goal');
    
    let playerTop = parseInt(player.style.top, 10);
    let playerLeft = parseInt(player.style.left, 10);

    let goalTop = parseInt(goal.style.top, 10);
    let goalLeft = parseInt(goal.style.left, 10);

    if (playerLeft == goalLeft) {
        if (playerTop == goalTop) {
            return true;
        }
    }
    return false;
}

/**
 * Remove all attributes of the maze and call init function again.
 */
function resetMaze() {
    document.getElementById('runCode').removeAttribute('disabled');
    let player = document.getElementById('player');
    let floor = document.getElementsByClassName('floor');
    let wall = document.getElementsByClassName('wall');
    let goal = document.getElementById('goal');
    player.parentNode.removeChild(player);
    while (floor.length > 0) {
        floor[0].parentNode.removeChild(floor[0]);
    }
    while (wall.length > 0) {
        wall[0].parentNode.removeChild(wall[0]);
    }
    goal.parentNode.removeChild(goal);
    init();
}

/**
 * Takes in workspace block code as an array and runs them sequentially.
 * 
 * @param {Array} code 
 */
function runCodeDelay(code) {
    let myArray = code.split('\n');
    myArray.pop();
    for (let i = 0; i < myArray.length; i++) {
        if (i == 0) {
            eval(myArray[i]);
        } else {
            setTimeout(() => {
                eval(myArray[i]);
            }, 1000 + i * 1000);
        };
    }
    setTimeout(() => {
        if (checkGoal()) {
            playStageClear();
            alert('Congratulations! You have successfully completed this stage.');
        } else {
            alert('Please reset the workspace and try again.');
        }
    }, 1000 + myArray.length * 1000);
}

function playStageClear() {
    let audio = new Audio('../audio/stage_clear.mp3');
    audio.play();
}
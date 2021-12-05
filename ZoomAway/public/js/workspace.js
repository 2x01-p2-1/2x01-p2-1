var workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    trashcan: true
});

function checkRight(car) {
    let wallArray = document.getElementsByClassName('wall');

    let carTop = parseInt(car.style.top, 10);
    let carLeft = parseInt(car.style.left, 10);

    for (let i = 0; i < wallArray.length; i++) {
        let wallTop = parseInt(wallArray[i].style.top);
        if (carTop == wallTop) {
            let wallLeft = parseInt(wallArray[i].style.left);
            wallLeft -= 64;
            if (carLeft == wallLeft) {
                return true;
            }
        }
    }
    return false;
}

function checkLeft(car) {
    let wallArray = document.getElementsByClassName('wall');

    let carTop = parseInt(car.style.top, 10);
    let carLeft = parseInt(car.style.left, 10);

    for (let i = 0; i < wallArray.length; i++) {
        let wallTop = parseInt(wallArray[i].style.top);
        if (carTop == wallTop) {
            let wallLeft = parseInt(wallArray[i].style.left);
            wallLeft += 64;
            if (carLeft == wallLeft) {
                return true;
            }
        }
    }
    return false;
}

function checkTop(car) {
    let wallArray = document.getElementsByClassName('wall');

    let carTop = parseInt(car.style.top, 10);
    let carLeft = parseInt(car.style.left, 10);

    for (let i = 0; i < wallArray.length; i++) {
        let wallLeft = parseInt(wallArray[i].style.left);
        if (carLeft == wallLeft) {
            let wallTop = parseInt(wallArray[i].style.top);
            wallTop += 64;
            if (carTop == wallTop) {
                return true;
            }
        }
    }
    return false;
}

function move_up() {
    let car = document.getElementById('car');
    if (checkTop(car)) {
        console.log('OOF!');
    } else {
        let top = parseInt(car.style.top, 10);
        top -= 64;
        if (top < 0) {
            console.log('Out of bounds!');
        } else {
            car.style.top = top + 'px';
        }
    }
}

function move_right() {
    let car = document.getElementById('car');
    if (checkRight(car)) {
        console.log('OOF!');
    } else {
        let left = parseInt(car.style.left, 10);
        left += 64;
        if (left < 0) {
            console.log('Out of bounds!');
        } else {
            car.style.left = left + 'px';
        }
    }
}

function move_left() {
    let car = document.getElementById('car');
    if (checkLeft(car)) {
        console.log('OOF!');
    } else {
        let left = parseInt(car.style.left, 10);
        left -= 64;
        if (left < 0) {
            console.log('Out of bounds!');
        } else {
            car.style.left = left + 'px';
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
    console.log(code)
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        if (code != '') {
            document.getElementById('runCode').disabled = true;
            document.getElementById('clearBtn').disabled = true;
            document.getElementById('resetBtn').disabled = true;
            runCodeDelay(code);
        }
    } catch (e) {
        alert(e);
    }
}

function checkGoal() {
    let car = document.getElementById('car');
    let goal = document.getElementById('goal');

    let carTop = parseInt(car.style.top, 10);
    let carLeft = parseInt(car.style.left, 10);

    let goalTop = parseInt(goal.style.top, 10);
    let goalLeft = parseInt(goal.style.left, 10);

    if (carLeft == goalLeft) {
        if (carTop == goalTop) {
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
    let car = document.getElementById('car');
    let floor = document.getElementsByClassName('floor');
    let wall = document.getElementsByClassName('wall');
    let goal = document.getElementById('goal');
    car.parentNode.removeChild(car);
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
    console.log(myArray);
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
            Swal.fire({
                title: "Success !",
                text: "Well Done ! The car will start moving now !!!",
                icon: "success"
            }).then(result => {
                Swal.close();
                Swal.fire({
                    text: "Please Wait for Car Response...",
                    imageUrl: "https://www.boasnotas.com/img/loading2.gif",
                    allowOutsideClick: false,
                    showCancelButton: false,
                    showConfirmButton: false
                    //icon: "success"
                });
                axios.post('/challenges/sendCommand', {
                    commands: "FLRFLR"
                }).then(response => {
                    var interval = setInterval(function () {
                        $.getJSON('/MSP432 Files/response.json', function (data) {
                            if (jQuery.isEmptyObject(data)) {
                                console.log("Empty Object");
                            } else {
                                clearInterval(interval)
                                Swal.close();
                                if (data.success == 1) {
                                    Swal.fire(`
                                    Distance Travelled : ${data.distance}
                                    Time Taken:${data.timeTaken}`).then(response => {
                                        document.getElementById('runCode').disabled = false;
                                        document.getElementById('clearBtn').disabled = false;
                                        document.getElementById('resetBtn').disabled = false;
                                        clearWorkspace();
                                    })
                                } else {
                                    if (data.obstacle == 1) {
                                        Swal.fire({
                                            title: "Failed !",
                                            text: "There was an obstacle preventing car from peforming command",
                                            icon: "error"
                                        }).then(response => {
                                            document.getElementById('runCode').disabled = false;
                                            document.getElementById('clearBtn').disabled = false;
                                            document.getElementById('resetBtn').disabled = false;
                                            clearWorkspace();
                                        })
                                    }
                                    if (data.line == 1) {
                                        Swal.fire({
                                            title: "Failed !",
                                            text: "Car went out of maze",
                                            icon: "error"
                                        }).then(response => {
                                            document.getElementById('runCode').disabled = false;
                                            document.getElementById('clearBtn').disabled = false;
                                            document.getElementById('resetBtn').disabled = false;
                                            clearWorkspace();
                                        })
                                    }
                                }
                            }
                        });
                    }, 5000)
                })
            })
        } else {
            Swal.fire({
                title: "Error !",
                text: "Wrong Commands",
                icon: "error",
            }).then(response => {
                document.getElementById('runCode').disabled = false;
                document.getElementById('clearBtn').disabled = false;
                document.getElementById('resetBtn').disabled = false;
                clearWorkspace();
            })
        }
    }, 1000 + myArray.length * 1000);
}

function playStageClear() {
    let audio = new Audio('../audio/stage_clear.mp3');
    audio.play();
}

/*-------------------------------------------------
|Game object for displaying the selected challenge |
--------------------------------------------------*/
function init() {
    let challenge = new Game("game-container-1", mazes[1]);
    challenge.populateMap();
    challenge.sizeUp();
    challenge.placeSprite("goal");
    let carSprite = challenge.placeSprite("car");
    challenge.car.el = carSprite;
}

init();
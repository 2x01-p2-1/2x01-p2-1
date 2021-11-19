
var workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox')
});

function move_up() {
    let player = document.getElementById('player');
    let top = parseInt(player.style.top, 10);
    top -= 64;
    player.style.top = top + 'px';
}

function move_right() {
    let player = document.getElementById('player');
    let left = parseInt(player.style.left, 10);
    left += 64;
    player.style.left = left + 'px';
}

function move_left() {
    let player = document.getElementById('player');
    let left = parseInt(player.style.left, 10);
    left -= 64;
    player.style.left = left + 'px';
}

function saveToXML() {
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    console.log(xmlText);
}

function showCode() {
    // Generate JavaScript code and display it.
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    alert(code);
}

function clearWorkspace() {
    workspace.clear();
    console.log("Workspace cleared");
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
    var x = document.getElementsByClassName('wall');
    for (let i = 0; i < x.length; i++) {
        console.log(x[i]);
    }
}

function runCode() {
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        var myArray = code.split('\n');
        myArray.pop();
        for (let i = 0; i < myArray.length; i++) {
            if (i == 0) {
                eval(myArray[i]);
            } else {
                setTimeout(() => {
                    eval(myArray[i]);
                }, 1000 + i * 1000);
            }

        }

    } catch (e) {
        alert(e);
    }
}
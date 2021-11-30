
var workspace = Blockly.inject('blocklyDiv', { 
    toolbox: document.getElementById('toolbox') 
});

function move_up() {
    let player = document.getElementById('player');
    let left = parseInt(player.style.left, 10);
    let top = parseInt(player.style.top, 10);
    if (left == 0) {
        top -= 64;
    }
    player.style.top = top + 'px';
    let message = "go up";
    console.log(message);
    console.log('top: ' + top + 'px');
    console.log('left: ' + left + 'px');
}

function turn_right() {
    let x = "go right";
    console.log(x);
}

function turn_left() {
    let x = "go left";
    console.log(x);
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
}

function runCode() {
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
}
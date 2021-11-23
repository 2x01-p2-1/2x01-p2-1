let testArray = ['move_up', 'move_left', 'move_right'];
for (let i = 0; i < testArray.length; i++) {
    Blockly.Blocks[testArray[i]] = {
        init: function () {
            this.appendDummyInput()
                .appendField(testArray[i]);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(230);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };
}
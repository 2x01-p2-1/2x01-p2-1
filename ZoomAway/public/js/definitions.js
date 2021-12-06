let blockArray = ['move_up', 'move_left', 'move_right'];
for (let i = 0; i < blockArray.length; i++) {
    Blockly.Blocks[blockArray[i]] = {
        init: function () {
            this.appendDummyInput()
                .appendField(blockArray[i]);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(230);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };
}
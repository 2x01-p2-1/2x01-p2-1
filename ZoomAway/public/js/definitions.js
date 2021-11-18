Blockly.Blocks['move_left'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("move left");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['move_right'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("move right");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['move_up'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("move up");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
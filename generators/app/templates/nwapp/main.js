/**
 * index
 */
var gui = require('nw.gui');
var gitParser = require('./parser');

gitParser.getHistory();

gui.Window.get().show();

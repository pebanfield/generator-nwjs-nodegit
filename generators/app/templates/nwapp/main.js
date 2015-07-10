/**
 * index
 */
var gui = require('nw.gui');
var gitParser = require('change-view-service');

gitParser.getHistory();

gui.Window.get().show();